"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  MessageCircle,
  Sparkles,
  X,
  Send,
  Heart,
  Leaf,
  Sun,
  CloudRain,
  Wind,
  Star,
  BookOpen,
  Bot,
  History,
  FlaskConical,
  Lightbulb,
  Target,
  FileText,
} from "lucide-react"

type MoodType = "happy" | "sad" | "anxious" | "calm" | "neutral"

interface AIMessage {
  id: number
  type: "ai" | "user"
  content: string
  timestamp: Date
}

const AIMessages: Record<MoodType, string[]> = {
  happy: [
    "今天的你真美，继续保持这份好心情！",
    "看到你开心，我也为你高兴呢~",
    "美好的一天值得被记录，你今天真棒！",
    "这份快乐可以传递给更多人哦~",
    "记得和重要的人分享你的喜悦！",
  ],
  sad: [
    "我在这里陪着你，一切都會好起来的。",
    "难过的时候，允许自己脆弱一下，没关系的。",
    "倾诉是一种力量，我愿意倾听你的心声。",
    "无论发生什么，你都是值得被爱的。",
    "黑夜总会过去，黎明一定会到来。",
  ],
  anxious: [
    "深呼吸，放轻松，一切都会好起来的。",
    "你已经做得很好了，给自己一点时间。",
    "焦虑是正常的情绪，接受它然后放下它。",
    "我会一直陪着你，直到你平静下来。",
    "慢慢来，一步一步来，不要着急。",
  ],
  calm: [
    "保持这份平静，也是一种力量。",
    "宁静的心境最难能可贵。",
    "你现在的状态很棒，继续保持。",
    "享受这份宁静带来的力量。",
    "心静则天地宽。",
  ],
  neutral: [
    "今天过得怎么样？有什么想分享的吗？",
    "无论是什么情绪，我都在这里陪伴你。",
    "记录下此刻的心情吧，这是你成长的足迹。",
    "每一天都值得被认真对待。",
    "让我们一起发现生活中的小确幸。",
  ],
}

const BehaviorMessages: Record<string, string> = {
  mood_diary_bad: "我注意到你今天记录了不太好的心情，我想告诉你：无论发生什么，我都会陪在你身边。",
  mood_diary_good: "看到你今天心情不错，真的很为你开心！继续保持哦~",
  tree_hole_finish: "感谢你愿意分享你的心事，你的故事很珍贵。记住，你并不孤单。",
  test_completed: "感谢你对自己的探索，了解自己是成长的第一步。",
  drifting_bottle: "漂流瓶承载着你的故事，也连接着另一个温暖的灵魂。",
}

interface XinyuAIFloatingBallProps {
  currentPage?: string
  mood?: MoodType
  onMoodDetected?: (mood: MoodType, message: string) => void
}

