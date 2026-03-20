"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Briefcase,
  Heart,
  Edit2,
  Home,
  MessageSquare,
  ShoppingBag,
} from "lucide-react"

export default function ProfileEditPage() {
  // 用户信息状态
  const [userInfo, setUserInfo] = useState({
    name: "用户",
    nickname: "心灵旅行者",
    email: "user@example.com",
    phone: "138****1234",
    gender: "女",
    birthday: "1995-01-15",
    location: "北京",
    occupation: "学生",
    bio: "热爱心理学，希望通过心愈平台认识更多志同道合的朋友。",
    interests: ["心理学", "冥想", "旅行"],
  })
  
  // 处理输入变化
  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  // 保存用户信息
  const handleSave = () => {
    // 这里应该调用API保存用户信息
    alert("个人资料已更新！")
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
          <h1 className="text-xl font-bold text-gray-800">编辑个人资料</h1>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            保存
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 p-4 md:p-6">
        <Card className="border-0 bg-white shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-28 w-28 border-4 border-white shadow-md">
                  <AvatarImage src="/images/logo.png" />
                  <AvatarFallback className="bg-blue-400 text-white text-3xl">U</AvatarFallback>
                </Avatar>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white border-2 border-white shadow-md"
                >
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">更换头像</span>
                </Button>
              </div>
              <p className="text-sm text-gray-500">点击头像可更换照片</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-sm mb-6">
          <CardContent className="p-6 space-y-6">
            <h3 className="font-semibold text-gray-800 text-lg">基本信息</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">用户名</Label>
                <Input 
                  id="name" 
                  value={userInfo.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-sm font-medium text-gray-700">昵称</Label>
                <Input 
                  id="nickname" 
                  value={userInfo.nickname} 
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium text-gray-700">性别</Label>
                <Select 
                  value={userInfo.gender} 
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="选择性别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="男">男</SelectItem>
                    <SelectItem value="女">女</SelectItem>
                    <SelectItem value="保密">保密</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-sm font-medium text-gray-700">生日</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input 
                    id="birthday" 
                    type="date" 
                    value={userInfo.birthday} 
                    onChange={(e) => handleInputChange('birthday', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">所在地</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input 
                    id="location" 
                    value={userInfo.location} 
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">职业</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input 
                    id="occupation" 
                    value={userInfo.occupation} 
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-sm mb-6">
          <CardContent className="p-6 space-y-6">
            <h3 className="font-semibold text-gray-800 text-lg">个人介绍</h3>
            
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium text-gray-700">简介</Label>
              <Textarea 
                id="bio" 
                value={userInfo.bio} 
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="介绍一下自己吧..."
                className="min-h-[120px]"
              />
              <p className="text-xs text-gray-500">最多200字</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">兴趣爱好</Label>
              <div className="flex flex-wrap gap-2">
                {userInfo.interests.map((interest, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    <Heart className="h-3 w-3" />
                    <span>{interest}</span>
                    <button className="text-blue-700 hover:text-blue-900">×</button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="border-dashed">
                  添加兴趣
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-6 space-y-6">
            <h3 className="font-semibold text-gray-800 text-lg">联系方式</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">电子邮箱</Label>
                <div className="flex gap-2">
                  <Input 
                    id="email" 
                    type="email" 
                    value={userInfo.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1"
                    disabled
                  />
                  <Button variant="ghost" size="sm" className="text-blue-600">修改</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">手机号码</Label>
                <div className="flex gap-2">
                  <Input 
                    id="phone" 
                    value={userInfo.phone} 
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1"
                    disabled
                  />
                  <Button variant="ghost" size="sm" className="text-blue-600">修改</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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