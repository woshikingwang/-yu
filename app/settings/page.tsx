"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Settings,
  User,
  Shield,
  Bell,
  MessageSquare,
  Lock,
  FileText,
  Trash2,
  Info,
  Home,
  ShoppingBag,
  HelpCircle,
  ChevronRight
} from "lucide-react"

export default function SettingsPage() {
  // 状态管理
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sound: true,
    vibration: false,
  })
  
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    locationSharing: false,
    dataCollection: true,
  })
  
  const [accountSecurity, setAccountSecurity] = useState({
    twoFactorAuth: false,
    loginHistory: true,
    sessionManagement: true,
  })
  
  // 切换通知设置
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }
  
  // 切换隐私设置
  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }
  
  // 切换安全设置
  const toggleSecurity = (key: keyof typeof accountSecurity) => {
    setAccountSecurity(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-700">
            <Link href="/personal-center">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-gray-800">设置</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 p-4 md:p-6">
        <Tabs defaultValue="account" className="w-full space-y-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="account">账号设置</TabsTrigger>
            <TabsTrigger value="notification">通知设置</TabsTrigger>
            <TabsTrigger value="privacy">隐私设置</TabsTrigger>
          </TabsList>

          {/* 账号设置 */}
          <TabsContent value="account" className="space-y-4">
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/images/user-avatar.png" />
                    <AvatarFallback className="bg-blue-400 text-white text-2xl">U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-medium text-gray-700">用户名</Label>
                      <Input id="username" value="用户" className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">电子邮箱</Label>
                      <Input id="email" type="email" value="user@example.com" className="w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">安全设置</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Lock className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-800">修改密码</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">修改</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Shield className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-gray-800">两步验证</span>
                    </div>
                    <Switch
                      checked={accountSecurity.twoFactorAuth}
                      onCheckedChange={() => toggleSecurity('twoFactorAuth')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-800">登录历史</span>
                    </div>
                    <Switch
                      checked={accountSecurity.loginHistory}
                      onCheckedChange={() => toggleSecurity('loginHistory')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">账号操作</h3>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5 mr-3" />
                  注销账号
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 通知设置 */}
          <TabsContent value="notification" className="space-y-4">
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">通知方式</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Bell className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-800">推送通知</span>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={() => toggleNotification('push')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-800">邮件通知</span>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={() => toggleNotification('email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-amber-100 p-2">
                        <Bell className="h-5 w-5 text-amber-600" />
                      </div>
                      <span className="text-gray-800">声音提醒</span>
                    </div>
                    <Switch
                      checked={notifications.sound}
                      onCheckedChange={() => toggleNotification('sound')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-red-100 p-2">
                        <Bell className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="text-gray-800">震动提醒</span>
                    </div>
                    <Switch
                      checked={notifications.vibration}
                      onCheckedChange={() => toggleNotification('vibration')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">通知类型</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-100 p-2">
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-gray-800">漂流瓶回复</span>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-pink-100 p-2">
                        <MessageSquare className="h-5 w-5 text-pink-600" />
                      </div>
                      <span className="text-gray-800">树洞消息</span>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-800">咨询回复</span>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-800">订单更新</span>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-amber-100 p-2">
                        <MessageSquare className="h-5 w-5 text-amber-600" />
                      </div>
                      <span className="text-gray-800">活动通知</span>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 隐私设置 */}
          <TabsContent value="privacy" className="space-y-4">
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">基本隐私</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-800">个人资料可见</span>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={() => togglePrivacy('profileVisible')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <Info className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-800">位置共享</span>
                    </div>
                    <Switch
                      checked={privacy.locationSharing}
                      onCheckedChange={() => togglePrivacy('locationSharing')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Shield className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-gray-800">数据收集</span>
                    </div>
                    <Switch
                      checked={privacy.dataCollection}
                      onCheckedChange={() => togglePrivacy('dataCollection')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">数据管理</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-between">
                    导出我的数据
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    清除缓存数据
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    删除浏览记录
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">关于我们</h3>
                <div className="space-y-3">
                  <Link href="/about" className="block p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">关于心愈</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                  
                  <Link href="/privacy-policy" className="block p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">隐私政策</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                  
                  <Link href="/terms-of-service" className="block p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">服务条款</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                  
                  <Link href="/help" className="block p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">帮助中心</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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