export function XinyuAIFloatingBall({ currentPage, mood, onMoodDetected }: XinyuAIFloatingBallProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showComfort, setShowComfort] = useState(false)
  const [comfortMessage, setComfortMessage] = useState("")
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [detectedMood, setDetectedMood] = useState<MoodType>(mood || "neutral")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState({ x: 24, y: 24 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX
    const startY = e.clientY

    dragTimeoutRef.current = setTimeout(() => {
      setIsDragging(true)
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDragOffset({
          x: startX - rect.left,
          y: startY - rect.top,
        })
      }
    }, 500)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    const newX = window.innerWidth - e.clientX - dragOffset.x
    const newY = window.innerHeight - e.clientY - dragOffset.y
    setPosition({
      x: Math.max(24, Math.min(newX, window.innerWidth - 80)),
      y: Math.max(24, Math.min(newY, window.innerHeight - 80)),
    })
  }

  const handleMouseUp = () => {
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current)
    }
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  useEffect(() => {
    if (mood && mood !== "neutral" && mood !== "calm") {
      const msgs = AIMessages[mood]
      const randomMessage = msgs[Math.floor(Math.random() * msgs.length)]
      setComfortMessage(randomMessage)
      setShowComfort(true)
      onMoodDetected?.(mood, randomMessage)
    }
  }, [mood, onMoodDetected])

  useEffect(() => {
    const handleAIMessage = (event: CustomEvent) => {
      const { type, data } = event.detail || event
      if (type === "comfort") {
        setComfortMessage(data.message)
        setShowComfort(true)
      } else if (type === "behavior") {
        const behaviorMsg = BehaviorMessages[data.behavior as string] || "我在这里陪伴着你。"
        setComfortMessage(behaviorMsg)
        setShowComfort(true)
      }
    }

    window.addEventListener("xinyu-ai-message" as keyof WindowEventMap, handleAIMessage as EventListener)
    return () => {
      window.removeEventListener("xinyu-ai-message" as keyof WindowEventMap, handleAIMessage as EventListener)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: AIMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])
    setInputMessage("")

    setTimeout(() => {
      const responses = [
        "我理解你的感受，谢谢你愿意分享。",
        "你能这样说已经很勇敢了。",
        "我在这里陪你，一起度过难关。",
        "每一份情绪都值得被看见。",
        "你的故事很重要，我愿意倾听。",
      ]
      const aiResponse: AIMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const closeComfort = () => {
    setShowComfort(false)
  }

  const getMoodIcon = (mood: MoodType) => {
    switch (mood) {
      case "happy":
        return <Sun className="h-5 w-5 text-amber-500" />
      case "sad":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "anxious":
        return <Wind className="h-5 w-5 text-gray-500" />
      case "calm":
        return <Leaf className="h-5 w-5 text-green-500" />
      default:
        return <Sparkles className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        className="fixed z-50 flex flex-col items-end gap-3 group"
        style={{ right: position.x, bottom: position.y }}
      >
        <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mb-2">
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl shadow-lg border p-4 w-72">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">心愈AI</p>
                  <p className="text-xs text-muted-foreground">一直陪在你身边</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/soul-archive">
                <Button variant="outline" className="w-full justify-start gap-2 h-10">
                  <BookOpen className="h-4 w-4" />
                  心灵档案
                </Button>
              </Link>
              <Link href="/psychological-consultation/ai-assistant">
                <Button variant="outline" className="w-full justify-start gap-2 h-10">
                  <MessageCircle className="h-4 w-4" />
                  AI心理助手
                </Button>
              </Link>
              <Link href="/personal-center/mood-calendar">
                <Button variant="outline" className="w-full justify-start gap-2 h-10">
                  <Heart className="h-4 w-4" />
                  心情日记
                </Button>
              </Link>
              <Link href="/psychological-test">
                <Button variant="outline" className="w-full justify-start gap-2 h-10">
                  <FlaskConical className="h-4 w-4" />
                  心理测试
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {showComfort && (
          <div className="bg-gradient-to-br from-primary/10 to-purple-50 dark:from-primary/20 dark:to-purple-950 rounded-2xl shadow-lg border p-4 w-72 animate-in slide-in-from-bottom-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">心愈AI</p>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={closeComfort}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{comfortMessage}</p>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={() => {
            if (!isDragging) {
              setIsChatOpen(true)
            }
          }}
          onMouseDown={handleMouseDown}
          className={`w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center select-none ${
            isDragging ? "cursor-grabbing" : "hover:scale-110"
          }`}
        >
          {isChatOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
          )}
        </Button>
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-lg h-[600px] flex flex-col p-0 gap-0">
          <DialogHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-lg">心愈AI</DialogTitle>
                  <DialogDescription className="text-xs">一直陪在你身边</DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="px-4 py-2 border-b flex gap-2 overflow-x-auto">
            <Link href="/soul-archive" onClick={() => setIsChatOpen(false)}>
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                心灵档案
              </Button>
            </Link>
            <Link href="/psychological-consultation/ai-assistant" onClick={() => setIsChatOpen(false)}>
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" />
                AI助手
              </Button>
            </Link>
            <Link href="/personal-center/mood-calendar" onClick={() => setIsChatOpen(false)}>
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
                <Heart className="h-3.5 w-3.5" />
                心情日记
              </Button>
            </Link>
            <Link href="/psychological-test" onClick={() => setIsChatOpen(false)}>
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
                <FlaskConical className="h-3.5 w-3.5" />
                心理测试
              </Button>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-100 dark:to-purple-900 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">你好，我是心愈AI</p>
                  <p className="text-sm text-muted-foreground mt-1">有什么想聊的吗？我在这里倾听你</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => setInputMessage("今天心情有点低落")}>
                    心情低落
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => setInputMessage("想找人聊聊")}>
                    想找人聊聊
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => setInputMessage("记录一下今天的心情")}>
                    记录心情
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => setInputMessage("想了解心理测试")}>
                    了解测试
                  </Button>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {msg.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                placeholder="输入你想说的话..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="resize-none min-h-[44px] max-h-32"
              />
              <Button onClick={handleSendMessage} className="shrink-0 px-4">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function triggerAIMessage(type: "comfort" | "behavior", data: { mood?: MoodType; message?: string; behavior?: string }) {
  const event = new CustomEvent("xinyu-ai-message", { detail: { type, data } })
  window.dispatchEvent(event)
}
