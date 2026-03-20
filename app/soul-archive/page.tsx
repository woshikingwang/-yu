"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Home,
  MessageSquare,
  User,
  ShoppingBag,
  Heart,
  MessageCircle,
  Brain,
  Menu,
  X,
  Moon,
  Sun,
  Calendar,
  LogOut,
  Settings,
  FlaskConical,
  BookOpen,
  Bot,
  Send,
  Sparkles,
  FileText,
  Lightbulb,
  Target,
  History,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
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

// Mock data for soul archive
const mockDriftingBottleRecords = [
  {
    id: "1",
    title: "关于最近的压力",
    content: "最近工作压力很大，感觉有点喘不过气来...",
    date: "2025-06-05",
    responses: 5,
    likes: 12,
    theme: "困惑",
  },
  {
    id: "2",
    title: "失眠的夜晚",
    content: "又是一个失眠的夜晚，思绪万千...",
    date: "2025-06-03",
    responses: 8,
    likes: 15,
    theme: "心情",
  },
]

const mockTreeHoleSummaries = [
  {
    id: "1",
    date: "2025-06-07",
    duration: "30分钟",
    tags: ["倾诉", "职场压力"],
    summary: "你分享了关于工作压力的困扰，匿名倾听者给了你一些建议。记住，你并不孤单。",
    mood: "有点低落但释然",
  },
  {
    id: "2",
    date: "2025-06-04",
    duration: "15分钟",
    tags: ["分享", "生活趣事"],
    summary: "你和一个温暖的用户分享了生活中的小事，感受到了人与人之间的善意。",
    mood: "开心",
  },
]

const mockTestResults = [
  {
    id: "1",
    title: "原生家庭伤痛评估",
    date: "2025-06-01",
    score: 65,
    level: "中等",
    description: "你在原生家庭中存在一些未被处理的情感创伤，建议通过专业咨询进一步探索。",
    tags: ["情感", "原生家庭"],
  },
  {
    id: "2",
    title: "焦虑测试(专业版)",
    date: "2025-05-28",
    score: 42,
    level: "轻度",
    description: "你的焦虑水平处于正常范围，但建议保持良好的生活习惯和情绪管理。",
    tags: ["焦虑", "专业"],
  },
]

const mockAIMoodSummaries = [
  {
    id: "1",
    date: "2025-06-07",
    mood: "有点低落",
    trend: "down",
    summary: "今天你记录了不好的心情，但我注意到你也在积极寻求帮助，这很棒。记住，无论发生什么，我都会陪在你身边。",
    suggestions: ["可以尝试深呼吸放松", "找朋友聊聊", "记录感恩的事"],
  },
  {
    id: "2",
    date: "2025-06-06",
    mood: "平静",
    trend: "stable",
    summary: "你今天的心情比较平静，这种状态很难得。继续保持对生活的热爱吧。",
    suggestions: ["保持正念冥想", "记录每日小确幸"],
  },
  {
    id: "3",
    date: "2025-06-05",
    mood: "开心",
    trend: "up",
    summary: "今天你分享了很多开心的事情！你的积极能量感染了周围的人。继续保持这份美好！",
    suggestions: ["分享你的快乐", "记录今天的美 好时刻"],
  },
]

// AI Chat interface
interface ChatMessage {
  id: number
  type: "ai" | "user"
  content: string
  timestamp: Date
}

