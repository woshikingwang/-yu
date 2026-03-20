"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import {
  Loader2,
  Mail,
  Lock,
  User,
  EyeIcon,
  EyeOffIcon,
  Heart,
  MessageCircle,
  Users,
  BookOpen,
  ShoppingBag,
  Calendar,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export default function LandingPage() {
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        handleLoginSuccess()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const handleLoginSuccess = () => {
    setIsLoading(false)
    if (login) {
      login(email, password, activeTab === "register" ? name : undefined)
    }
    setShowLoginDialog(false)
    router.push("/")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("请输入邮箱地址")
      return
    }

    if (!password) {
      setError("请输入密码")
      return
    }

    if (activeTab === "register" && !name) {
      setError("请输入您的姓名")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("请输入有效的邮箱地址")
      return
    }

    if (password.length < 6) {
      setError("密码长度至少为6位")
      return
    }

    setIsLoading(true)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const features = [
    {
      icon: MessageCircle,
      title: "漂流瓶",
      description: "匿名倾诉心声，与陌生人分享温暖",
      color: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: Users,
      title: "树洞匹配",
      description: "智能匹配倾听者，找到心灵共鸣",
      color: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      icon: Heart,
      title: "心理咨询",
      description: "专业咨询师在线服务，线上咨询首次免费",
      color: "bg-pink-50",
      iconColor: "text-pink-500",
    },
    {
      icon: Calendar,
      title: "心情日记",
      description: "记录每日心情，追踪情绪变化",
      color: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      icon: ShoppingBag,
      title: "心灵商城",
      description: "精选心理健康产品与课程",
      color: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      icon: BookOpen,
      title: "知识库",
      description: "心理健康知识与自测工具",
      color: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
  ]

  const testimonials = [
    {
      name: "小雨",
      avatar: "/images/mood-happy.png",
      rating: 5,
      content: "在这里找到了倾诉的出口，漂流瓶功能真的很温暖，收到陌生人的鼓励让我重新找回了生活的勇气。",
    },
    {
      name: "阿明",
      avatar: "/images/mood-calm.png",
      rating: 5,
      content: "线上心理咨询首次免费，咨询师非常专业，帮助我走出了焦虑困境。心情日记功能也很实用！",
    },
    {
      name: "晓雪",
      avatar: "/images/mood-excited.png",
      rating: 5,
      content: "树洞匹配功能很有趣，遇到了很多温暖的倾听者。这个平台真的治愈了我的心灵。",
    },
  ]

  const stats = [
    { number: "50万+", label: "注册用户" },
    { number: "100万+", label: "漂流瓶投递" },
    { number: "500+", label: "专业咨询师" },
    { number: "98%", label: "用户满意度" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7fa] to-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="心愈 Logo" width={40} height={40} />
              <span className="text-xl font-bold text-gray-800">心愈</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                功能特色
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                用户评价
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                关于我们
              </Link>
            </div>
            <Button onClick={() => setShowLoginDialog(true)} className="bg-[#9b8cc6] hover:bg-[#8a7ab5]">
              登录 / 注册
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">您的心灵港湾</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                心愈
                <br />
                <span className="text-[#9b8cc6]">治愈每一颗心</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                专业的心理健康服务平台，提供匿名倾诉、智能匹配、专业咨询等服务。让每个人都能找到心灵的归属。
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  onClick={() => setShowLoginDialog(true)}
                  className="bg-[#9b8cc6] hover:bg-[#8a7ab5] text-white px-8"
                >
                  立即体验
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#9b8cc6] text-[#9b8cc6] hover:bg-purple-50 bg-transparent"
                >
                  了解更多
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl blur-3xl opacity-30"></div>
                <Image
                  src="/images/logo.png"
                  alt="心愈应用"
                  width={500}
                  height={500}
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#9b8cc6] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特色 */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">功能特色</h2>
            <p className="text-xl text-gray-600">全方位的心理健康服务，陪伴您的每一天</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">用户评价</h2>
            <p className="text-xl text-gray-600">来自真实用户的反馈</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.content}</p>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">认证用户</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">准备好开始您的心灵之旅了吗？</h2>
          <p className="text-xl text-gray-600 mb-8">加入我们，让专业的心理健康服务陪伴您的每一天</p>
          <Button
            size="lg"
            onClick={() => setShowLoginDialog(true)}
            className="bg-[#9b8cc6] hover:bg-[#8a7ab5] text-white px-8"
          >
            立即注册，开启治愈之旅
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* 底部 */}
      <footer id="about" className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/images/logo.png" alt="心愈 Logo" width={32} height={32} />
                <span className="text-xl font-bold text-white">心愈</span>
              </div>
              <p className="text-sm leading-relaxed">专业的心理健康服务平台，为您提供全方位的心灵关怀。</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">产品服务</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    漂流瓶
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    树洞匹配
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    心理咨询
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    心灵商城
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">关于我们</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    公司简介
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    联系我们
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    加入我们
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    用户协议
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">联系方式</h3>
              <ul className="space-y-2 text-sm">
                <li>客服邮箱：support@xinyu.com</li>
                <li>合作咨询：business@xinyu.com</li>
                <li>服务时间：9:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 心愈 Xinyu. 保留所有权利。</p>
          </div>
        </div>
      </footer>

      {/* 登录对话框 */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent style={{ backgroundColor: "#f5f1fc", maxWidth: "28rem" }}>
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex justify-center mb-4">
                <Image src="/images/logo.png" alt="心愈 Logo" width={60} height={60} />
              </div>
            </DialogTitle>
          </DialogHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">邮箱地址</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email-login"
                      type="email"
                      placeholder="请输入邮箱地址"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password-login">密码</Label>
                    <Link href="#" className="text-xs text-[#9b8cc6] hover:underline">
                      忘记密码?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password-login"
                      type={showPassword ? "text" : "password"}
                      placeholder="请输入密码"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label htmlFor="remember" className="text-sm font-medium leading-none">
                    记住我
                  </label>
                </div>

                {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">{error}</div>}

                <Button type="submit" className="w-full bg-[#9b8cc6] hover:bg-[#8a7ab5]" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      登录中...
                    </>
                  ) : (
                    "登录"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-register">姓名</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name-register"
                      type="text"
                      placeholder="请输入您的姓名"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-register">邮箱地址</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email-register"
                      type="email"
                      placeholder="请输入邮箱地址"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-register">密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password-register"
                      type={showPassword ? "text" : "password"}
                      placeholder="请设置密码 (至少6位)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm leading-none">
                    我已阅读并同意
                    <Link href="#" className="text-[#9b8cc6] hover:underline ml-1">
                      用户协议
                    </Link>
                    和
                    <Link href="#" className="text-[#9b8cc6] hover:underline ml-1">
                      隐私政策
                    </Link>
                  </label>
                </div>

                {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">{error}</div>}

                <Button type="submit" className="w-full bg-[#9b8cc6] hover:bg-[#8a7ab5]" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      注册中...
                    </>
                  ) : (
                    "注册"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
