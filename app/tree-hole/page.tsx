"use client"

import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Home,
  MessageSquare,
  User,
  Loader2,
  CheckCircle,
  XCircle,
  Heart,
  Send,
  Shield,
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
  Settings,
  FlaskConical,
    BookOpen,
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

const DEFAULT_AVATAR = "/images/logo.png"

function TreeHolePage() {
  const { user, logout } = useAuth()
  const { setTheme, theme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => logout()
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
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

  useEffect(() => {
    setAvatarError(false)
  }, [user?.avatar])

  const startMatching = () => {
    setMatchingStatus("matching")
    setMatchingProgress(0)
    const progressInterval = setInterval(() => {
      setMatchingProgress(prev => prev >= 100 ? (clearInterval(progressInterval), 100) : prev + 20)
    }, 800)

    setTimeout(() => {
      clearInterval(progressInterval)
      const isSuccess = Math.random() > 0.2
      if (isSuccess) {
        setMatchingStatus("success")
        setMatchedUserTags(["热爱生活", "喜欢音乐", "内向", "思考者"])
        setTimeout(() => {
          setMatchingStatus("chatting")
          startChatCountdown(Number(chatDuration) * 60)
        }, 1200)
      } else {
        setMatchingStatus("failure")
      }
    }, 3000)
  }

  const startChatCountdown = (initialSeconds: number) => {
    setChatCountdown(initialSeconds)
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
    countdownIntervalRef.current = setInterval(() => {
      setChatCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current!)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
    }
  }, [])

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    setMessages([...messages, { id: messages.length + 1, sender: "me", content: newMessage, time: "刚刚" }])
    setNewMessage("")

    setTimeout(() => {
      const res = ["我明白你的感受。", "这确实值得思考。", "谢谢你愿意分享。", "我在这里听你说。"]
      setMessages(p => [...p, {
        id: p.length + 1,
        sender: "other",
        content: res[Math.floor(Math.random() * res.length)],
        time: "刚刚"
      }])
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-background'} border-b`}>
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
            <Link href="/tree-hole" className="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary flex items-center gap-1.5">
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
            <Link href="/soul-archive" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>心灵档案</span>
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
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-8 w-8 p-0 overflow-hidden">
                  {(user?.avatar && !avatarError) ? (
                    <img
                      src={user.avatar}
                      alt="头像"
                      className="h-full w-full object-cover"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <img src={DEFAULT_AVATAR} alt="头像" className="h-full w-full object-cover" />
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
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
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
              <Link href="/tree-hole" className="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary flex items-center gap-2">
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
              <Link href="/soul-archive" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>心灵档案</span>
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
          <div className="space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">树洞倾诉</h2>
              <p className="text-muted-foreground text-sm">匿名分享，安心被倾听</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Lock, label: "完全匿名" },
                { icon: Shield, label: "安全保护" },
                { icon: Heart, label: "温暖倾听" },
              ].map(({ icon: Icon, label }) => (
                <Card key={label} className="border-0 shadow-sm bg-muted/50 text-center py-5 transition-colors hover:bg-muted/70">
                  <CardContent className="p-0 space-y-2">
                    <Icon className="h-6 w-6 mx-auto text-primary/80" />
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <p className="text-center text-muted-foreground text-sm">选择聊天时长</p>
                <RadioGroup value={chatDuration} onValueChange={setChatDuration} className="grid grid-cols-3 gap-4">
                  {["15", "30", "60"].map((v) => (
                    <div key={v} className="relative">
                      <RadioGroupItem value={v} id={v} className="peer sr-only" />
                      <Label
                        htmlFor={v}
                        className="flex flex-col items-center justify-center py-6 rounded-2xl cursor-pointer transition-all bg-muted/50 hover:bg-muted peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary border-2 border-transparent peer-data-[state=checked]:border-primary/30"
                      >
                        <span className="text-2xl font-semibold">{v}</span>
                        <span className="text-xs text-muted-foreground mt-1">分钟</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Button
                  onClick={startMatching}
                  className="w-full py-6 rounded-xl text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                >
                  <Users className="mr-2 h-5 w-5" />
                  开始匹配
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">全程匿名，不留记录，放心倾诉。</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {matchingStatus === "matching" && (
          <Card className="border-0 shadow-sm">
            <CardContent className="text-center space-y-8 py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
              <p className="text-xl font-medium text-foreground">正在为你寻找倾听者</p>
              <div className="w-full max-w-xs mx-auto h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: matchingProgress + "%" }} />
              </div>
            </CardContent>
          </Card>
        )}

        {matchingStatus === "success" && (
          <Card className="border-0 shadow-sm">
            <CardContent className="text-center space-y-6 py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <p className="text-xl font-medium text-foreground">匹配成功</p>
              <div className="flex flex-wrap justify-center gap-2">
                {matchedUserTags.map((t, i) => (
                  <Badge key={i} variant="secondary" className="rounded-full px-4 py-1.5">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {matchingStatus === "failure" && (
          <Card className="border-0 shadow-sm">
            <CardContent className="text-center space-y-6 py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted">
                <XCircle className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-xl font-medium text-foreground">暂时未找到匹配</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button onClick={startMatching} className="bg-primary hover:bg-primary/90 text-primary-foreground">重试</Button>
                <Button variant="outline" onClick={() => router.push("/")}>返回首页</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {matchingStatus === "chatting" && (
          <Card className="border-0 shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="py-4 border-b bg-muted/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">匿名倾听者</p>
                    <p className="text-xs text-muted-foreground">安心倾诉，全程保密</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-medium text-foreground">{formatTime(chatCountdown)}</span>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => setShowReturnHomePrompt(true)}>安全退出</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col flex-1 min-h-0">
              <div className="h-[420px] overflow-y-auto space-y-4 p-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">{msg.content}</p>
                      <p className="text-xs opacity-80 mt-1.5">{msg.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t bg-background flex gap-3">
                <Textarea
                  placeholder="输入想说的话..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="resize-none rounded-xl min-h-[72px] border-input bg-muted/50 focus-visible:ring-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 h-[72px] px-6 rounded-xl"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Dialog open={showReturnHomePrompt} onOpenChange={setShowReturnHomePrompt}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>确定返回首页？</DialogTitle>
            <DialogDescription>当前对话会结束，确定要离开吗？</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowReturnHomePrompt(false)}>取消</Button>
            <Button onClick={() => router.push("/")}>确认</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
  return <TreeHolePage />
}