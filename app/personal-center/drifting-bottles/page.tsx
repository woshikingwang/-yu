"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Heart, MessageSquare, Trash2, Eye, Search, Calendar } from "lucide-react"

// Mock data for user's drifting bottles
const mockMyBottles = [
  {
    id: "1",
    title: "关于最近的压力",
    content:
      "最近工作压力很大，感觉有点喘不过气来，每天都觉得很疲惫，晚上也睡不好。希望有人能给我一些建议，或者只是听我说说。",
    date: "2025-06-05",
    time: "10:30",
    responses: 5,
    likes: 12,
    views: 48,
    theme: "困惑",
    mood: "焦虑",
    status: "已发布",
    tags: ["工作压力", "失眠", "求助"],
  },
  {
    id: "2",
    title: "失眠的夜晚",
    content: "又是一个失眠的夜晚，思绪万千，不知道该怎么办。看着窗外的月亮，感觉特别孤独...",
    date: "2025-06-03",
    time: "02:15",
    responses: 8,
    likes: 15,
    views: 67,
    theme: "心情",
    mood: "孤独",
    status: "已发布",
    tags: ["失眠", "孤独", "夜晚"],
  },
  {
    id: "3",
    title: "今天很开心",
    content: "今天发生了很多好事，想和大家分享一下我的快乐！",
    date: "2025-06-01",
    time: "18:45",
    responses: 15,
    likes: 28,
    views: 96,
    theme: "分享",
    mood: "开心",
    status: "已发布",
    tags: ["开心", "分享", "生活"],
  },
]

const mockReceivedBottles = [
  {
    id: "4",
    title: "需要一些鼓励",
    content: "最近感觉很迷茫，不知道未来的方向在哪里...",
    author: "匿名用户",
    date: "2025-06-06",
    time: "14:20",
    theme: "困惑",
    mood: "迷茫",
    isReplied: true,
    myReply: "加油！每个人都会有迷茫的时候，慢慢来，你一定可以找到方向的。",
    tags: ["迷茫", "未来", "鼓励"],
  },
  {
    id: "5",
    title: "分享一个好消息",
    content: "我通过了面试！太激动了！",
    author: "小确幸",
    date: "2025-06-04",
    time: "16:30",
    theme: "分享",
    mood: "激动",
    isReplied: true,
    myReply: "恭喜你！真为你开心！",
    tags: ["好消息", "面试", "工作"],
  },
  {
    id: "6",
    title: "感到很焦虑",
    content: "考试快到了，复习的内容太多了，感觉压力好大...",
    author: "匿名用户",
    date: "2025-06-02",
    time: "20:15",
    theme: "心情",
    mood: "焦虑",
    isReplied: false,
    tags: ["考试", "焦虑", "压力"],
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
  迷茫: "bg-purple-50 text-purple-700",
  激动: "bg-pink-50 text-pink-700",
}

export default function MyDriftingBottlesPage() {
  const [activeTab, setActiveTab] = useState("published")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPublished = mockMyBottles.filter(
    (bottle) =>
      bottle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bottle.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredReceived = mockReceivedBottles.filter(
    (bottle) =>
      bottle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bottle.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between max-w-5xl">
          <Button variant="ghost" size="icon" asChild className="text-blue-600 hover:text-blue-700">
            <Link href="/personal-center">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-blue-600">我的漂流瓶</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto flex-1 space-y-4 p-4 md:p-6 max-w-5xl">
        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">已发布</p>
                  <p className="text-2xl font-bold text-blue-600">{mockMyBottles.length}</p>
                </div>
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">收到回复</p>
                  <p className="text-2xl font-bold text-green-600">
                    {mockMyBottles.reduce((sum, bottle) => sum + bottle.responses, 0)}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">获得点赞</p>
                  <p className="text-2xl font-bold text-pink-600">
                    {mockMyBottles.reduce((sum, bottle) => sum + bottle.likes, 0)}
                  </p>
                </div>
                <Heart className="h-8 w-8 text-pink-600 fill-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="搜索漂流瓶内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 border-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border-0 shadow-sm">
            <TabsTrigger value="published" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              我发布的 ({mockMyBottles.length})
            </TabsTrigger>
            <TabsTrigger
              value="received"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
            >
              我收到的 ({mockReceivedBottles.length})
            </TabsTrigger>
          </TabsList>

          {/* Published Bottles */}
          <TabsContent value="published" className="mt-4">
            <div className="space-y-4">
              {filteredPublished.map((bottle) => (
                <Card key={bottle.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-base text-gray-800 mb-2">{bottle.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {bottle.date} {bottle.time}
                          </span>
                          <Badge className={`${themeColors[bottle.theme]} border ml-2`}>{bottle.theme}</Badge>
                          <Badge className={`${moodColors[bottle.mood]} border-0`}>{bottle.mood}</Badge>
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-50 text-green-600 border-green-200">{bottle.status}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{bottle.content}</p>

                    <div className="flex flex-wrap gap-1">
                      {bottle.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-200 text-gray-600">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {bottle.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {bottle.responses}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {bottle.views}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Link href={`/drifting-bottle/${bottle.id}`}>查看详情</Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Received Bottles */}
          <TabsContent value="received" className="mt-4">
            <div className="space-y-4">
              {filteredReceived.map((bottle) => (
                <Card key={bottle.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-base text-gray-800 mb-2">{bottle.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{bottle.author}</span>
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          <span>
                            {bottle.date} {bottle.time}
                          </span>
                          <Badge className={`${themeColors[bottle.theme]} border ml-2`}>{bottle.theme}</Badge>
                          <Badge className={`${moodColors[bottle.mood]} border-0`}>{bottle.mood}</Badge>
                        </CardDescription>
                      </div>
                      {bottle.isReplied ? (
                        <Badge className="bg-green-50 text-green-600 border-green-200">已回复</Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-600 border-amber-200">待回复</Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{bottle.content}</p>

                    {bottle.isReplied && bottle.myReply && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-600 font-medium mb-1">我的回复：</p>
                        <p className="text-sm text-gray-700">{bottle.myReply}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {bottle.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-200 text-gray-600">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="text-xs text-gray-500">来自漂流瓶</div>
                      <div className="flex gap-2">
                        {!bottle.isReplied && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            回复
                          </Button>
                        )}
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Link href={`/drifting-bottle/${bottle.id}`}>查看详情</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
