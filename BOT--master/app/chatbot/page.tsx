"use client"

import Header from "@/components/header"
import ProtectedRoute from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, Bot } from "lucide-react"
import { useState } from "react"

export default function ChatBotPage() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! I'm your SniprX trading assistant. How can I help you today?",
      time: "10:30 AM",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage = {
      type: "user",
      content: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: "bot",
        content: "I understand your question about " + input + ". Let me help you with that...",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20">ChatBot Assistant</Badge>
            <h1 className="text-3xl font-bold mb-2">SniprX ChatBot</h1>
            <p className="text-muted-foreground">Get instant help with trading strategies and platform features</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="glassmorphism h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                  Chat with SniprX Assistant
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === "bot" && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                          <div>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">{message.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about strategies, trading, or platform features..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} className="gradient-primary text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glassmorphism">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Strategy Help</h3>
                  <p className="text-sm text-muted-foreground">Ask about MMXM, Judas Swing, OTE strategies</p>
                </CardContent>
              </Card>

              <Card className="glassmorphism">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Platform Guide</h3>
                  <p className="text-sm text-muted-foreground">Learn how to use dashboard and charts</p>
                </CardContent>
              </Card>

              <Card className="glassmorphism">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Trading Tips</h3>
                  <p className="text-sm text-muted-foreground">Get risk management and trading advice</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
