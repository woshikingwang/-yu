"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Home,
  MessageSquare,
  User,
  ShoppingBag,
  Star,
  Clock,
  Award,
  Heart,
  Bot,
  BookOpen,
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
import { useState, useEffect } from "react"

// Mock data for counselors
const mockCounselors = [
  {
    id: "c1",
    name: "张心理咨询师",
    title: "国家二级心理咨询师",
    specialties: ["焦虑症", "抑郁症", "情感问题"],
    experience: "15年",
    rating: 4.9,
    reviewCount: 328,
    offlinePrice: 300,
    avatar: "/images/counselor-zhang.png",
    available: true,
    consultationTypes: ["视频咨询", "语音咨询", "文字咨询", "面对面咨询"],
  },
  {
    id: "c2",
    name: "李心理咨询师",
    title: "临床心理学博士",
    specialties: ["职场压力", "人际关系", "自我成长"],
    experience: "12年",
    rating: 4.8,
    reviewCount: 256,
    offlinePrice: 350,
    avatar: "/images/counselor-li.png",
    available: true,
    consultationTypes: ["视频咨询", "语音咨询", "面对面咨询"],
  },
  {
    id: "c3",
    name: "王心理咨询师",
    title: "婚姻家庭治疗师",
    specialties: ["婚姻问题", "家庭关系", "亲子教育"],
    experience: "10年",
    rating: 4.7,
    reviewCount: 189,
    offlinePrice: 280,
    avatar: "/images/counselor-wang.png",
    available: false,
    consultationTypes: ["视频咨询", "语音咨询"],
  },
]

const specialtyColors: Record<string, string> = {
  焦虑症: "bg-blue-50 text-blue-600 border-blue-200",
  抑郁症: "bg-purple-50 text-purple-600 border-purple-200",
  情感问题: "bg-pink-50 text-pink-600 border-pink-200",
  职场压力: "bg-amber-50 text-amber-600 border-amber-200",
  人际关系: "bg-green-50 text-green-600 border-green-200",
  自我成长: "bg-teal-50 text-teal-600 border-teal-200",
  婚姻问题: "bg-rose-50 text-rose-600 border-rose-200",
  家庭关系: "bg-indigo-50 text-indigo-600 border-indigo-200",
  亲子教育: "bg-cyan-50 text-cyan-600 border-cyan-200",
}

function PsychologicalConsultationPage() {
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
            <Link href="/psychological-consultation" className="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary flex items-center gap-1.5">
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
              <Link href="/psychological-consultation" className="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary flex items-center gap-2">
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
        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <Link href="/psychological-consultation/ai-assistant">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-50 p-3 group-hover:bg-blue-100 transition-colors">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-800">AI心理助手</CardTitle>
                    <CardDescription className="text-gray-600">24小时在线陪伴</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <Link href="/psychological-consultation/knowledge-base">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-50 p-3 group-hover:bg-green-100 transition-colors">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-800">自测与知识库</CardTitle>
                    <CardDescription className="text-gray-600">了解自己的心理状态</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        </div>

        {/* Free Consultation Notice */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white p-2">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">线上咨询首次免费</p>
                <p className="text-sm text-gray-600">视频、语音、文字咨询首次免费，后续收费为线下价格的1/3，线下面对面咨询按时收费</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Counselor List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">专业咨询师</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              查看全部
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCounselors.map((counselor) => {
              const hasOfflineConsultation = counselor.consultationTypes.includes("面对面咨询")
              const onlineTypes = counselor.consultationTypes.filter((type) => type !== "面对面咨询")

              return (
                <Card
                  key={counselor.id}
                  className="bg-white border-0 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col"
                >
                  <CardHeader className="pb-4 flex-shrink-0">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16 border-2 border-blue-100">
                          <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                          <AvatarFallback className="bg-blue-50 text-blue-600 text-lg">
                            {counselor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <CardTitle className="text-lg text-gray-800 truncate">{counselor.name}</CardTitle>
                          {counselor.available && (
                            <Badge className="bg-green-50 text-green-600 border-green-200 flex-shrink-0">在线</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{counselor.title}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3 text-amber-500 flex-shrink-0" />
                            <span className="whitespace-nowrap">{counselor.experience}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400 flex-shrink-0" />
                            <span className="whitespace-nowrap">{counselor.rating}</span>
                            <span className="text-gray-500 whitespace-nowrap">({counselor.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    {/* Specialties */}
                    <div className="flex-shrink-0">
                      <p className="text-sm text-gray-600 mb-2">擅长领域：</p>
                      <div className="flex flex-wrap gap-2">
                        {counselor.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`${specialtyColors[specialty]} border text-xs`}
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Consultation Types */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">咨询方式：</p>
                      <div className="space-y-2">
                        {/* Free Online Consultations */}
                        {onlineTypes.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {onlineTypes.map((type, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-green-200 text-green-600 bg-green-50 text-xs whitespace-nowrap relative overflow-hidden"
                              >
                                {type} <span className="ml-1 text-green-700 font-medium">首次免费</span>
                                <span className="ml-1 text-gray-500">¥{Math.round(counselor.offlinePrice / 3)}/次起</span>
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Paid Offline Consultation */}
                        {hasOfflineConsultation && (
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant="outline"
                              className="border-blue-200 text-blue-600 bg-blue-50 text-xs whitespace-nowrap"
                            >
                              面对面咨询{" "}
                              <span className="ml-1 text-blue-700 font-medium">¥{counselor.offlinePrice}/时</span>
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 border-t border-gray-100 flex-shrink-0">
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700 group-hover:shadow-md transition-all"
                      >
                        <Link href={`/psychological-consultation/${counselor.id}`}>立即预约</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">为什么选择我们</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-blue-50 p-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-800">专业认证</h3>
                <p className="text-sm text-gray-600">所有咨询师均持有国家认证资质</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-green-50 p-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800">首次免费</h3>
                <p className="text-sm text-gray-600">线上咨询首次免费，后续优惠价格</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-purple-50 p-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-800">灵活预约</h3>
                <p className="text-sm text-gray-600">24小时在线预约，时间灵活</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-amber-50 p-4">
                  <MessageCircle className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-medium text-gray-800">持续支持</h3>
                <p className="text-sm text-gray-600">咨询后持续跟进，全程陪伴</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
  return <PsychologicalConsultationPage />
}
