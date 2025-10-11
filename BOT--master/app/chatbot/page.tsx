"use client";

import Header from "@/components/header";
import ProtectedRoute from "@/components/protected-route";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function ChatBotPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
              ChatBot Assistant
            </Badge>
            <h1 className="text-3xl font-bold mb-2">SniprX ChatBot</h1>
            <p className="text-muted-foreground">
              Get instant help with trading strategies and platform features
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                  Chat removed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The chat assistant was removed from this dashboard. If you
                  want to re-enable it, we can either embed the assistant UI or
                  fully merge the assistant components into this project.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
