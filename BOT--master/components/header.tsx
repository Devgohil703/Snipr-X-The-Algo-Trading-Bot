"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Target, BarChart3, Brain, Server, Settings, Bot, TrendingUp, LinkIcon } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { logout, user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold">SniprX</span>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Premium</Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <Link
              href="/multi-bot"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center"
            >
              <Bot className="w-4 h-4 mr-2" />
              Multi-Bot
            </Link>
            <Link
              href="/analytics"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Link>
            <Link
              href="/ai-insights"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Insights
            </Link>
            <Link href="/mt5" className="text-sm font-medium hover:text-primary transition-colors flex items-center">
              <Server className="w-4 h-4 mr-2" />
              MT5
            </Link>
            <Link
              href="/strategies"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center"
            >
              <Target className="w-4 h-4 mr-2" />
              Strategies
            </Link>
            <Link
              href="/integrations"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Integrations
            </Link>
            <Link
              href="/settings"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              {user?.displayName || user?.name || "Pro Trader"}
            </Badge>
            <ThemeToggle />
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/40">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link
                href="/multi-bot"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                <Bot className="w-4 h-4 mr-2" />
                Multi-Bot
              </Link>
              <Link
                href="/analytics"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </Link>
              <Link
                href="/ai-insights"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Insights
              </Link>
              <Link href="/mt5" className="text-sm font-medium hover:text-primary transition-colors flex items-center">
                <Server className="w-4 h-4 mr-2" />
                MT5
              </Link>
              <Link
                href="/strategies"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                <Target className="w-4 h-4 mr-2" />
                Strategies
              </Link>
              <Link
                href="/integrations"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Integrations
              </Link>
              <Link
                href="/settings"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
              <div className="pt-4">
                <Button variant="ghost" className="w-full" onClick={logout}>
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
