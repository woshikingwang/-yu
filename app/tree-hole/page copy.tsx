"use client"

import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Home,
  MessageSquare,
  User,
  Loader2,
  CheckCircle,
  XCircle,
  Heart,
  Send,
  Shield,
  Clock,
  Users,
  Info,
  Sparkles,
  Lock,
  Menu,
  X,
  Moon,
  Sun,
  MessageCircle,
  Brain,
  ShoppingBag,
  Calendar,
  LogOut,
  Settings
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "next-themes"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type MatchingStatus = "idle" | "matching" | "success" | "failure" | "chatting"

const mockMessages = [
  { id: 1, sender: "other", content: "你好，很高兴能和你匿名聊聊。", time: "刚刚" },
  { id: 2, sender: "me", content: "我也是，有什么想说的吗？", time: "刚刚" },
  { id: 3, sender: "other", content: "最近感觉有点迷茫，不知道未来该怎么走...", time: "1分钟前" },
  { id: 4, sender: "me", content: "我理解你的感受，其实很多人都会有这样的时刻。", time: "1分钟前" },
]

function TreeHolePage() {
  const { user, logout } = useAuth()
  const { setTheme, theme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const router = useRouter()
  const [chatDuration, setChatDuration] = useState<string>("30")
  const [matchingStatus, setMatchingStatus] = useState<MatchingStatus>("idle")
  const [matchedUserTags, setMatchedUserTags] = useState<string[]>([])
  const [chatCountdown, setChatCountdown] = useState<number>(0)
  const [showReturnHomePrompt, setShowReturnHomePrompt] = useState(false)
  const [showSafetyDialog, setShowSafetyDialog] = useState(false)
  const [matchingProgress, setMatchingProgress] = useState(0)
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startMatching = () => {
    setMatchingStatus("matching")
    setMatchedUserTags([])
    setMatchingProgress(0)

    const progressInterval = setInterval(() => {
      setMatchingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 20
      })
    }, 1000)

    setTimeout(() => {
      clearInterval(progressInterval)
      const isSuccess = Math.random() > 0.2
      if (isSuccess) {
        setMatchingStatus("success")
        const durationInSeconds = Number.parseInt(chatDuration) * 60
        setChatCountdown(durationInSeconds)
        setMatchedUserTags(["热爱生活", "喜欢音乐", "内向", "思考者"])

        setTimeout(() => {
          setMatchingStatus("chatting")
          startChatCountdown(durationInSeconds)
        }, 3000)
      } else {
        setMatchingStatus("failure")
      }
    }, 5000)
  }

  const startChatCountdown = (initialSeconds: number) => {
    setChatCountdown(initialSeconds)
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }
    countdownIntervalRef.current = setInterval(() => {
      setChatCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current!)
          alert("聊天时间结束，自动返回首页。")
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [])

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleReturnHome = () => {
    setShowReturnHomePrompt(true)
  }

  const confirmReturnHome = () => {
    setShowReturnHomePrompt(false)
    router.push("/")
  }

  const cancelReturnHome = () => {
    setShowReturnHomePrompt(false)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      sender: "me",
      content: newMessage,
      time: "刚刚",
    }
    setMessages([...messages, newMsg])
    setNewMessage("")

    setTimeout(() => {
      const responses = [
        "我明白你的感受。",
        "这确实是个值得思考的问题。",
        "谢谢你的分享,我也有类似的经历。",
        "也许我们可以从另一个角度看待这件事。",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "other",
          content: randomResponse,
          time: "刚刚",
        },
      ])
    }, 2000)
  }

  const handleSafetyWord = () => {
    setShowSafetyDialog(true)
  }

  const confirmSafetyExit = () => {
    setShowSafetyDialog(false)
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header - 响应式设计，支持深色模式 */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-background'} border-b`}>
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="心愈 Logo" className="h-10 w-auto transition-transform duration-200 hover:scale-105" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">心愈</h1>
              <p className="text-xs opacity-70">专业心理健康服务</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <Home className="h-4 w-4" />
              <span>首页</span>
            </Link>
            <Link href="/drifting-bottle" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              <span>漂流瓶</span>
            </Link>
            <Link href="/tree-hole" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              <span>树洞</span>
            </Link>
            <Link href="/psychological-consultation" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <Brain className="h-4 w-4" />
              <span>心理咨询</span>
            </Link>
            <Link href="/mall" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <ShoppingBag className="h-4 w-4" />
              <span>心理商城</span>
            </Link>
            <Link href="/message-center" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>消息中心</span>
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full" aria-label="切换主题">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-8 w-8 p-0 overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/20 text-primary">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs opacity-70">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/personal-center" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>个人中心</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/personal-center/mood-calendar" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>心情日历</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/personal-center/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>设置</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>退出登录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden p-4 border-t">
            <nav className="flex flex-col space-y-1">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>首页</span>
              </Link>
              <Link href="/drifting-bottle" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>漂流瓶</span>
              </Link>
              <Link href="/tree-hole" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>树洞</span>
              </Link>
              <Link href="/psychological-consultation" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>心理咨询</span>
              </Link>
              <Link href="/mall" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>心理商城</span>
              </Link>
              <Link href="/message-center" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>消息中心</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto flex-1 px-4 py-8 md:py-12 max-w-6xl">
        {matchingStatus === "idle" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl overflow-hidden">
              <div className="bg-[#e8e4f3] p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm mb-4">
                  <Sparkles className="h-8 w-8 text-[#9b8cc6]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">欢迎来到树洞倾诉</h2>
                <p className="text-gray-600 text-sm">在这里，你可以匿名分享你的心事，与陌生人坦诚交流</p>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-[#f5f1fc]">
                    <Lock className="h-6 w-6 text-[#9b8cc6] mx-auto mb-2" />
                    <p className="text-xs text-gray-600 font-medium">完全匿名</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#e8f4f8]">
                    <Shield className="h-6 w-6 text-[#7fb3c4] mx-auto mb-2" />
                    <p className="text-xs text-gray-600 font-medium">安全保护</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#e8f5e9]">
                    <Heart className="h-6 w-6 text-[#81c784] mx-auto mb-2" />
                    <p className="text-xs text-gray-600 font-medium">温暖倾听</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-[#9b8cc6]" />
                  选择聊天时长
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  选择你希望匿名聊天的时长，时间到后对话将自动结束
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={chatDuration} onValueChange={setChatDuration} className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <RadioGroupItem value="15" id="duration-15" className="peer sr-only" />
                    <Label
                      htmlFor="duration-15"
                      className="flex flex-col items-center justify-center rounded-2xl p-6 cursor-pointer border-2 border-gray-200 peer-checked:border-[#b4a7d6] peer-checked:bg-[#f5f1fc] hover:border-[#d4c9e8] hover:shadow-sm transition-all duration-200"
                    >
                      <Clock className="h-6 w-6 text-gray-500 mb-2" />
                      <span className="text-2xl font-bold text-gray-800">15</span>
                      <span className="text-sm text-gray-600">分钟</span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="30" id="duration-30" className="peer sr-only" />
                    <Label
                      htmlFor="duration-30"
                      className="flex flex-col items-center justify-center rounded-2xl p-6 cursor-pointer border-2 border-gray-200 peer-checked:border-[#b4a7d6] peer-checked:bg-[#f5f1fc] hover:border-[#d4c9e8] hover:shadow-sm transition-all duration-200 relative"
                    >
                      <Badge className="absolute -top-2 -right-2 bg-[#9b8cc6] text-white border-0 shadow-sm">
                        推荐
                      </Badge>
                      <Clock className="h-6 w-6 text-gray-500 mb-2" />
                      <span className="text-2xl font-bold text-gray-800">30</span>
                      <span className="text-sm text-gray-600">分钟</span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="60" id="duration-60" className="peer sr-only" />
                    <Label
                      htmlFor="duration-60"
                      className="flex flex-col items-center justify-center rounded-2xl p-6 cursor-pointer border-2 border-gray-200 peer-checked:border-[#b4a7d6] peer-checked:bg-[#f5f1fc] hover:border-[#d4c9e8] hover:shadow-sm transition-all duration-200"
                    >
                      <Clock className="h-6 w-6 text-gray-500 mb-2" />
                      <span className="text-2xl font-bold text-gray-800">60</span>
                      <span className="text-sm text-gray-600">分钟</span>
                    </Label>
                  </div>
                </RadioGroup>

                <Button
                  onClick={startMatching}
                  className="w-full bg-[#9b8cc6] hover:bg-[#8a7ab5] text-white py-6 text-base rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Users className="mr-2 h-5 w-5" />
                  开始在线匹配
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-[#e8f5e9] pb-4">
                <CardTitle className="flex items-center gap-2 text-base text-gray-800">
                  <Shield className="h-5 w-5 text-[#81c784]" />
                  安全提示
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#e8f4f8] border border-[#d4e9f0]">
                  <div className="h-8 w-8 rounded-full bg-[#7fb3c4] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Info className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    所有对话都是完全匿名的，我们不会保存你的聊天记录
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#e8f5e9] border border-[#c8e6c9]">
                  <div className="h-8 w-8 rounded-full bg-[#81c784] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    聊天过程中如感到不适，可随时使用"安全词"功能退出
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {matchingStatus === "matching" && (
          <Card className="mx-auto max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#d4c9e8] opacity-20 animate-ping"></div>
                <Loader2 className="h-20 w-20 animate-spin text-[#9b8cc6] relative" />
              </div>
              <div className="space-y-3 w-full">
                <CardTitle className="text-xl text-gray-800">正在为您匹配...</CardTitle>
                <CardDescription className="text-sm text-gray-600">请稍候，我们正在寻找合适的倾听者</CardDescription>
              </div>
              <div className="w-full space-y-3">
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#b4a7d6] rounded-full transition-all duration-300"
                    style={{ width: `${matchingProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 font-medium">{matchingProgress}% 完成</p>
              </div>
            </CardContent>
          </Card>
        )}

        {matchingStatus === "success" && (
          <Card className="mx-auto max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#c8e6c9] opacity-20 animate-pulse"></div>
                <div className="h-20 w-20 rounded-full bg-[#81c784] flex items-center justify-center relative shadow-sm">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <CardTitle className="text-xl text-gray-800">匹配成功！</CardTitle>
                <CardDescription className="text-sm text-gray-600">即将进入聊天，对方的标签是：</CardDescription>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {matchedUserTags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-[#f5f1fc] text-[#9b8cc6] border border-[#e8e4f3] px-4 py-1.5 rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {matchingStatus === "failure" && (
          <Card className="mx-auto max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
              <div className="h-20 w-20 rounded-full bg-[#e57373] flex items-center justify-center shadow-sm">
                <XCircle className="h-12 w-12 text-white" />
              </div>
              <div className="space-y-3">
                <CardTitle className="text-xl text-gray-800">匹配失败</CardTitle>
                <CardDescription className="text-sm text-gray-600">未能找到合适的匹配对象，请稍后再试</CardDescription>
              </div>
              <div className="flex gap-3 w-full">
                <Button
                  onClick={startMatching}
                  className="flex-1 bg-[#9b8cc6] hover:bg-[#8a7ab5] text-white rounded-xl shadow-sm"
                >
                  重试匹配
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReturnHome}
                  className="flex-1 border-gray-200 bg-white rounded-xl hover:bg-gray-50"
                >
                  返回首页
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {matchingStatus === "chatting" && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-gray-100 p-5 bg-[#f5f1fc]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-[#b4a7d6] text-white">
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#81c784] rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <CardTitle className="text-base text-gray-800">匿名倾听者</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 w-2 bg-[#81c784] rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">在线</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
                      <div className="text-xl font-bold text-[#9b8cc6]">{formatTime(chatCountdown)}</div>
                      <div className="text-xs text-gray-500">剩余时间</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSafetyWord}
                      className="border-[#f8cecc] text-[#e57373] hover:bg-[#fef5f5] bg-white rounded-xl shadow-sm"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      安全词
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-[#fafbfc]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                          message.sender === "me"
                            ? "bg-[#9b8cc6] text-white rounded-br-md"
                            : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.sender === "me" ? "text-[#e8e4f3]" : "text-gray-400"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <Separator />

                <div className="p-5 bg-white">
                  <div className="flex items-end gap-3">
                    <Textarea
                      placeholder="输入你的消息... 回车发送"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="min-h-[80px] resize-none border-gray-200 rounded-xl focus:border-[#b4a7d6] focus:ring-[#b4a7d6]"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-[#9b8cc6] hover:bg-[#8a7ab5] text-white h-[80px] px-8 rounded-xl shadow-sm disabled:opacity-50"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Dialog open={showReturnHomePrompt} onOpenChange={setShowReturnHomePrompt}>
        <DialogContent className="bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-800">确认返回首页？</DialogTitle>
            <DialogDescription className="text-gray-600">
              您确定要返回首页吗？当前对话将结束，返回后您将需要重新开始匹配。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={cancelReturnHome} className="border-gray-200 bg-white rounded-xl">
              取消
            </Button>
            <Button onClick={confirmReturnHome} className="bg-[#9b8cc6] hover:bg-[#8a7ab5] text-white rounded-xl">
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSafetyDialog} onOpenChange={setShowSafetyDialog}>
        <DialogContent className="bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#e57373] flex items-center gap-2">
              <Shield className="h-5 w-5" />
              安全退出
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              您确定要使用安全词退出当前对话吗？退出后，您可以选择举报不当内容。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowSafetyDialog(false)} className="border-gray-200 rounded-xl">
              取消
            </Button>
            <Button onClick={confirmSafetyExit} className="bg-[#e57373] hover:bg-[#d66a6a] text-white rounded-xl">
              确认退出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

        {/* 页脚信息 */}
        <footer className="mt-12 border-t pt-8 pb-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src="/images/logo.png" alt="心愈 Logo" className="h-8 w-auto" />
                  <h3 className="font-semibold">心愈</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  专业的心理健康与情绪管理平台，为您的心灵保驾护航
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-4">服务</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/psychological-consultation" className="hover:text-primary transition-colors">心理咨询</Link></li>
                  <li><Link href="/drifting-bottle" className="hover:text-primary transition-colors">漂流瓶</Link></li>
                  <li><Link href="/tree-hole" className="hover:text-primary transition-colors">树洞倾诉</Link></li>
                  <li><Link href="/mall" className="hover:text-primary transition-colors">心理商城</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">关于我们</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">公司简介</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">团队介绍</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">加入我们</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">联系方式</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">帮助中心</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">常见问题</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">用户协议</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">隐私政策</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">意见反馈</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
              <p>© 2025 陕西心愈科技有限公司. 保留所有权利.</p>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default function Page() {
  return <TreeHolePage />
}
