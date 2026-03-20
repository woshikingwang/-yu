import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, Award, Calendar, Clock, Video, Phone, MessageSquare, Users, CheckCircle } from "lucide-react"

interface CounselorData {
  id: string
  name: string
  avatar: string
  title: string
  qualifications: string
  specialties: string[]
  experience: string
  rating: number
  reviewCount: number
  offlinePrice: number
  bio: string
  education: string[]
  certifications: string[]
  approach: string
  consultationTypes: string[]
  schedule: string[]
  reviews: Array<{
    user: string
    rating: number
    date: string
    comment: string
  }>
}

const getCounselorData = (id: string): CounselorData | undefined => {
  const counselorData: Record<string, CounselorData> = {
    c1: {
      id: "c1",
      name: "张心理咨询师",
      avatar: "/images/counselor-zhang.png",
      title: "国家二级心理咨询师",
      qualifications: "国家二级心理咨询师，中科院心理所研究生",
      specialties: ["焦虑症", "抑郁症", "情感问题", "职场压力"],
      experience: "15年",
      rating: 4.9,
      reviewCount: 328,
      offlinePrice: 300,
      bio: "从事心理咨询工作15年，累计咨询时长超过10000小时。擅长认知行为疗法（CBT）和正念疗法，帮助来访者识别和改变负面思维模式，建立积极的生活态度。",
      education: ["北京大学心理学学士", "中科院心理所临床心理学硕士"],
      certifications: ["国家二级心理咨询师", "认知行为治疗师认证", "正念减压疗法认证"],
      approach:
        "我的咨询方法以认知行为疗法为基础，结合正念技术，帮助来访者理解情绪产生的原因，学习有效的应对策略。我相信每个人都有自我疗愈的能力，我的角色是陪伴和引导。",
      consultationTypes: ["视频咨询", "语音咨询", "文字咨询", "面对面咨询"],
      schedule: ["周一至周五 9:00-21:00", "周六周日 10:00-18:00"],
      reviews: [
        {
          user: "小李",
          rating: 5,
          date: "2024-01-15",
          comment: "张老师非常专业，帮助我走出了焦虑的困境。",
        },
        {
          user: "小王",
          rating: 5,
          date: "2024-01-10",
          comment: "咨询效果很好，感觉心情轻松了很多。",
        },
      ],
    },
    c2: {
      id: "c2",
      name: "李心理咨询师",
      avatar: "/images/counselor-li.png",
      title: "临床心理学博士",
      qualifications: "注册心理师，精神科主治医师，北大医学博士",
      specialties: ["职场压力", "人际关系", "自我成长", "婚姻家庭"],
      experience: "12年",
      rating: 4.8,
      reviewCount: 256,
      offlinePrice: 350,
      bio: "临床心理学博士，专注于成人心理健康领域。擅长处理职场压力、人际关系困扰以及自我成长议题。",
      education: ["清华大学心理学学士", "北京大学临床心理学博士"],
      certifications: ["注册心理师", "精神科主治医师", "家庭治疗师认证"],
      approach: "采用整合式心理治疗方法，根据来访者的具体情况灵活运用不同的治疗技术。",
      consultationTypes: ["视频咨询", "语音咨询", "面对面咨询"],
      schedule: ["周一至周五 14:00-21:00", "周六 10:00-18:00"],
      reviews: [
        {
          user: "张女士",
          rating: 5,
          date: "2024-01-12",
          comment: "李老师很专业，给了我很多实用的建议。",
        },
      ],
    },
    c3: {
      id: "c3",
      name: "王心理咨询师",
      avatar: "/images/counselor-wang.png",
      title: "婚姻家庭治疗师",
      qualifications: "心理学硕士，家庭治疗师，沙盘游戏治疗师",
      specialties: ["婚姻问题", "家庭关系", "亲子教育", "儿童心理"],
      experience: "10年",
      rating: 4.7,
      reviewCount: 189,
      offlinePrice: 280,
      bio: "专注于婚姻家庭治疗和儿童青少年心理咨询，擅长使用沙盘游戏治疗等创造性方法。",
      education: ["华东师范大学心理学硕士", "家庭治疗师培训"],
      certifications: ["国家二级心理咨询师", "家庭治疗师认证", "沙盘游戏治疗师认证"],
      approach: "以系统观看待问题，注重家庭成员之间的互动模式，帮助家庭建立健康的沟通方式。",
      consultationTypes: ["视频咨询", "语音咨询"],
      schedule: ["周二至周六 9:00-18:00"],
      reviews: [
        {
          user: "陈先生",
          rating: 5,
          date: "2024-01-08",
          comment: "王老师帮助我们改善了夫妻关系，非常感谢！",
        },
      ],
    },
  }

  return counselorData[id]
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function CounselorDetailPage({ params }: Props) {
  const { id } = await params
  const counselor = getCounselorData(id)

  if (!counselor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa]">
        <Card className="bg-white border-0 shadow-sm p-6">
          <p className="text-gray-600">咨询师信息未找到</p>
          <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
            <Link href="/psychological-consultation">返回列表</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const onlineTypes = counselor.consultationTypes.filter((type) => type !== "面对面咨询")
  const hasOfflineConsultation = counselor.consultationTypes.includes("面对面咨询")

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild className="text-blue-600 hover:text-blue-700">
            <Link href="/psychological-consultation">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-blue-600">咨询师详情</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 space-y-6 p-4 md:p-6">
        {/* Counselor Profile */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32 border-4 border-blue-100">
                <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                <AvatarFallback className="bg-blue-50 text-blue-600 text-3xl">
                  {counselor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">{counselor.name}</h2>
                    <Badge className="bg-green-50 text-green-600 border-green-200">在线</Badge>
                  </div>
                  <p className="text-gray-600 mb-2">{counselor.title}</p>
                  <p className="text-sm text-gray-500">{counselor.qualifications}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span>从业 {counselor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{counselor.rating}</span>
                    <span className="text-gray-500">({counselor.reviewCount} 评价)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>已服务 {counselor.reviewCount * 3}+ 人</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {counselor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultation Types and Pricing */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">咨询方式与费用</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Online Consultations - Free First Session */}
            {onlineTypes.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium text-gray-800">线上咨询（首次免费）</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {onlineTypes.map((type, index) => {
                    let icon
                    if (type === "视频咨询") icon = <Video className="h-5 w-5" />
                    else if (type === "语音咨询") icon = <Phone className="h-5 w-5" />
                    else icon = <MessageSquare className="h-5 w-5" />

                    return (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border border-green-100 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 bg-green-500 text-white text-xs font-bold px-8 py-1 transform rotate-45">
                          首次免费
                        </div>
                        <div className="text-green-600">{icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{type}</p>
                          <p className="text-xs text-green-600 font-medium">首次免费</p>
                          <p className="text-xs text-gray-500">后续: ¥{Math.round(counselor.offlinePrice / 3)}/次</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Offline Consultation - Paid */}
            {hasOfflineConsultation && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-gray-800">线下咨询（按时收费）</h3>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border border-blue-100">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">面对面咨询</p>
                      <p className="text-xs text-gray-500">深度交流，更好的咨询效果</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">¥{counselor.offlinePrice}</p>
                    <p className="text-xs text-gray-500">每小时</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="about" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
            <TabsTrigger value="about" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              关于我
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              资质
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              时间
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              评价
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">个人简介</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{counselor.bio}</p>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">咨询方法</h4>
                  <p className="text-gray-600 leading-relaxed">{counselor.approach}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">教育背景与资质认证</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">教育背景</h4>
                  <div className="space-y-2">
                    {counselor.education.map((edu, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span>{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">专业认证</h4>
                  <div className="space-y-2">
                    {counselor.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">可预约时间</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {counselor.schedule.map((time, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">{time}</span>
                  </div>
                ))}
                <p className="text-sm text-gray-500 mt-4">* 具体时间可在预约时协商调整</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">来访者评价</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {counselor.reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{review.user}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Booking Button */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">预约咨询，开始您的心理健康之旅</p>
                <p className="text-sm text-green-600 font-medium">线上咨询完全免费</p>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                <Calendar className="h-5 w-5 mr-2" />
                立即预约
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
