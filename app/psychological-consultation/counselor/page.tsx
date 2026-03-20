"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, StarHalf, Calendar, Clock, MapPin, Mail, Phone, Award, BookOpen, HeartHandshake, ArrowLeft, ArrowRight, Share2, MessageCircle, ThumbsUp, ChevronDown, ChevronUp } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// 咨询师信息类型定义
interface Counselor {
  id: string
  name: string
  title: string
  description: string
  avatar: string
  rating: number
  reviewCount: number
  price: number
  education: string[]
  experience: string
  specialties: string[]
  certifications: string[]
  languages: string[]
  availability: string[]
  location: string
  introduction: string
  approach: string
  successRate: string
  treatmentMethods: string[]
}

// 评价类型定义
interface Review {
  id: string
  patientName: string
  rating: number
  date: string
  comment: string
  avatar: string
  anonymized: boolean
}

// 模拟咨询师数据
const mockCounselor: Counselor = {
  id: "zhang-li",
  name: "张莉",
  title: "高级心理咨询师",
  description: "专注于抑郁、焦虑和压力管理领域，拥有10年临床经验",
  avatar: "/images/counselor-zhangli.png",
  rating: 4.9,
  reviewCount: 128,
  price: 500,
  education: [
    "北京大学心理学博士",
    "北京师范大学心理学学士",
    "美国加州大学洛杉矶分校访问学者"
  ],
  experience: "10年临床心理咨询经验，曾在三甲医院心理科工作5年，擅长认知行为疗法、正念疗法和心理动力学治疗。",
  specialties: [
    "抑郁障碍",
    "焦虑障碍",
    "压力管理",
    "人际关系问题",
    "自我成长",
    "职业倦怠"
  ],
  certifications: [
    "国家二级心理咨询师",
    "认知行为疗法（CBT）认证治疗师",
    "正念减压（MBSR）认证导师",
    "创伤聚焦认知行为疗法（TF-CBT）培训证书"
  ],
  languages: ["中文", "英语"],
  availability: ["周一至周五 9:00-18:00", "周六 10:00-15:00"],
  location: "北京市朝阳区建国路88号心理咨询中心",
  introduction: "张莉博士是一位备受尊敬的心理咨询师，专注于帮助来访者应对生活中的各种心理挑战。她温和而专业的咨询风格，让来访者在安全、支持的环境中探索自己的内心世界，找到解决问题的方法。",
  approach: "张博士采用整合性的治疗方法，结合认知行为疗法、正念技术和心理动力学视角，根据每位来访者的独特需求定制个性化的治疗方案。她相信每个人都有自我疗愈的能力，咨询师的角色是引导和支持这一过程。",
  successRate: "92%",
  treatmentMethods: ["认知行为疗法", "正念减压疗法", "心理动力学治疗", "接纳与承诺疗法", "人际关系疗法", "家庭系统治疗"]
}

// 模拟评价数据
const mockReviews: Review[] = [
  {
    id: "1",
    patientName: "匿名用户",
    rating: 5,
    date: "2024-05-15",
    comment: "张医生非常专业，第一次咨询就给了我很多实用的建议。经过三个月的治疗，我的焦虑症状有了明显改善，睡眠质量也提高了。她真的很理解我的感受，让我感到被接纳和支持。",
    avatar: "/images/avatar-anonymous.png",
    anonymized: true
  },
  {
    id: "2",
    patientName: "李**",
    rating: 5,
    date: "2024-04-22",
    comment: "在张医生的帮助下，我走出了长达一年的抑郁状态。她的治疗方法很科学，每次咨询都让我有新的收获。现在我已经能够更好地应对生活中的压力了。",
    avatar: "/images/avatar-female.png",
    anonymized: true
  },
  {
    id: "3",
    patientName: "王**",
    rating: 4.5,
    date: "2024-03-18",
    comment: "张医生经验丰富，对我的问题分析得很透彻。她不仅帮助我解决了当前的情绪问题，还教给我很多自我调节的方法。唯一的小建议是预约有时需要等待较长时间。",
    avatar: "/images/avatar-male.png",
    anonymized: true
  },
  {
    id: "4",
    patientName: "匿名用户",
    rating: 5,
    date: "2024-02-05",
    comment: "非常感谢张医生在我人生最低谷时期的帮助和支持。她的专业知识和同理心让我重新找回了生活的信心。推荐给所有需要心理帮助的朋友！",
    avatar: "/images/avatar-anonymous.png",
    anonymized: true
  }
]

