"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Home,
  MessageSquare,
  User,
  ShoppingBag,
  Star,
  ShoppingCart,
  Plus,
  Minus,
  Play,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

// 添加分类颜色映射
const categoryColors = {
  心理书籍: "bg-teal-100 text-teal-600 border-teal-200",
  冥想音频: "bg-green-100 text-green-600 border-green-200",
  心理课程: "bg-yellow-100 text-yellow-600 border-yellow-200",
  心灵礼品: "bg-pink-100 text-pink-600 border-pink-200",
}

// Mock data for demonstration with enhanced product images
const mockProductDetail = {
  id: "p3",
  name: "情绪管理与压力缓解课程",
  category: "心理课程",
  price: 199.0,
  originalPrice: 299.0,
  images: [
    {
      src: "/images/product-course-emotion.png",
      alt: "情绪管理课程封面",
      caption: "专业情绪管理课程",
    },
    {
      src: "/images/bottle-stress.png",
      alt: "压力管理场景",
      caption: "学习如何应对工作压力",
    },
    {
      src: "/images/bottle-anxiety.png",
      alt: "焦虑管理场景",
      caption: "掌握焦虑缓解技巧",
    },
    {
      src: "/images/mood-calm.png",
      alt: "冥想练习",
      caption: "通过冥想获得内心平静",
    },
  ],
  detailImages: [
    {
      src: "/images/product-course-detail1.png",
      alt: "课程大纲",
      caption: "系统化的课程内容设计",
    },
    {
      src: "/images/product-course-detail2.png",
      alt: "教学方法",
      caption: "互动式教学方法",
    },
  ],
  rating: 4.7,
  totalReviews: 234,
  sales: 867,
  tags: ["专业", "实用", "情绪管理"],
  description: `
本课程由资深心理咨询师精心设计，帮助您掌握情绪管理的核心技巧，有效缓解日常生活和工作中的压力。
通过科学的理论讲解和实用的练习方法，您将学会：
• 识别和理解自己的情绪模式
• 掌握有效的压力缓解技巧
• 建立健康的情绪管理习惯
• 提升心理韧性和抗压能力

适合人群：职场人士、学生、家长以及任何希望改善情绪管理能力的人群。
  `,
  courseInfo: {
    instructor: {
      name: "李心理咨询师",
      avatar: "/images/counselor-li.png",
      title: "国家二级心理咨询师",
      experience: "10年心理咨询经验",
    },
    duration: "8小时",
    lessons: 12,
    syllabus: [
      "第1章：情绪的基本认知（2节课）",
      "第2章：压力源识别与分析（2节课）",
      "第3章：放松技巧训练（2节课）",
      "第4章：认知重构方法（2节课）",
      "第5章：情绪调节实践（2节课）",
      "第6章：长期维护与提升（2节课）",
    ],
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Mock preview audio
  },
  reviews: [
    {
      id: "r1",
      user: "学员小王",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2025-06-01",
      content: "非常实用的课程，老师讲解得很清楚，已经开始运用到日常生活中了。",
    },
    {
      id: "r2",
      user: "职场新人",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2025-05-28",
      content: "对我的工作压力管理很有帮助，推荐给同事们。",
    },
  ],
}

