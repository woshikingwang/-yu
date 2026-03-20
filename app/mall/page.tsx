"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowLeft, Home, MessageSquare, User, ShoppingBag, Star, Zap, Gift, Menu, X, Moon, Sun, MessageCircle, Brain, Calendar, LogOut, Settings, Heart, FlaskConical, BookOpen } from "lucide-react"
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

const mockProducts = [
  {
    id: "p1",
    name: "《心理学与生活》经典版",
    category: "心理书籍",
    price: 68.0,
    originalPrice: 88.0,
    image: "/images/psychology-life-book.jpg",
    rating: 4.8,
    sales: 1256,
    isRecommended: true,
    isNew: false,
    tags: ["经典", "入门", "畅销"],
    discount: "限时优惠",
  },
  {
    id: "p2",
    name: "冥想引导音频套装",
    category: "冥想音频",
    price: 39.9,
    originalPrice: 59.9,
    image: "/images/meditation-audio-starry.png",
    rating: 4.9,
    sales: 2341,
    isRecommended: true,
    isNew: false,
    tags: ["放松", "助眠", "专业"],
    discount: "新用户专享",
  },
  {
    id: "p3",
    name: "情绪管理与压力缓解课程",
    category: "心理课程",
    price: 199.0,
    originalPrice: 299.0,
    image: "/images/emotion-course-sunset.png",
    rating: 4.7,
    sales: 867,
    isRecommended: false,
    isNew: true,
    tags: ["专业", "实用", "认证"],
    courseInfo: {
      instructor: "李心理咨询师",
      duration: "8小时",
      lessons: 12,
    },
  },
  {
    id: "p4",
    name: "治愈系手工香薰蜡烛",
    category: "心灵礼品",
    price: 89.0,
    originalPrice: 120.0,
    image: "/images/candle-aromatherapy.png",
    rating: 4.6,
    sales: 543,
    isRecommended: false,
    isNew: true,
    tags: ["手工", "香薰", "治愈"],
    discount: "买二送一",
  },
  {
    id: "p5",
    name: "《冥想正念练习指南》",
    category: "心理书籍",
    price: 45.0,
    originalPrice: 60.0,
    image: "/images/meditation-guide-book.png",
    rating: 4.5,
    sales: 789,
    isRecommended: false,
    isNew: false,
    tags: ["正念", "练习", "指导"],
  },
  {
    id: "p6",
    name: "深度睡眠音乐专辑",
    category: "冥想音频",
    price: 29.9,
    originalPrice: 39.9,
    image: "/images/sleep-music-night.png",
    rating: 4.8,
    sales: 1678,
    isRecommended: true,
    isNew: false,
    tags: ["睡眠", "音乐", "自然"],
    discount: "限时特价",
  },
]

const categoryColors: Record<string, string> = {
  心理书籍: "bg-blue-50 text-blue-700 border-blue-200",
  冥想音频: "bg-green-50 text-green-700 border-green-200",
  心理课程: "bg-amber-50 text-amber-700 border-amber-200",
  心灵礼品: "bg-purple-50 text-purple-700 border-purple-200",
}

function MallPage() {
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
            <Link href="/mall" className="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary flex items-center gap-1.5">
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
              <Link href="/mall" className="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-primary/10 text-primary flex items-center gap-2">
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600" />
            <Input
              type="search"
              placeholder="搜索商品名称..."
              className="w-full pl-9 border-gray-200 focus:border-blue-600 bg-white"
            />
          </div>
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] border-gray-200 bg-white">
                <SelectValue placeholder="分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有分类</SelectItem>
                <SelectItem value="心理书籍">心理书籍</SelectItem>
                <SelectItem value="冥想音频">冥想音频</SelectItem>
                <SelectItem value="心理课程">心理课程</SelectItem>
                <SelectItem value="心灵礼品">心灵礼品</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="default">
              <SelectTrigger className="w-[140px] border-gray-200 bg-white">
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">默认排序</SelectItem>
                <SelectItem value="price-asc">价格升序</SelectItem>
                <SelectItem value="price-desc">价格降序</SelectItem>
                <SelectItem value="sales">销量排序</SelectItem>
                <SelectItem value="rating">评分排序</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger
              value="recommended"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              <Zap className="h-4 w-4 mr-1" />
              推荐商品
            </TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              <Gift className="h-4 w-4 mr-1" />
              新品上架
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
              全部商品
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockProducts
                .filter((product) => product.isRecommended)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockProducts
                .filter((product) => product.isNew)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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
  return <MallPage />
}

function ProductCard({ product }: { product: (typeof mockProducts)[0] }) {
  return (
    <Link href={`/mall/${product.id}`} className="block">
      <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group h-full cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">新品</Badge>}
              {product.isRecommended && <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0">推荐</Badge>}
              {product.discount && (
                <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 text-xs">{product.discount}</Badge>
              )}
            </div>

            <div className="absolute top-3 right-3">
              <Badge className={`${categoryColors[product.category]} border text-xs`}>{product.category}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <CardTitle className="line-clamp-2 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors mb-2">
            {product.name}
          </CardTitle>

          {product.category === "心理课程" && product.courseInfo && (
            <div className="mb-3 p-2 bg-blue-50 rounded-lg">
              <div className="text-xs text-blue-600 space-y-1">
                <p>讲师：{product.courseInfo.instructor}</p>
                <p>
                  时长：{product.courseInfo.duration} • {product.courseInfo.lessons}节课
                </p>
              </div>
            </div>
          )}

          <div className="mb-3 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-600">
                {tag}
              </Badge>
            ))}
            {product.tags.length > 2 && (
              <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                +{product.tags.length - 2}
              </Badge>
            )}
          </div>

          <div className="mb-3 flex items-center justify-between text-xs text-blue-600">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span>销量{product.sales}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-800">¥{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-blue-600 line-through">¥{product.originalPrice}</span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <Badge className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                省¥{(product.originalPrice - product.price).toFixed(0)}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