function SoulArchivePage() {
  const { user, logout } = useAuth()
  const { setTheme, theme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const handleLogout = () => logout()
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")

  const handleSendChat = () => {
    if (!chatInput.trim()) return

    const userMsg: ChatMessage = {
      id: Date.now(),
      type: "user",
      content: chatInput,
      timestamp: new Date(),
    }
    setChatMessages([...chatMessages, userMsg])
    setChatInput("")

    setTimeout(() => {
      const responses = [
        "感谢你的分享，我一直在倾听。",
        "你能这样说已经很勇敢了。",
        "记住，你并不孤单，我在这里陪着你。",
        "每一份情绪都值得被看见和理解。",
        "你的故事很重要，谢谢你愿意分享。",
      ]
      const aiMsg: ChatMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, aiMsg])
    }, 1000)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getMoodColor = (mood: string) => {
    if (mood.includes("开心") || mood.includes("好")) return "bg-green-50 text-green-700 border-green-200"
    if (mood.includes("低落") || mood.includes("不好")) return "bg-red-50 text-red-700 border-red-200"
    if (mood.includes("焦虑")) return "bg-amber-50 text-amber-700 border-amber-200"
    return "bg-blue-50 text-blue-700 border-blue-200"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-background"} border-b`}>
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="心愈 Logo" className="h-10 w-auto transition-transform duration-200 hover:scale-105" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">心愈</h1>
              <p className="text-xs opacity-70">专业心理健康服务</p>
            </div>
          </div>

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
            <Link href="/psychological-test" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <FlaskConical className="h-4 w-4" />
              <span>心理测试</span>
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

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full" aria-label="切换主题">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-8 w-8 p-0 overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/20 text-primary">
                      {user?.name?.[0]?.toUpperCase() || "U"}
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
                  <Link href="/soul-archive" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>心灵档案</span>
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
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

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
              <Link href="/psychological-test" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                <span>心理测试</span>
              </Link>
              <Link href="/mall" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>心理商城</span>
              </Link>
              <Link href="/message-center" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>消息中心</span>
              </Link>
              <Link href="/soul-archive" className="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>心灵档案</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto flex-1 px-4 py-8 md:py-12 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">心灵档案</h1>
              <p className="text-muted-foreground text-sm">记录你的心理成长历程</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="overview" className="gap-1.5">
              <Sparkles className="h-4 w-4" />
              概览
            </TabsTrigger>
            <TabsTrigger value="bottles" className="gap-1.5">
              <MessageCircle className="h-4 w-4" />
              漂流瓶
            </TabsTrigger>
            <TabsTrigger value="treehole" className="gap-1.5">
              <Heart className="h-4 w-4" />
              树洞
            </TabsTrigger>
            <TabsTrigger value="tests" className="gap-1.5">
              <FlaskConical className="h-4 w-4" />
              测试
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-1.5">
              <Bot className="h-4 w-4" />
              AI对话
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>漂流瓶记录</CardDescription>
                  <CardTitle className="text-3xl font-bold">{mockDriftingBottleRecords.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>累计发布</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>树洞倾诉</CardDescription>
                  <CardTitle className="text-3xl font-bold">{mockTreeHoleSummaries.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>次倾诉</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>心理测试</CardDescription>
                  <CardTitle className="text-3xl font-bold">{mockTestResults.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <FlaskConical className="h-4 w-4" />
                    <span>完成测试</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>AI陪伴</CardDescription>
                  <CardTitle className="text-3xl font-bold">{mockAIMoodSummaries.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Bot className="h-4 w-4" />
                    <span>次对话</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Latest AI Summary */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    最新AI心情总结
                  </CardTitle>
                  <Badge variant="outline" className={getMoodColor(mockAIMoodSummaries[0].mood)}>
                    {mockAIMoodSummaries[0].mood}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{mockAIMoodSummaries[0].summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mockAIMoodSummaries[0].suggestions.map((suggestion, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      <Lightbulb className="h-3 w-3" />
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="h-5 w-5" />
                  最近活动
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: MessageCircle, text: "发布了漂流瓶", time: "2025-06-05", color: "text-blue-500" },
                  { icon: Heart, text: "完成树洞倾诉", time: "2025-06-07", color: "text-pink-500" },
                  { icon: FlaskConical, text: "完成心理测试", time: "2025-06-01", color: "text-purple-500" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      <span className="text-sm">{activity.text}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drifting Bottles Tab */}
          <TabsContent value="bottles" className="space-y-4">
            {mockDriftingBottleRecords.map((bottle) => (
              <Card key={bottle.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{bottle.title}</CardTitle>
                    <Badge variant="outline">{bottle.theme}</Badge>
                  </div>
                  <CardDescription>{bottle.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{bottle.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {bottle.responses}回应
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {bottle.likes}赞
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tree Hole Tab */}
          <TabsContent value="treehole" className="space-y-4">
            {mockTreeHoleSummaries.map((summary) => (
              <Card key={summary.id} className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-500" />
                      树洞倾诉
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{summary.duration}</Badge>
                      <Badge className={getMoodColor(summary.mood)}>{summary.mood}</Badge>
                    </div>
                  </div>
                  <CardDescription>{summary.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{summary.summary}</p>
                  <div className="flex flex-wrap gap-1">
                    {summary.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-4">
            {mockTestResults.map((test) => (
              <Card key={test.id} className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FlaskConical className="h-4 w-4 text-purple-500" />
                      {test.title}
                    </CardTitle>
                    <Badge className={getMoodColor(test.level)}>{test.level}</Badge>
                  </div>
                  <CardDescription>{test.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">得分</span>
                      <span className="font-medium">{test.score}分</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${test.score}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {test.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="border-0 shadow-sm h-[500px] flex flex-col">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  与AI对话
                </CardTitle>
                <CardDescription>在这里记录你的心情，AI会陪你聊天</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium">你好，我是心愈AI</p>
                    <p className="text-sm text-muted-foreground">有什么想聊的吗？我在这里倾听你</p>
                  </div>
                ) : (
                  chatMessages.map((msg) => (
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
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="输入你想说的话..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendChat()
                      }
                    }}
                    className="resize-none min-h-[44px] max-h-32"
                  />
                  <Button onClick={handleSendChat} className="shrink-0 px-4">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

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
                <li><Link href="/psychological-test" className="hover:text-primary transition-colors">心理测试</Link></li>
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
  return <SoulArchivePage />
}