// 可用时间段模拟数据
const availableTimeSlots = [
  { id: "1", date: "2024-06-15", time: "09:00-10:00", available: true },
  { id: "2", date: "2024-06-15", time: "10:30-11:30", available: true },
  { id: "3", date: "2024-06-15", time: "14:00-15:00", available: false },
  { id: "4", date: "2024-06-15", time: "15:30-16:30", available: true },
  { id: "5", date: "2024-06-16", time: "09:00-10:00", available: true },
  { id: "6", date: "2024-06-16", time: "10:30-11:30", available: false },
  { id: "7", date: "2024-06-16", time: "14:00-15:00", available: true },
  { id: "8", date: "2024-06-16", time: "15:30-16:30", available: true }
]

// 渲染星级评分
const renderRating = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
  }
  
  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
  }
  
  const emptyStars = 5 - stars.length
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
  }
  
  return stars
}

export default function CounselorProfilePage() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState("2024-06-15")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [expandedReviews, setExpandedReviews] = useState(false)
  const [showAllSpecialties, setShowAllSpecialties] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  })

  // 筛选选中日期的时间段
  const filteredTimeSlots = availableTimeSlots.filter(slot => slot.date === selectedDate)

  // 处理预约提交
  const handleAppointmentSubmit = () => {
    if (!selectedTimeSlot || !appointmentDetails.name || !appointmentDetails.phone) {
      toast({
        title: "请完善预约信息",
        description: "请选择时间段并填写姓名和电话",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "预约成功！",
      description: "我们已收到您的预约请求，工作人员会尽快与您确认",
    })
    
    // 重置表单
    setAppointmentDetails({
      name: "",
      phone: "",
      email: "",
      message: ""
    })
    setSelectedTimeSlot(null)
  }

  // 计算统计数据
  const fiveStarReviews = mockReviews.filter(review => review.rating === 5).length
  const satisfactionRate = Math.round((fiveStarReviews / mockReviews.length) * 100)

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* 头部导航 */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center">
          <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-700">
            <Link href="/psychological-consultation">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-gray-600 ml-4">心理咨询师详情</h1>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        {/* 咨询师信息卡片 */}
        <Card className="bg-white border-0 shadow-sm mb-8">
          <div className="md:flex">
            {/* 左侧信息 */}
            <div className="md:w-1/3 p-6 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-100">
              <Avatar className="h-32 w-32 mb-4 border-4 border-blue-100">
                <AvatarImage src={mockCounselor.avatar} alt={mockCounselor.name} />
                <AvatarFallback className="text-2xl">{mockCounselor.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{mockCounselor.name}</h2>
              <p className="text-blue-600 font-medium mb-3">{mockCounselor.title}</p>
              <p className="text-gray-600 text-sm mb-4">{mockCounselor.description}</p>
              
              <div className="flex items-center space-x-1 mb-4">
                {renderRating(mockCounselor.rating)}
                <span className="text-gray-700 font-medium ml-1">{mockCounselor.rating}</span>
                <span className="text-gray-500 text-sm">({mockCounselor.reviewCount}条评价)</span>
              </div>
              
              <div className="flex space-x-2 mb-4">
                {mockCounselor.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                    {language}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-2xl font-bold text-blue-600">¥{mockCounselor.price}</div>
                  <p className="text-gray-500 text-sm">线下咨询 (50分钟)</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">首次免费</div>
                  <p className="text-gray-500 text-sm">线上咨询 (电话/视频)</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">¥{Math.round(mockCounselor.price / 3)}</div>
                  <p className="text-gray-500 text-sm">后续线上咨询 (线下价格的1/3)</p>
                </div>
              </div>
              
              <div className="flex gap-3 w-full">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                  立即预约
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* 右侧信息 */}
            <div className="md:w-2/3 p-6">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="mb-6 bg-gray-100">
                  <TabsTrigger value="about" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                    关于咨询师
                  </TabsTrigger>
                  <TabsTrigger value="specialties" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                    专业领域
                  </TabsTrigger>
                  <TabsTrigger value="appointment" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                    预约咨询
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                    患者评价
                  </TabsTrigger>
                </TabsList>
                
                {/* 关于咨询师标签内容 */}
                <TabsContent value="about" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">个人简介</h3>
                    <p className="text-gray-600 leading-relaxed">{mockCounselor.introduction}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">治疗理念</h3>
                    <p className="text-gray-600 leading-relaxed">{mockCounselor.approach}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">教育背景</h3>
                    <ul className="space-y-2">
                      {mockCounselor.education.map((edu, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <BookOpen className="h-5 w-5 text-blue-500 mt-0.5" />
                          <span className="text-gray-600">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">工作经历</h3>
                    <p className="text-gray-600 leading-relaxed">{mockCounselor.experience}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">专业资质</h3>
                    <ul className="space-y-2">
                      {mockCounselor.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <span className="text-gray-600">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                {/* 专业领域标签内容 */}
                <TabsContent value="specialties" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-700">擅长领域</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowAllSpecialties(!showAllSpecialties)}
                        className="text-blue-600 p-0 h-auto"
                      >
                        {showAllSpecialties ? (
                          <span className="flex items-center gap-1">
                            收起 <ChevronUp className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            查看全部 <ChevronDown className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {(showAllSpecialties ? mockCounselor.specialties : mockCounselor.specialties.slice(0, 4)).map((specialty, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm px-3 py-1">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">治疗方法</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mockCounselor.treatmentMethods.map((method, index) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <HeartHandshake className="h-5 w-5 text-purple-500" />
                          <span className="text-gray-700">{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="flex items-center gap-2 text-green-700 font-medium mb-2">
                      <Award className="h-5 w-5" />
                      治疗成效
                    </h3>
                    <p className="text-green-800">
                      根据临床数据统计，{mockCounselor.name}医生的咨询服务帮助{mockCounselor.successRate}的来访者有效改善了症状。
                    </p>
                  </div>
                </TabsContent>
                
                {/* 预约咨询标签内容 */}
                <TabsContent value="appointment" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">咨询方式</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 text-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="text-blue-500 mb-2">
                          <MapPin className="h-8 w-8 mx-auto" />
                        </div>
                        <h4 className="font-medium text-gray-800 mb-1">面对面咨询</h4>
                        <p className="text-gray-600 text-sm">{mockCounselor.location}</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 text-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 bg-green-500 text-white text-xs font-bold px-8 py-1 transform rotate-45">
                          首次免费
                        </div>
                        <div className="text-blue-500 mb-2">
                          <Phone className="h-8 w-8 mx-auto" />
                        </div>
                        <h4 className="font-medium text-gray-800 mb-1">电话咨询</h4>
                        <p className="text-gray-600 text-sm">全国范围内均可预约</p>
                        <p className="text-green-600 text-xs mt-2">后续: ¥{Math.round(mockCounselor.price / 3)}/次</p>
                      </div>
                       
                      <div className="border rounded-lg p-4 text-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 bg-green-500 text-white text-xs font-bold px-8 py-1 transform rotate-45">
                          首次免费
                        </div>
                        <div className="text-blue-500 mb-2">
                          <MessageCircle className="h-8 w-8 mx-auto" />
                        </div>
                        <h4 className="font-medium text-gray-800 mb-1">视频咨询</h4>
                        <p className="text-gray-600 text-sm">安全便捷，保护隐私</p>
                        <p className="text-green-600 text-xs mt-2">后续: ¥{Math.round(mockCounselor.price / 3)}/次</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">工作时间</h3>
                    <ul className="space-y-2">
                      {mockCounselor.availability.map((time, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <span className="text-gray-600">{time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">立即预约</h3>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                          选择咨询时间
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>预约心理咨询</DialogTitle>
                          <DialogDescription>
                            请选择咨询日期和时间，填写个人信息完成预约
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          {/* 选择日期 */}
                          <div className="space-y-2">
                            <Label htmlFor="appointment-date">选择日期</Label>
                            <select 
                              id="appointment-date" 
                              className="w-full p-2 border rounded-md" 
                              value={selectedDate} 
                              onChange={(e) => setSelectedDate(e.target.value)}
                            >
                              <option value="2024-06-15">2024-06-15 (周六)</option>
                              <option value="2024-06-16">2024-06-16 (周日)</option>
                              <option value="2024-06-17">2024-06-17 (周一)</option>
                            </select>
                          </div>
                          
                          {/* 选择时间 */}
                          <div className="space-y-2">
                            <Label>选择时间</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {filteredTimeSlots.map((slot) => (
                                <button
                                  key={slot.id}
                                  className={`p-2 border rounded-md text-center ${selectedTimeSlot === slot.id ? 'border-blue-500 bg-blue-50' : slot.available ? 'border-gray-200 hover:border-blue-300' : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                  onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                                  disabled={!slot.available}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* 个人信息 */}
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="appointment-name">姓名</Label>
                              <Input 
                                id="appointment-name" 
                                placeholder="请输入您的姓名" 
                                value={appointmentDetails.name}
                                onChange={(e) => setAppointmentDetails({...appointmentDetails, name: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="appointment-phone">手机号码</Label>
                              <Input 
                                id="appointment-phone" 
                                placeholder="请输入您的手机号码" 
                                value={appointmentDetails.phone}
                                onChange={(e) => setAppointmentDetails({...appointmentDetails, phone: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="appointment-email">电子邮箱（选填）</Label>
                              <Input 
                                id="appointment-email" 
                                type="email" 
                                placeholder="请输入您的电子邮箱" 
                                value={appointmentDetails.email}
                                onChange={(e) => setAppointmentDetails({...appointmentDetails, email: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="appointment-message">咨询说明（选填）</Label>
                              <Textarea 
                                id="appointment-message" 
                                placeholder="请简要描述您希望咨询的问题" 
                                rows={3} 
                                value={appointmentDetails.message}
                                onChange={(e) => setAppointmentDetails({...appointmentDetails, message: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline">取消</Button>
                          <Button onClick={handleAppointmentSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
                            确认预约
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <p className="text-gray-500 text-sm">
                      预约成功后，我们将通过短信和电话与您确认咨询详情。如需取消或改期，请提前24小时联系我们。
                    </p>
                  </div>
                </TabsContent>
                
                {/* 患者评价标签内容 */}
                <TabsContent value="reviews" className="space-y-6">
                  {/* 评价统计 */}
                  <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800 mb-1">{mockCounselor.rating}</div>
                      <div className="flex items-center justify-center mb-1">
                        {renderRating(mockCounselor.rating)}
                      </div>
                      <div className="text-gray-500 text-sm">平均评分</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{mockCounselor.reviewCount}</div>
                      <div className="text-gray-500 text-sm">评价总数</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">{satisfactionRate}%</div>
                      <div className="text-gray-500 text-sm">满意度</div>
                    </div>
                  </div>
                  
                  {/* 评价列表 */}
                  <div className="space-y-4">
                    {mockReviews.slice(0, expandedReviews ? mockReviews.length : 3).map((review) => (
                      <Card key={review.id} className="border-gray-100">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={review.avatar} alt={review.patientName} />
                                <AvatarFallback>{review.patientName.substring(0, 1)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-800">{review.patientName}</div>
                                <div className="text-gray-500 text-sm">{review.date}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              {renderRating(review.rating)}
                            </div>
                          </div>
                          
                          <p className="text-gray-600">{review.comment}</p>
                          
                          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                            <button className="flex items-center gap-1 hover:text-blue-500">
                              <ThumbsUp className="h-4 w-4" />
                              有用
                            </button>
                            <button className="flex items-center gap-1 hover:text-blue-500">
                              <MessageCircle className="h-4 w-4" />
                              回复
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {mockReviews.length > 3 && (
                      <Button 
                        variant="outline" 
                        onClick={() => setExpandedReviews(!expandedReviews)}
                        className="w-full text-blue-600"
                      >
                        {expandedReviews ? "收起评价" : `查看更多评价 (${mockReviews.length - 3} 条)`}
                      </Button>
                    )}
                  </div>
                  
                  {/* 写评价按钮 */}
                  <Button variant="outline" className="w-full">
                    写评价
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Card>
        
        {/* 相关推荐咨询师 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">相关推荐咨询师</h2>
            <Button variant="ghost" className="text-blue-600">
              查看全部 <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 推荐咨询师1 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="p-4 flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">王</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">王建国</h3>
                  <p className="text-blue-600 text-sm mb-1">资深心理咨询师</p>
                  <div className="flex items-center space-x-1 text-sm mb-1">
                    {renderRating(4.8)}
                    <span className="text-gray-700 ml-1">4.8</span>
                    <span className="text-gray-500">(96条评价)</span>
                  </div>
                  <p className="text-gray-500 text-xs">擅长：婚姻家庭咨询、亲子关系</p>
                </div>
              </div>
              <CardFooter className="border-t px-4 py-3 bg-gray-50">
                <div className="text-blue-600 font-bold">¥450/次</div>
                <Button size="sm" className="ml-auto bg-blue-500 hover:bg-blue-600 text-white">
                  查看详情
                </Button>
              </CardFooter>
            </Card>
            
            {/* 推荐咨询师2 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="p-4 flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">李</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">李明华</h3>
                  <p className="text-blue-600 text-sm mb-1">儿童心理专家</p>
                  <div className="flex items-center space-x-1 text-sm mb-1">
                    {renderRating(4.9)}
                    <span className="text-gray-700 ml-1">4.9</span>
                    <span className="text-gray-500">(112条评价)</span>
                  </div>
                  <p className="text-gray-500 text-xs">擅长：儿童发展、学习障碍、行为问题</p>
                </div>
              </div>
              <CardFooter className="border-t px-4 py-3 bg-gray-50">
                <div className="text-blue-600 font-bold">¥550/次</div>
                <Button size="sm" className="ml-auto bg-blue-500 hover:bg-blue-600 text-white">
                  查看详情
                </Button>
              </CardFooter>
            </Card>
            
            {/* 推荐咨询师3 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="p-4 flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">陈</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">陈雨晴</h3>
                  <p className="text-blue-600 text-sm mb-1">青少年心理专家</p>
                  <div className="flex items-center space-x-1 text-sm mb-1">
                    {renderRating(4.7)}
                    <span className="text-gray-700 ml-1">4.7</span>
                    <span className="text-gray-500">(85条评价)</span>
                  </div>
                  <p className="text-gray-500 text-xs">擅长：青少年心理健康、情绪管理、自我成长</p>
                </div>
              </div>
              <CardFooter className="border-t px-4 py-3 bg-gray-50">
                <div className="text-blue-600 font-bold">¥480/次</div>
                <Button size="sm" className="ml-auto bg-blue-500 hover:bg-blue-600 text-white">
                  查看详情
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}