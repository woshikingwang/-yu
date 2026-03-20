"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  MessageSquare,
  User,
  Heart,
  MessageCircle,
  Brain,
  ShoppingBag,
  Calendar,
  LogOut,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
  Edit,
  Clock,
  BookOpen,
  FlaskConical,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

function HomePageContent() {
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

  // 模拟心情数据
  const recentMoods = [
    { date: "06-07", mood: "😊", level: 4 },
    { date: "06-06", mood: "😊", level: 4 },
    { date: "06-05", mood: "🤪", level: 3 },
    { date: "06-04", mood: "😍", level: 5 },
    { date: "06-03", mood: "😥", level: 2 },
    { date: "06-02", mood: "😊", level: 4 },
    { date: "06-01", mood: "😊", level: 4 },
  ]

  const avgMood = 3.0

  const handleLogout = () => {
    logout()
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
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

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-8 md:py-12 max-w-6xl">
        {/* 欢迎卡片 - 带动画效果 */}
        <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 opacity-70"></div>
            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-2">欢迎回来，{user?.name}！</h2>
                  <p className="text-muted-foreground">今天也要保持好心情哦 ✨</p>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/personal-center/quick-mood-edit">记录今日心情</Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="/psychological-consultation/ai-assistant">心理测评</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* 数据概览和快速入口 - 网格布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {/* 今日心情卡片 */}
          <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">今日心情</h3>
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                    <Link href="/personal-center/quick-mood-edit">
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="text-5xl mb-2">😊</div>
                <p className="text-lg font-semibold">开心</p>
                <p className="text-xs text-muted-foreground mt-1">已连续保持良好心情 3 天</p>
              </div>
            </CardContent>
          </Card>

          {/* 心理测评进度 */}
          <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">心理测评进度</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>焦虑自评</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>压力水平</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="mt-4">
                    <Button variant="secondary" className="w-full" asChild>
                    <Link href="/psychological-consultation/assessment">继续测评</Link>
                    </Button>
                  </div>
              </div>
            </CardContent>
          </Card>

          {/* 心理咨询提醒 */}
          <Card className="overflow-hidden hover:shadow-md transition-all duration-300 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">下次咨询</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">6月15日 周六</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">14:00 - 15:00</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/images/counselor-zhang.png" />
                    <AvatarFallback>张</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">张心理咨询师</span>
                </div>
                <Button className="w-full mt-4" asChild>
                    <Link href="/psychological-consultation/1">查看详情</Link>
                  </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近心情和推荐服务 - 双列布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 最近心情 */}
          <Card className="lg:col-span-1 hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">最近心情</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMoods.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm w-12">{item.date}</span>
                    <div className="flex-1 flex items-center">
                      <span className="text-xl mr-3">{item.mood}</span>
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 transition-all duration-500"
                          style={{ width: `${(item.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm w-8 text-right">{item.level}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="secondary" className="w-full" asChild>
                    <Link href="/personal-center/mood-calendar">查看全部</Link>
                  </Button>
              </div>
            </CardContent>
          </Card>

          {/* 推荐服务 */}
          <Card className="lg:col-span-2 hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">推荐服务</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 推荐咨询师 */}
                <Link href="/psychological-consultation/counselor" className="flex gap-4 p-3 rounded-lg border hover:bg-muted transition-colors duration-200">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/images/counselor-wang.png" />
                    <AvatarFallback>王</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">王心理咨询师</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">婚姻家庭治疗师</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        好评率 98%
                      </Badge>
                      <span className="text-xs text-muted-foreground">10年经验</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </Link>

                {/* 推荐课程 */}
                <Link href="/mall/1" className="flex gap-4 p-3 rounded-lg border hover:bg-muted transition-colors duration-200">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-primary/10 flex-shrink-0">
                    <img src="/images/emotion-course-sunset.png" alt="情绪管理课程" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">情绪管理与压力缓解</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">8周系统课程</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        热销
                      </Badge>
                      <span className="text-xs text-muted-foreground">¥199</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </Link>

                {/* 推荐活动 */}
                <Link href="/psychological-consultation/school" className="flex gap-4 p-3 rounded-lg border hover:bg-muted transition-colors duration-200">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-primary/10 flex-shrink-0">
                    <img src="/images/bottle-nature-healing.png" alt="自然疗愈活动" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">自然疗愈工作坊</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">线下活动 · 6月22日</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                        即将开始
                      </Badge>
                      <span className="text-xs text-muted-foreground">名额有限</span>
                    </div>
                  </div>
                  <Button size="sm">
                    报名
                  </Button>
                </Link>

                {/* 推荐文章 */}
                <Link href="/psychological-consultation/ai-assistant" className="flex gap-4 p-3 rounded-lg border hover:bg-muted transition-colors duration-200">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-primary/10 flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">如何应对工作压力与焦虑</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">专业心理文章 · 5分钟阅读</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">阅读量 2.3k</span>
                      <span className="text-xs text-muted-foreground">收藏 452</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </Link>

                {/* 心灵档案 */}
                <Link href="/soul-archive" className="flex gap-4 p-3 rounded-lg border hover:bg-muted transition-colors duration-200">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-gradient-to-br from-primary/20 to-purple-100 flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">心灵档案</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">记录你的心理成长</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        新功能
                      </Badge>
                      <span className="text-xs text-muted-foreground">漂流瓶 · 树洞 · 测试</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="mt-4">
                <Button variant="secondary" className="w-full" asChild>
                    <Link href="/psychological-consultation">探索更多服务</Link>
                  </Button>
              </div>
            </CardContent>
          </Card>
        </div>

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
      </main>
    </div>
  )
}

export default function Page() {
  return <HomePageContent />
}