// 添加图片占位符
const placeholderImages = [
  "/images/product-course-emotion.png",
  "/images/bottle-stress.png",
  "/images/bottle-anxiety.png",
  "/images/mood-calm.png",
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  // In a real app, you'd fetch product data based on params.id
  const product = mockProductDetail // Using mock data for now

  if (!product) {
    return <div className="flex min-h-screen items-center justify-center">商品未找到。</div>
  }

  const addToCart = () => {
    alert(`已添加 ${quantity} 件商品到购物车`)
  }

  const buyNow = () => {
    alert(`立即购买 ${quantity} 件商品`)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-teal-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-teal-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild className="text-teal-600 hover:text-teal-700">
            <Link href="/mall">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-lg font-bold text-teal-700">商品详情</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-teal-600 hover:text-teal-700">
              <Heart className="h-5 w-5" />
              <span className="sr-only">收藏</span>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-teal-600 hover:text-teal-700 relative">
              <Link href="#shopping-cart">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-yellow-400 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
                <span className="sr-only">购物车</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 space-y-6 p-4 md:p-6">
        {/* Product Images and Basic Info */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            {/* Main Image with Navigation */}
            <div className="relative h-80 overflow-hidden rounded-lg bg-white md:h-96">
              <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
                <DialogTrigger asChild>
                  <img
                    src={product.images[selectedImage].src || "/placeholder.svg"}
                    alt={product.images[selectedImage].alt || product.name}
                    className="h-full w-full cursor-pointer object-contain p-4"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                  <div className="relative">
                    <img
                      src={product.images[selectedImage].src || "/placeholder.svg"}
                      alt={product.images[selectedImage].alt || product.name}
                      className="h-auto w-full rounded-lg object-contain"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60"
                      onClick={() => setShowLightbox(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {product.images[selectedImage].caption && (
                      <div className="absolute bottom-0 w-full bg-black/60 p-3 text-center text-white">
                        {product.images[selectedImage].caption}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 text-teal-700 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 text-teal-700 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt || `${product.name} ${index + 1}`}
                  className={`h-16 w-16 cursor-pointer rounded-md object-cover transition-all ${
                    selectedImage === index ? "ring-2 ring-teal-500" : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Badge className={`${categoryColors[product.category]} border mb-2`}>{product.category}</Badge>
              <h1 className="text-2xl font-bold text-teal-700">{product.name}</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-teal-300 text-teal-600">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-teal-700">{product.rating}</span>
                <span className="text-teal-500">({product.totalReviews}条评价)</span>
              </div>
              <span className="text-teal-500">销量{product.sales}</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-teal-700">¥{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-teal-400 line-through">¥{product.originalPrice}</span>
              )}
              {product.originalPrice > product.price && (
                <Badge className="bg-red-100 text-red-600 border-red-200">
                  省¥{(product.originalPrice - product.price).toFixed(0)}
                </Badge>
              )}
            </div>

            {/* Course-specific Information */}
            {product.category === "心理课程" && product.courseInfo && (
              <Card className="border-teal-200 bg-white/80">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-teal-700">课程信息</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-teal-200">
                      <AvatarImage src={product.courseInfo.instructor.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        {product.courseInfo.instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-teal-700">{product.courseInfo.instructor.name}</p>
                      <p className="text-sm text-teal-600">{product.courseInfo.instructor.title}</p>
                      <p className="text-sm text-teal-500">{product.courseInfo.instructor.experience}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-teal-600">课程时长：</span>
                      <span className="font-medium text-teal-700">{product.courseInfo.duration}</span>
                    </div>
                    <div>
                      <span className="text-teal-600">课时数量：</span>
                      <span className="font-medium text-teal-700">{product.courseInfo.lessons}节</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-teal-300 text-teal-600 hover:bg-teal-50 bg-transparent"
                    >
                      <Play className="mr-1 h-3 w-3" />
                      试听课程
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quantity and Purchase */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-teal-600">数量：</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-teal-300 bg-transparent"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="min-w-[2rem] text-center text-teal-700">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-teal-300 bg-transparent"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-teal-300 text-teal-600 hover:bg-teal-50 bg-transparent"
                  onClick={addToCart}
                >
                  加入购物车
                </Button>
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={buyNow}>
                  立即购买
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 border border-teal-200">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-700"
            >
              商品详情
            </TabsTrigger>
            {product.category === "心理课程" && (
              <TabsTrigger
                value="syllabus"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
              >
                课程大纲
              </TabsTrigger>
            )}
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700"
            >
              用户评价
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6">
            <Card className="border-teal-200 bg-white/80">
              <CardContent className="p-6">
                <div className="prose prose-teal max-w-none">
                  <div className="whitespace-pre-line text-teal-700 leading-relaxed">{product.description}</div>
                </div>

                {/* Detail Images */}
                {product.detailImages && product.detailImages.length > 0 && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-lg font-medium text-teal-700">详细介绍</h3>
                    <div className="space-y-6">
                      {product.detailImages.map((image, index) => (
                        <div key={index} className="space-y-2">
                          <img
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt || `详情图 ${index + 1}`}
                            className="w-full rounded-lg"
                          />
                          {image.caption && <p className="text-center text-sm text-teal-500">{image.caption}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {product.category === "心理课程" && (
            <TabsContent value="syllabus" className="space-y-4">
              <Card className="border-teal-200 bg-white/80">
                <CardHeader>
                  <CardTitle className="text-teal-700">课程大纲</CardTitle>
                  <CardDescription className="text-teal-500">
                    共{product.courseInfo?.lessons}节课，总时长{product.courseInfo?.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.courseInfo?.syllabus.map((chapter, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-teal-200 p-3 hover:bg-teal-50 transition-colors"
                    >
                      <span className="text-teal-700">{chapter}</span>
                      <Button size="sm" variant="ghost" className="text-teal-600 hover:bg-teal-100">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="reviews" className="space-y-4">
            <Card className="border-teal-200 bg-white/80">
              <CardHeader>
                <CardTitle className="text-teal-700">用户评价 ({product.totalReviews})</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-teal-700">{product.rating}</span>
                  </div>
                  <Progress value={product.rating * 20} className="flex-1 bg-teal-100" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-teal-200 pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 border border-teal-200">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-teal-100 text-teal-700">{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-teal-700">{review.user}</span>
                          <span className="text-sm text-teal-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-teal-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-teal-600">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="sticky bottom-0 z-40 w-full border-t border-teal-200 bg-white/90 backdrop-blur-sm p-4 shadow-lg">
        <nav className="container mx-auto flex justify-around">
          <Link href="/" className="flex flex-col items-center text-teal-400 hover:text-teal-600 transition-colors">
            <Home className="h-6 w-6" />
            <span className="text-xs">首页</span>
          </Link>
          <Link href="/mall" className="flex flex-col items-center text-teal-700">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs">商城</span>
          </Link>
          <Link
            href="/message-center"
            className="flex flex-col items-center text-teal-400 hover:text-teal-600 transition-colors"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs">消息中心</span>
          </Link>
          <Link
            href="/personal-center"
            className="flex flex-col items-center text-teal-400 hover:text-teal-600 transition-colors"
          >
            <User className="h-6 w-6" />
            <span className="text-xs">个人中心</span>
          </Link>
        </nav>
      </footer>
    </div>
  )
}
