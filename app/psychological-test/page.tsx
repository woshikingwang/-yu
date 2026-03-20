"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  MessageSquare,
  User,
  Heart,
  Brain,
  ShoppingBag,
  MessageCircle,
  Menu,
  X,
  Moon,
  Sun,
  ChevronRight,
  FlaskConical,
  Star,
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

const MOCK_TESTS = [
  { id: "1", title: "原生家庭伤痛评估", count: 28374, free: true, gradient: "from-amber-200 to-orange-300", image: "/images/psychological-test/1.jpg", tags: ["情感", "原生家庭"] },
  { id: "2", title: "专业爱情测评", count: 68733, free: true, gradient: "from-rose-200 to-pink-300", image: "/images/psychological-test/2.jpg", tags: ["爱情", "性格"] },
  { id: "3", title: "致命吸引力测试", count: 3691, free: false, gradient: "from-violet-200 to-purple-300", image: "/images/psychological-test/3.jpg", tags: ["情感", "吸引力"] },
  { id: "4", title: "潜意识投射测试", count: 64037, free: true, gradient: "from-sky-200 to-blue-300", image: "/images/psychological-test/4.jpg", tags: ["潜意识", "投射"] },
  { id: "5", title: "深层心理需求测评", count: 30040, free: true, gradient: "from-teal-200 to-cyan-300", image: "/images/psychological-test/5.jpg", tags: ["需求", "心理"] },
  { id: "6", title: "潜意识性爱测试", count: 155207, free: false, gradient: "from-fuchsia-200 to-purple-300", image: "/images/psychological-test/6.jpg", tags: ["潜意识", "情感"] },
  { id: "7", title: "职业性格测评", count: 3098, free: true, gradient: "from-slate-200 to-slate-400", image: "/images/psychological-test/7.jpg", tags: ["职业", "性格"] },
  { id: "8", title: "焦虑测试 (专业版)", count: 50630, free: true, gradient: "from-indigo-200 to-blue-400", image: "/images/psychological-test/8.jpg", tags: ["焦虑", "专业"] },
]

function TestCard({ test }: { test: typeof MOCK_TESTS[0] }) {
  return (
    <Link href={`/psychological-test/${test.id}`} className="block">
      <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group h-full cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden">
            {test.image ? (
              <img
                src={test.image}
                alt={test.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${test.gradient}`} />
            )}

            <div className="absolute top-3 left-3">
              {test.free && (
                <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">免费</Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <CardTitle className="line-clamp-2 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors mb-2">
            {test.title}
          </CardTitle>

          <div className="mb-3 flex flex-wrap gap-1">
            {test.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-600">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-blue-600">
            <span>{test.count.toLocaleString()}人测试过</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>4.8</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

const DEFAULT_AVATAR = "/images/logo.png"

function PsychologicalTestContent() {
  const { user, logout } = useAuth()
  const { setTheme, theme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setAvatarError(false)
  }, [user?.avatar])

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
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
            <Link href="/tree-hole" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              <span>树洞</span>
            </Link>
            <Link href="/psychological-consultation" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1.5">
              <Brain className="h-4 w-4" />
              <span>心理咨询</span>
            </Link>
            <Link href="/psychological-test" className="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary flex items-center gap-1.5">
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
                  {(user?.avatar && !avatarError) ? (
                    <img
                      src={user.avatar}
                      alt="头像"
                      className="h-full w-full object-cover"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <img
                      src={DEFAULT_AVATAR}
                      alt="头像"
                      className="h-full w-full object-cover"
                    />
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
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
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
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>首页</span>
              </Link>
              <Link href="/drifting-bottle" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>漂流瓶</span>
              </Link>
              <Link href="/tree-hole" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>树洞</span>
              </Link>
              <Link href="/psychological-consultation" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>心理咨询</span>
              </Link>
              <Link href="/psychological-test" className="px-3 py-2 rounded-md text-sm font-medium bg-primary/10 text-primary flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                <span>心理测试</span>
              </Link>
              <Link href="/mall" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>心理商城</span>
              </Link>
              <Link href="/message-center" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>消息中心</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main: 心理测试 区块 */}
      <main className="container mx-auto flex-1 px-4 py-8 md:py-12 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#5b4d9e] dark:text-[#8b7cc4] tracking-tight">
              心理测试
            </h2>
            <p className="text-muted-foreground text-sm mt-1">认识自己·了解他人</p>
          </div>
          <Link
            href="/psychological-test"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#5b4d9e] dark:text-[#8b7cc4] hover:underline"
          >
            <span>1600+ 趣味测试</span>
            <span className="text-muted-foreground"> 140+ 专业测评</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Card Grid - 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_TESTS.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>

        {/* Optional: right arrow hint for more (carousel feel) */}
        <div className="flex justify-end mt-6">
          <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
            <Link href="/psychological-test">
              更多测评 <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
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

export default function PsychologicalTestPage() {
  return <PsychologicalTestContent />
}
