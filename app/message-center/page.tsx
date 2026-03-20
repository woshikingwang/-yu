"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  ArrowLeft,
  Home,
  MessageSquare,
  User,
  Heart,
  Bell,
  MessageCircle,
  ShoppingBag,
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

// Mock data for demonstration
const mockMessages = [
  {
    id: "m1",
    type: "漂流瓶",
    title: "您的漂流瓶收到新回应",
    content: "用户“小确幸”回应了您的漂流瓶“关于最近的压力”",
    time: "2025-06-07 14:30",
    isRead: false,
    avatar: "/images/user-xiaoquexing.png",
    link: "/drifting-bottle/1",
  },
  {
    id: "m2",
    type: "树洞",
    title: "匿名聊天消息",
    content: "您有一条新的匿名聊天消息",
    time: "2025-06-07 12:15",
    isRead: false,
    avatar: "/images/user-anonymous.png",
    link: "/tree-hole",
  },
  {
    id: "m3",
    type: "咨询",
    title: "张老师回复了您的咨询",
    content: "关于您提到的焦虑问题，我建议您可以尝试以下几种方法...",
    time: "2025-06-07 10:45",
    isRead: true,
    avatar: "/images/counselor-zhang.png",
    link: "/psychological-consultation/c1",
  },
  {
    id: "m4",
    type: "系统通知",
    title: "学生认证审核通过",
    content: "恭喜您！您的学生身份认证已通过审核，现在可以使用学校心理咨询处功能。",
    time: "2025-06-06 16:20",
    isRead: true,
    avatar: "/images/system-avatar.png",
    link: "/personal-center",
  },
  {
    id: "m5",
    type: "系统通知",
    title: "订单状态更新",
    content: '您购买的"情绪管理与压力缓解课程"已发货，物流单号：SF1234567890',
    time: "2025-06-06 09:30",
    isRead: true,
    avatar: "/images/system-avatar.png",
    link: "/mall",
  },
  {
    id: "m6",
    type: "漂流瓶",
    title: "您的漂流瓶收到新回应",
    content: '用户"温暖阳光"回应了您的漂流瓶"失眠的夜晚"',
    time: "2025-06-05 22:10",
    isRead: true,
    avatar: "/images/user-wennuan.png",
    link: "/drifting-bottle/3",
  },
]

function MessageCenterPage() {
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
  const [selectedType, setSelectedType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMessages = mockMessages.filter((message) => {
    const matchesType = selectedType === "all" || message.type === selectedType
    const matchesSearch =
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const unreadCount = mockMessages.filter((m) => !m.isRead).length

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "漂流瓶":
        return <Heart className="h-4 w-4" />
      case "树洞":
        return <MessageCircle className="h-4 w-4" />
      case "咨询":
        return <Brain className="h-4 w-4" />
      case "系统通知":
        return <Bell className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "漂流瓶":
        return "bg-pink-50 text-pink-700"
      case "树洞":
        return "bg-purple-50 text-purple-700"
      case "咨询":
        return "bg-blue-50 text-blue-700"
      case "系统通知":
        return "bg-green-50 text-green-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
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
            <Link href="/message-center" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5 relative">
              <MessageSquare className="h-4 w-4" />
              <span>消息中心</span>
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
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
              <Link href="/message-center" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2 relative">
                <MessageSquare className="h-4 w-4" />
                <span>消息中心</span>
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-8 md:py-12 max-w-6xl">
        {/* Search and Filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="搜索消息内容..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="消息类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有消息</SelectItem>
              <SelectItem value="漂流瓶">漂流瓶</SelectItem>
              <SelectItem value="树洞">树洞聊天</SelectItem>
              <SelectItem value="咨询">心理咨询</SelectItem>
              <SelectItem value="系统通知">系统通知</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">全部消息</TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              未读消息
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-2 h-4 min-w-[16px] rounded-full text-xs bg-blue-500 text-white"
                >
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredMessages.length === 0 ? (
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-800">暂无消息</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredMessages.map((message) => (
                  <Card
                    key={message.id}
                    className={`cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 bg-white border-0 shadow-sm ${!message.isRead ? "border-l-4 border-l-primary" : ""}`}
                  >
                    <CardContent className="p-4">
                      <Link href={message.link} className="block">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={message.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{getTypeIcon(message.type)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3
                                className={`font-medium truncate ${!message.isRead ? "text-primary" : "text-gray-800"}`}
                              >
                                {message.title}
                              </h3>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Badge className={`text-xs ${getTypeColor(message.type)}`}>{message.type}</Badge>
                                {!message.isRead && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {message.content}
                            </p>
                            <p className="text-xs text-gray-500">{message.time}</p>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {filteredMessages.filter((m) => !m.isRead).length === 0 ? (
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-800">暂无未读消息</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredMessages
                  .filter((m) => !m.isRead)
                  .map((message) => (
                    <Card
                      key={message.id}
                      className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 bg-white border-0 shadow-sm border-l-4 border-l-primary"
                    >
                      <CardContent className="p-4">
                        <Link href={message.link} className="block">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={message.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{getTypeIcon(message.type)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium truncate text-primary">{message.title}</h3>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <Badge className={`text-xs ${getTypeColor(message.type)}`}>{message.type}</Badge>
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                                {message.content}
                              </p>
                              <p className="text-xs text-gray-500">{message.time}</p>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

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
  return <MessageCenterPage />
}
