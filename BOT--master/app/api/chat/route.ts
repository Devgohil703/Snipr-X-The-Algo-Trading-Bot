import { NextResponse } from "next/server";
import { getSession, saveSession } from "@/lib/assistant-store";

const OPENAI_KEY = process.env.OPENAI_API_KEY || "";

// Simple streaming mock for /api/chat
// Accepts { messages: Array<{ role: 'user'|'assistant', content: string }> }
// and streams a generated reply token-by-token. Replace the generator with a real
// LLM call (OpenAI / Google) to get real answers.

function generateReplyFromContext(
  messages: Array<{ role: string; content: string }>
) {
  if (!messages || messages.length === 0) return "Hello — how can I help?";
  const last = messages[messages.length - 1].content.toLowerCase();
  if (last.includes("mmxm"))
    return "MMXM is a market-maker strategy combining liquidity hunts, order-block alignment, and CHOCH confirmation. Use HTF order blocks for bias and price reaction for entries.";
  if (last.includes("judas"))
    return "Judas Swing identifies fake breakouts around session opens; wait for the reversal and trade with institutional bias.";
  if (last.includes("ote"))
    return "OTE uses Fibonacci 0.62-0.79 zones aligned with order blocks for high-probability entries.";
  if (last.includes("risk") || last.includes("stop"))
    return "Manage risk: size to 1-2% of account, place stops beyond liquidity clusters, and keep a risk-reward plan.";
  if (last.includes("ny session"))
    return "NY session has high liquidity and suits MMXM and Judas Swing due to institutional flow.";
  // default: summarize last few user messages to craft a helpful reply
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .slice(-3);
  return `I read your recent questions: "${userMessages.join(
    " | "
  )}". Ask me for a specific strategy explanation or session advice.`;
}

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();

    // persist incoming messages into session if provided
    if (sessionId) {
      const session = getSession(sessionId) || { messages: [] };
      session.messages = [...(session.messages || []), ...messages];
      saveSession(sessionId, session);
    }

    // If an OpenAI key is configured, proxy the streaming response
    if (OPENAI_KEY) {
      // NOTE: This is a minimal streaming proxy using the OpenAI v1 Chat Completions with stream=true
      // For production, use the official SDK or the newer streaming endpoints.
      const lastUser = messages
        .filter((m: any) => m.role === "user")
        .slice(-1)[0];
      const prompt = lastUser
        ? lastUser.content
        : messages.map((m: any) => m.content).join("\n");

      const stream = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          stream: true,
        }),
      });

      if (!stream.body) {
        // fallback to mock
        const reply = generateReplyFromContext(messages);
        return streamFromString(reply);
      }

      return new Response(stream.body, {
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    // fallback to mock streaming reply
    const reply = generateReplyFromContext(messages);

    return streamFromString(reply);
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

function streamFromString(reply: string) {
  const stream = new ReadableStream({
    start(controller) {
      let i = 0;
      const chunkSize = 8;
      const interval = setInterval(() => {
        if (i >= reply.length) {
          controller.close();
          clearInterval(interval);
          return;
        }
        const chunk = reply.slice(i, i + chunkSize);
        controller.enqueue(new TextEncoder().encode(chunk));
        i += chunkSize;
      }, 40);
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
