"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Home,
  MessageSquare,
  User,
  ShoppingBag,
  Settings,
  Heart,
  FileText,
  Calendar,
  Award,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  GraduationCap,
  Shield,
  Crown,
} from "lucide-react"

export default function PersonalCenterPage() {
  const { user, logout } = useAuth()
  const [isVerified, setIsVerified] = useState(false)

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-700">
            <Link href="/">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-gray-800">个人中心</h1>
          <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-700">
            <Link href="/settings">
              <Settings className="h-6 w-6" />
              <span className="sr-only">设置</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 space-y-4 p-4 md:p-6">
        {/* User Profile Card */}
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-800">{user?.name || "用户"}</h2>
                  {isVerified && (
                    <Badge className="bg-blue-100 text-blue-800">
                      <Shield className="h-3 w-3 mr-1" />
                      已认证
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{user?.email || "user@example.com"}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white/80 text-gray-700 border-gray-200">
                    <Crown className="h-3 w-3 mr-1" />
                    普通会员
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 text-gray-700 border-gray-200">
                    积分: 128
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-white/80 border-gray-200" asChild>
                <Link href="/personal-center/profile">编辑</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student Verification Card */}
        {!isVerified && (
          <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-100 p-2">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">学生认证</h3>
                  <p className="text-sm text-gray-600">认证后可免费使用学校咨询服务</p>
                </div>
                <Button size="sm" className="bg-green-500 hover:bg-green-600" asChild>
                  <Link href="/personal-center/student-verification">去认证</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
              <div className="text-xs text-gray-600">漂流瓶</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">8</div>
              <div className="text-xs text-gray-600">咨询记录</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">5</div>
              <div className="text-xs text-gray-600">我的订单</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">32</div>
              <div className="text-xs text-gray-600">心情记录</div>
            </CardContent>
          </Card>
        </div>

        {/* My Services */}
        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">我的服务</h3>
            <div className="space-y-2">
              <Link
                href="/personal-center/drifting-bottles"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-800">我的漂流瓶</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/personal-center/consultations"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-purple-100 p-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-gray-800">咨询记录</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/personal-center/orders"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-2">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-800">我的订单</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/personal-center/mood-calendar"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-orange-100 p-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-gray-800">心情日记</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Student Services */}
        {isVerified && (
          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-800 mb-3">学生专属</h3>
              <div className="space-y-2">
                <Link
                  href="/psychological-consultation/school"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-800 font-medium">学校咨询处</div>
                      <div className="text-xs text-gray-500">免费使用本校心理服务</div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Options */}
        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">其他</h3>
            <div className="space-y-2">
              <Link
                href="/personal-center/achievements"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-yellow-100 p-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-gray-800">我的成就</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/personal-center/notifications"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-100 p-2">
                    <Bell className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="text-gray-800">通知设置</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/help"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-gray-100 p-2">
                    <HelpCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-gray-800">帮助中心</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              退出登录
            </Button>
          </CardContent>
        </Card>

        <div className="h-4" />
      </main>

      {/* Bottom Navigation */}
      <footer className="sticky bottom-0 z-40 w-full border-t bg-white p-4 shadow-lg">
        <nav className="container mx-auto flex justify-around">
          <Link href="/" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
            <Home className="h-6 w-6" />
            <span className="text-xs">首页</span>
          </Link>
          <Link href="/mall" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs">商城</span>
          </Link>
          <Link href="/message-center" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs">消息</span>
          </Link>
          <Link href="/personal-center" className="flex flex-col items-center text-blue-600">
            <User className="h-6 w-6" />
            <span className="text-xs">我的</span>
          </Link>
        </nav>
      </footer>
    </div>
  )
}
