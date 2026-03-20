"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Home, Heart, MessageSquare, User, Clock, Filter, Plus, Menu, X, Moon, Sun, MessageCircle, Brain, ShoppingBag, Calendar, LogOut, Settings, FlaskConical, Sparkles, BookOpen } from "lucide-react"
import DriftingBottlePublishModal from "@/components/drifting-bottle-publish-modal"
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

const mockBottles = [
  {
    id: "1",
    title: "关于最近的压力",
    content:
      "最近工作压力很大，感觉有点喘不过气来，每天都觉得很疲惫，晚上也睡不好。希望有人能给我一些建议，或者只是听我说说。",
    author: "匿名用户",
    date: "2025-06-05",
    time: "10:30",
    responses: 5,
    likes: 12,
    views: 48,
    theme: "困惑",
    mood: "焦虑",
    image: "/images/bottle-anxiety-art.jpeg",
    hasImage: true,
    isHot: false,
    tags: ["工作压力", "失眠", "求助"],
  },
  {
    id: "2",
    title: "分享一个好消息！",
    content: "我考上心仪的大学啦！太开心了，想和大家分享这份喜悦！感谢一路上支持我的朋友们。",
    author: "小确幸",
    date: "2025-06-04",
    time: "15:20",
    responses: 12,
    likes: 28,
    views: 156,
    theme: "分享",
    mood: "开心",
    image: "/images/bottle-nature-healing.jpeg",
    hasImage: true,
    isHot: true,
    tags: ["好消息", "大学", "感谢"],
  },
  {
    id: "3",
    title: "失眠的夜晚",
    content: "又是一个失眠的夜晚，思绪万千，不知道该怎么办。看着窗外的月亮，感觉特别孤独...",
    author: "匿名用户",
    date: "2025-06-03",
    time: "02:15",
    responses: 8,
    likes: 15,
    views: 67,
    theme: "心情",
    mood: "孤独",
    image: "/images/bottle-insomnia-cat.jpeg",
    hasImage: true,
    isHot: false,
    tags: ["失眠", "孤独", "夜晚"],
  },
]

const themeColors: Record<string, string> = {
  困惑: "bg-amber-50 text-amber-700 border-amber-200",
  分享: "bg-green-50 text-green-700 border-green-200",
  心情: "bg-blue-50 text-blue-700 border-blue-200",
  求助: "bg-purple-50 text-purple-700 border-purple-200",
}

const moodColors: Record<string, string> = {
  焦虑: "bg-orange-50 text-orange-700",
  开心: "bg-green-50 text-green-700",
  孤独: "bg-blue-50 text-blue-700",
}

function DriftingBottleListPage() {
  const { user, logout } = useAuth()
  const { setTheme, theme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("latest")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("all")
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

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

  const filteredBottles = mockBottles.filter((bottle) => {
    const matchesSearch =
      bottle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bottle.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTheme = selectedTheme === "all" || bottle.theme === selectedTheme
    return matchesSearch && matchesTheme
  })

  const sortedBottles = [...filteredBottles].sort((a, b) => {
    switch (activeTab) {
      case "hot":
        return b.likes - a.likes
      case "responses":
        return b.responses - a.responses
      default:
        return new Date(b.date + " " + b.time).getTime() - new Date(a.date + " " + a.time).getTime()
    }
  })

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
        {/* Header with publish button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">心灵漂流瓶</h1>
            <p className="text-muted-foreground text-sm mt-1">把心事装进瓶子，漂向远方</p>
          </div>
          <div className="flex gap-2">

            <Button
              variant="outline"
              onClick={() => setIsPublishModalOpen(true)}
              className="gap-2 bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-pink-200"
            >
              <Sparkles className="h-4 w-4 text-pink-500" />
              发布漂流瓶
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="搜索漂流瓶内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 border-gray-200"
                />
              </div>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="w-[140px] border-gray-200">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="筛选主题" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有主题</SelectItem>
                  <SelectItem value="心情">心情</SelectItem>
                  <SelectItem value="困惑">困惑</SelectItem>
                  <SelectItem value="分享">分享</SelectItem>
                  <SelectItem value="求助">求助</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border-0 shadow-sm">
            <TabsTrigger value="latest" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              最新发布
            </TabsTrigger>
            <TabsTrigger value="hot" className="flex items-center gap-2">
              热门推荐
            </TabsTrigger>
            <TabsTrigger value="responses" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              回应最多
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedBottles.map((bottle) => (
                <Card key={bottle.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  {bottle.hasImage && (
                    <div className="relative h-40 overflow-hidden rounded-t-lg">
                      <img
                        src={bottle.image || "/placeholder.svg"}
                        alt={bottle.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <Badge className={`${themeColors[bottle.theme]} border`}>{bottle.theme}</Badge>
                        <Badge className={`${moodColors[bottle.mood]} border-0`}>{bottle.mood}</Badge>
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-gray-800 line-clamp-2">{bottle.title}</CardTitle>
                    <CardDescription className="flex items-center justify-between text-xs text-gray-500">
                      <span>{bottle.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {bottle.date}
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="line-clamp-2 text-sm text-gray-600 leading-relaxed">{bottle.content}</p>

                    <div className="flex flex-wrap gap-1">
                      {bottle.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-200 text-gray-600">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {bottle.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {bottle.responses}
                        </span>
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Link href={`/drifting-bottle/${bottle.id}`}>查看详情</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-800 hover:bg-white">
                <Plus className="h-4 w-4 mr-2" />
                加载更多漂流瓶
              </Button>
            </div>
          </TabsContent>
        </Tabs>

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

        {/* Publish Modal */}
        <DriftingBottlePublishModal
          open={isPublishModalOpen}
          onOpenChange={setIsPublishModalOpen}
        />
      </main>
    </div>
  )
}

export default function Page() {
  return <DriftingBottleListPage />
}
