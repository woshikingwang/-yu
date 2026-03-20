"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, Home, Heart, MessageSquare, User, Eye, Clock, Share2, Bookmark, ThumbsUp } from "lucide-react"

// Enhanced mock data
const mockBottleDetail = {
  id: "1",
  title: "关于最近的压力",
  content:
    "最近工作压力很大，感觉有点喘不过气来，每天都觉得很疲惫，晚上也睡不好。希望有人能给我一些建议，或者只是听我说说。\n\n我尝试了很多方法来缓解压力，比如运动、冥想，但效果不是很明显。不知道大家有没有什么好的建议？\n\n有时候真的觉得自己快要被这些负面情绪压垮了，但是又不知道该怎么办。感谢大家的倾听和帮助。",
  author: "匿名用户",
  date: "2025-06-05 10:30",
  theme: "困惑",
  mood: "焦虑",
  likes: 12,
  views: 48,
  bookmarks: 3,
  tags: ["工作压力", "失眠", "求助"],
  coverImage: "/images/bottle-anxiety-art.jpeg",
  images: [
    {
      src: "/images/bottle-anxiety-art.jpeg",
      alt: "焦虑情绪表达",
      caption: "这就是我现在的心情，被各种思绪包围，感觉很混乱",
    },
    {
      src: "/images/bottle-nature-healing.jpeg",
      alt: "治愈的自然风景",
      caption: "希望有一天能像这样平静，找到内心的宁静",
    },
    {
      src: "/images/bottle-doraemon-1.jpeg",
      alt: "哆啦A梦安慰",
      caption: "朋友发给我的，说不要一遍遍地焦虑",
    },
    {
      src: "/images/bottle-doraemon-2.jpeg",
      alt: "哆啦A梦提醒",
      caption: "确实，这样下去会把自己搞生病的",
    },
  ],
  audio: [
    { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", label: "我的心声 (1)" },
    { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", label: "我的心声 (2)" },
  ],
  responses: [
    {
      id: "r1",
      author: "热心网友A",
      date: "2025-06-05 11:00",
      content:
        "抱抱你，压力大的时候确实很难受。可以尝试做一些放松的活动，比如听音乐、散步，或者找朋友聊聊。记住，你并不孤单。",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 5,
      isLiked: false,
    },
    {
      id: "r2",
      author: "小太阳",
      date: "2025-06-05 11:15",
      content:
        "工作再忙也要注意身体哦！可以试试冥想，对缓解焦虑很有帮助。哆啦A梦说得对，不要让自己陷入恶性循环。我之前也有过类似的经历，慢慢会好起来的。",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 8,
      isLiked: true,
    },
    {
      id: "r3",
      author: "心理小助手",
      date: "2025-06-05 12:00",
      content:
        "看到你分享的图片很有感触。建议你可以尝试深呼吸练习，或者写日记来整理思绪。记住，寻求专业帮助也是很好的选择。如果需要，我们这里有专业的心理咨询师可以提供帮助。",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 12,
      isLiked: false,
      isOfficial: true,
    },
  ],
}

const themeColors = {
  困惑: "bg-accent-gold-100 text-accent-gold-700 border-accent-gold-200",
  分享: "bg-accent-mint-100 text-accent-mint-700 border-accent-mint-200",
  心情: "bg-primary-100 text-primary-700 border-primary-200",
  求助: "bg-secondary-200 text-secondary-700 border-secondary-300",
}

const moodColors = {
  焦虑: "bg-orange-100 text-orange-700",
  开心: "bg-green-100 text-green-700",
  孤独: "bg-blue-100 text-blue-700",
}

export default function DriftingBottleDetailPage({ params }: { params: { id: string } }) {
  const bottle = mockBottleDetail
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newResponse, setNewResponse] = useState("")

  if (!bottle) {
    return <div className="flex min-h-screen items-center justify-center">漂流瓶未找到。</div>
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="hover:bg-gray-50">
              <Link href="/drifting-bottle">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">漂流瓶详情</h1>
              <p className="text-xs text-gray-500">#{bottle.id}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-gray-50">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`hover:bg-gray-50 ${isBookmarked ? "text-yellow-600" : ""}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 space-y-6 p-4 md:p-6 relative z-10">
        {/* Main Bottle Card */}
        <Card className="overflow-hidden shadow-xl border-gray-200">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <CardTitle className="text-2xl font-bold text-gray-800 leading-tight">{bottle.title}</CardTitle>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {bottle.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {bottle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {bottle.views} 浏览
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={`${themeColors[bottle.theme]} border shadow-sm`}>{bottle.theme}</Badge>
                <Badge className={`${moodColors[bottle.mood]} border-0 shadow-sm`}>{bottle.mood}</Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Cover Image */}
            {bottle.coverImage && (
              <div className="relative -mx-6 -mt-2 h-64 overflow-hidden">
                <img
                  src={bottle.coverImage || "/placeholder.svg"}
                  alt={bottle.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-primary max-w-none">
              {bottle.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-gray-800 leading-relaxed mb-4 text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {bottle.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-gray-200 text-gray-700 hover:bg-blue-50">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Content Images */}
            {bottle.images && bottle.images.length > 0 && (
              <div className="space-y-4">
                <Separator />
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  分享的图片
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {bottle.images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="h-48 w-full rounded-xl object-cover"
                      />
                      {image.caption && (
                        <div className="absolute bottom-0 w-full bg-black/70 p-4 text-center text-white rounded-b-xl">
                          <p className="font-medium">{image.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audio Files */}
            {bottle.audio && bottle.audio.length > 0 && (
              <div className="space-y-4">
                <Separator />
                <h3 className="text-lg font-semibold text-gray-800">分享的音频</h3>
                <div className="space-y-3 rounded-xl bg-blue-50/50 p-4">
                  {bottle.audio.map((audioItem, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <audio controls src={audioItem.src} className="w-full rounded-lg border border-gray-200" />
                      <span className="text-sm text-gray-700 font-medium whitespace-nowrap">{audioItem.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 ${isLiked ? "text-red-600" : "text-gray-700"} hover:bg-blue-50`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                  <span>{bottle.likes + (isLiked ? 1 : 0)}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-700 hover:bg-blue-50">
                  <MessageSquare className="h-5 w-5" />
                  <span>{bottle.responses.length}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-700 hover:bg-blue-50">
                  <Bookmark className="h-5 w-5" />
                  <span>{bottle.bookmarks}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Responses Section */}
        <Card className="shadow-xl border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              回应 ({bottle.responses.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {bottle.responses.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">暂无回应，快来发表你的看法吧！</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bottle.responses.map((response, index) => (
                  <div key={response.id}>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
                      <Avatar className="h-12 w-12 border-2 border-gray-200">
                        <AvatarImage src={response.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-50 text-gray-800 font-semibold">
                          {response.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">{response.author}</span>
                            {response.isOfficial && (
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">官方</Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{response.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{response.content}</p>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`flex items-center gap-1 text-xs ${response.isLiked ? "text-red-600" : "text-gray-500"} hover:bg-blue-100`}
                          >
                            <ThumbsUp className={`h-3 w-3 ${response.isLiked ? "fill-current" : ""}`} />
                            <span>{response.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:bg-blue-100">
                            回复
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < bottle.responses.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced Response Input */}
            <div className="mt-8 p-4 bg-blue-50/30 rounded-xl">
              <div className="space-y-4">
                <Textarea
                  placeholder="写下你的回应，传递温暖与支持..."
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  className="min-h-[100px] border-gray-200 bg-white/80 focus:border-blue-400 resize-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{newResponse.length}/500 字符</span>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg" disabled={!newResponse.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    发送回应
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Enhanced Bottom Navigation */}
      <footer className="sticky bottom-0 z-40 w-full border-t border-gray-200 bg-white p-4 shadow-sm">
        <nav className="container mx-auto flex justify-around">
          <Link
            href="/"
            className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-50"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">首页</span>
          </Link>
          <Link href="/drifting-bottle" className="flex flex-col items-center text-gray-800 p-2 rounded-lg bg-blue-50">
            <Heart className="h-6 w-6" />
            <span className="text-xs mt-1">漂流瓶</span>
          </Link>
          <Link
            href="/message-center"
            className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-50"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">消息中心</span>
          </Link>
          <Link
            href="/personal-center"
            className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-50"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">个人中心</span>
          </Link>
        </nav>
      </footer>
    </div>
  )
}
