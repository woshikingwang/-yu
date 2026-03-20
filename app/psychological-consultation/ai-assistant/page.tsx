"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, Bot, UserIcon, Sparkles } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

const suggestedTopics = [
  { id: 1, text: "最近感到很焦虑", icon: "😰" },
  { id: 2, text: "工作压力很大", icon: "💼" },
  { id: 3, text: "睡眠质量不好", icon: "😴" },
  { id: 4, text: "情绪低落", icon: "😔" },
  { id: 5, text: "人际关系困扰", icon: "👥" },
  { id: 6, text: "自我成长", icon: "🌱" },
]

const aiResponses = {
  焦虑: "我理解你现在的感受。焦虑是一种很常见的情绪反应。让我们一起来探索一下：\n\n1. 深呼吸练习：试着用腹式呼吸，吸气4秒，屏息4秒，呼气4秒\n2. 识别焦虑源：是什么让你感到焦虑？\n3. 正念练习：专注当下，不过度担忧未来\n\n你愿意和我分享更多关于你焦虑的情况吗？",
  压力: "工作压力大是很多人都会面临的问题。让我帮你分析一下：\n\n✓ 时间管理：尝试使用番茄工作法\n✓ 设定优先级：区分重要和紧急的任务\n✓ 适当休息：每工作1小时休息5-10分钟\n✓ 寻求支持：和同事或上司沟通\n\n你觉得哪个方面的压力最大呢？",
  睡眠: "睡眠质量对身心健康非常重要。以下是一些改善建议：\n\n🌙 睡前准备：\n• 固定作息时间\n• 睡前1小时避免电子设备\n• 保持卧室凉爽、黑暗、安静\n• 尝试放松技巧：冥想、渐进式肌肉放松\n\n你的睡眠问题是难以入睡还是容易醒来呢？",
  情绪: "情绪低落时，请记住这些都是暂时的。让我们一起探索：\n\n💙 情绪管理技巧：\n• 写情绪日记，记录感受\n• 进行适量运动，释放内啡肽\n• 与信任的朋友倾诉\n• 培养兴趣爱好\n• 必要时寻求专业帮助\n\n这种情绪持续多久了？有什么特别的原因吗？",
  人际: "人际关系确实是一门艺术。让我分享一些建议：\n\n👥 改善人际关系：\n• 倾听：真诚地听对方说话\n• 共情：站在对方角度思考\n• 边界：建立健康的个人边界\n• 沟通：表达需求和感受\n• 接纳：接受彼此的差异\n\n你遇到的是哪方面的人际困扰呢？",
  成长: "追求自我成长是非常积极的！让我给你一些方向：\n\n🌱 自我成长路径：\n• 设定明确目标：短期和长期\n• 持续学习：阅读、课程、实践\n• 自我反思：定期回顾和总结\n• 走出舒适区：尝试新事物\n• 寻找导师：向优秀的人学习\n\n你最想在哪个方面提升自己？",
  default:
    "谢谢你的分享。我在这里倾听你的感受。\n\n每个人都会遇到困难和挑战，重要的是我们如何面对它们。你愿意告诉我更多细节吗？这样我可以给你更具体的建议。\n\n记住，寻求帮助是勇敢的表现。如果你觉得需要，我们也有专业的咨询师可以为你提供更深入的支持。",
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "你好！我是你的AI心理助手 🤖\n\n我在这里倾听你的感受，陪伴你度过困难时刻。无论是焦虑、压力、情绪困扰，还是想要自我成长，我都愿意和你聊聊。\n\n请放心，我们的对话是私密的。你可以从下面的话题开始，或者直接告诉我你想聊什么。",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    if (lowerMessage.includes("焦虑") || lowerMessage.includes("紧张") || lowerMessage.includes("担心")) {
      return aiResponses.焦虑
    } else if (lowerMessage.includes("压力") || lowerMessage.includes("工作")) {
      return aiResponses.压力
    } else if (lowerMessage.includes("睡眠") || lowerMessage.includes("失眠") || lowerMessage.includes("睡不着")) {
      return aiResponses.睡眠
    } else if (lowerMessage.includes("情绪") || lowerMessage.includes("低落") || lowerMessage.includes("难过")) {
      return aiResponses.情绪
    } else if (lowerMessage.includes("人际") || lowerMessage.includes("关系") || lowerMessage.includes("朋友")) {
      return aiResponses.人际
    } else if (lowerMessage.includes("成长") || lowerMessage.includes("提升") || lowerMessage.includes("进步")) {
      return aiResponses.成长
    }
    return aiResponses.default
  }

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(messageText),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleTopicClick = (topic: string) => {
    handleSendMessage(topic)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            <Link href="/psychological-consultation">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-2">
              <Bot className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">AI心理助手</h1>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                在线
              </p>
            </div>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <Avatar
              className={`h-10 w-10 ${message.type === "ai" ? "border-2 border-blue-200" : "border-2 border-purple-200"}`}
            >
              {message.type === "ai" ? (
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">
                  <UserIcon className="h-5 w-5" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className={`flex flex-col ${message.type === "user" ? "items-end" : "items-start"} max-w-[80%]`}>
              <Card
                className={`${
                  message.type === "ai"
                    ? "bg-white border-blue-100"
                    : "bg-gradient-to-br from-blue-500 to-purple-500 text-white border-0"
                } shadow-sm`}
              >
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                </CardContent>
              </Card>
              <span className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 border-2 border-blue-200">
              <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <Card className="bg-white border-blue-100 shadow-sm">
              <CardContent className="p-3">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {messages.length <= 2 && (
        <div className="container mx-auto px-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-600">你可以从这些话题开始：</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedTopics.map((topic) => (
              <Button
                key={topic.id}
                variant="outline"
                size="sm"
                onClick={() => handleTopicClick(topic.text)}
                className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-gray-700 bg-white"
              >
                <span className="mr-1">{topic.icon}</span>
                {topic.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      <footer className="sticky bottom-0 z-40 w-full border-t border-gray-200 bg-white p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="输入你想说的话..."
              className="flex-1 border-gray-200 focus:border-blue-400 bg-white"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            💡 如需专业咨询，请预约{" "}
            <Link href="/psychological-consultation" className="text-blue-600 hover:underline">
              专业咨询师
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
