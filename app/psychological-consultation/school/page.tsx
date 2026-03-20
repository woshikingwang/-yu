"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { 
  ArrowLeft,
  Home,
  MessageSquare,
  User,
  ShoppingBag,
  GraduationCap,
  Search,
  MapPin,
  Clock,
  Phone,
  Calendar,
  Star,
  Award,
  Users,
  BookOpen,
  Heart,
  Send,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  X,
  CheckCircle,
  AlertCircle,
  Clock3,
  MessageCircle,
  Sparkles,
  Shield,
  Filter,
} from "lucide-react"

// Mock data for user's school (in real app, this would come from user profile)
const mockUserSchool = {
  name: "西安邮电大学",
  verified: true,
  studentId: "2021xxxxxxx",
}

// Mock data for school counseling center
const mockMySchoolCenter = {
  id: "s1",
  name: "西安邮电大学心理健康教育与咨询中心",
  location: "西安市长安区西长安街618号 学生活动中心305",
  counselors: 8,
  rating: 4.8,
  reviews: 526,
  openHours: "周一至周五 8:30-17:30",
  phone: "029-88166110",
  emergencyPhone: "029-88166119",
  services: ["个体咨询", "团体辅导", "危机干预", "心理测评", "线上咨询"],
  features: ["完全免费", "预约制", "保密协议", "专业团队"],
  description: "为全校师生提供专业的心理健康服务，包括心理咨询、心理测评、危机干预等。中心拥有8名专业咨询师，为学生提供安全、保密、专业的心理支持。",
}

// Mock data for school counselors
const mockSchoolCounselors = [
  {
    id: "sc1",
    name: "陈教授",
    title: "心理咨询中心主任",
    specialty: ["焦虑障碍", "抑郁症", "学业压力", "职业规划"],
    rating: 4.9,
    experience: 18,
    avatar: null,
    available: true,
    nextAvailable: "今天 14:00",
    introduction: "西安交通大学心理学博士，中国心理学会注册督导师。擅长处理各类心理问题，尤其在学业压力和职业规划方面有丰富经验。",
    certifications: ["注册督导师", "认知行为治疗师", "催眠治疗师"],
    education: "西安交通大学心理学博士",
    consultationCount: 1856,
  },
  {
    id: "sc2",
    name: "王丽副教授",
    title: "资深心理咨询师",
    specialty: ["人际关系", "情感问题", "家庭关系", "自我成长"],
    rating: 4.8,
    experience: 14,
    avatar: null,
    available: true,
    nextAvailable: "今天 16:00",
    introduction: "陕西师范大学心理学硕士，专注于人际关系和情感问题的研究与咨询。多次获得校级优秀教师称号。",
    certifications: ["注册咨询师", "家庭治疗师"],
    education: "陕西师范大学心理学硕士",
    consultationCount: 1092,
  },
  {
    id: "sc3",
    name: "张华博士",
    title: "心理咨询师",
    specialty: ["压力管理", "情绪调节", "自我认知", "睡眠问题"],
    rating: 4.9,
    experience: 10,
    avatar: null,
    available: false,
    nextAvailable: "明天 10:00",
    introduction: "心理学博士，擅长压力管理和情绪调节。采用整合取向咨询方法，帮助来访者找到适合自己的成长道路。",
    certifications: ["注册咨询师", "正念冥想指导师"],
    education: "西北大学心理学博士",
    consultationCount: 778,
  },
  {
    id: "sc4",
    name: "刘晓老师",
    title: "心理咨询师",
    specialty: ["适应问题", "新生适应", "人际关系", "社交焦虑"],
    rating: 4.7,
    experience: 6,
    avatar: null,
    available: true,
    nextAvailable: "今天 15:30",
    introduction: "专注于大学生适应问题和社交焦虑的咨询，帮助新生快速适应大学生活，建立良好的人际关系。",
    certifications: ["注册咨询师", "沙盘治疗师"],
    education: "华东师范大学心理学硕士",
    consultationCount: 456,
  },
]

// Mock data for available time slots
const mockTimeSlots = [
  { id: "t1", date: "今天", time: "09:00", available: true },
  { id: "t2", date: "今天", time: "10:00", available: true },
  { id: "t3", date: "今天", time: "11:00", available: false },
  { id: "t4", date: "今天", time: "14:00", available: true },
  { id: "t5", date: "今天", time: "15:00", available: true },
  { id: "t6", date: "今天", time: "16:00", available: true },
  { id: "t7", date: "今天", time: "17:00", available: false },
  { id: "t8", date: "明天", time: "09:00", available: true },
  { id: "t9", date: "明天", time: "10:00", available: true },
  { id: "t10", date: "明天", time: "14:00", available: true },
  { id: "t11", date: "明天", time: "15:00", available: true },
  { id: "t12", date: "明天", time: "16:00", available: true },
]

// Mock data for chat messages
interface ChatMessage {
  id: number
  type: "user" | "counselor"
  content: string
  timestamp: Date
}

export default function StudentCounselingPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("home")
  const [isVerified, setIsVerified] = useState(true)
  
  // Booking state
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [selectedCounselor, setSelectedCounselor] = useState<typeof mockSchoolCounselors[0] | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [bookingNote, setBookingNote] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  
  // Chat state
  const [showChatDialog, setShowChatDialog] = useState(false)
  const [chatCounselor, setChatCounselor] = useState<typeof mockSchoolCounselors[0] | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  
  const chatMessagesEndRef = useRef<HTMLDivElement>(null)

  const filteredCounselors = mockSchoolCounselors.filter(
    (counselor) =>
      counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.specialty.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleStartChat = (counselor: typeof mockSchoolCounselors[0]) => {
    setChatCounselor(counselor)
    setShowChatDialog(true)
    setChatMessages([
      {
        id: 1,
        type: "counselor",
        content: `你好！我是${counselor.name}，很高兴为你服务。有什么我可以帮助你的吗？`,
        timestamp: new Date(),
      }
    ])
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      content: chatInput,
      timestamp: new Date(),
    }
    setChatMessages([...chatMessages, newMessage])
    setChatInput("")

    // Simulate counselor response
    setTimeout(() => {
      const responses = [
        "我理解你的感受，谢谢你愿意分享。",
        "你能这样说已经很勇敢了。",
        "我在这里陪你，一起度过难关。",
        "每一份情绪都值得被看见。",
        "你的故事很重要，我愿意倾听。",
      ]
      const counselorResponse: ChatMessage = {
        id: Date.now() + 1,
        type: "counselor",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, counselorResponse])
    }, 1500)
  }

  const handleBooking = async () => {
    if (!selectedTimeSlot) {
      toast({
        title: "请选择预约时间",
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsBooking(false)
    setBookingSuccess(true)
    
    toast({
      title: "预约成功",
      description: `您已成功预约${selectedCounselor?.name}，${selectedTimeSlot}。请准时到达咨询室。`,
    })
  }

  const handleStartCall = () => {
    setIsInCall(true)
    toast({
      title: "正在连接",
      description: "正在与咨询师建立视频连接...",
    })
  }

  const handleEndCall = () => {
    setIsInCall(false)
    toast({
      title: "通话已结束",
      description: "如需继续咨询，请重新发起通话",
    })
  }

  if (!isVerified) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
        <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
          <div className="container mx-auto flex items-center justify-between">
            <Button variant="ghost" size="icon" asChild className="text-gray-600">
              <Link href="/personal-center">
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-gray-800">学校心理咨询</h1>
            <div className="w-10" />
          </div>
        </header>
        
        <main className="container mx-auto flex-1 p-4 md:p-6 flex items-center justify-center">
          <Card className="max-w-md w-full border-0 bg-white shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-10 w-10 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">需要学生认证</h2>
              <p className="text-gray-600 mb-6">
                访问学校心理咨询处需要先完成学生认证，以便我们为您提供更精准的服务。
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                  <Link href="/personal-center/student-verification">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    立即认证
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/personal-center">
                    返回个人中心
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" asChild className="text-gray-600">
              <Link href="/personal-center">
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">学校心理咨询</h1>
            </div>
            <Button variant="ghost" size="icon" asChild className="text-gray-600">
              <Link href="/message-center">
                <MessageCircle className="h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* User School Info */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 text-sm">
            <Badge className="bg-blue-100 text-blue-800 gap-1">
              <CheckCircle className="h-3 w-3" />
              已认证
            </Badge>
            <span className="text-gray-600">{mockUserSchool.name}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500">{mockUserSchool.studentId}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 space-y-4 p-4 md:p-6">
        {/* My School Counseling Center */}
        <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-bold text-lg mb-1">{mockMySchoolCenter.name}</h2>
                <div className="flex items-center gap-1 text-blue-100 text-sm">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{mockMySchoolCenter.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{mockMySchoolCenter.rating}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div className="flex items-center gap-1.5 text-blue-100">
                <Clock className="h-4 w-4" />
                <span>{mockMySchoolCenter.openHours}</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-100">
                <Phone className="h-4 w-4" />
                <span>{mockMySchoolCenter.phone}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1.5 mb-4">
              {mockMySchoolCenter.services.map((service, i) => (
                <span key={i} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {service}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-white text-blue-600 hover:bg-blue-50" 
                onClick={() => setActiveTab("counselors")}
              >
                <Calendar className="h-4 w-4 mr-1.5" />
                预约咨询
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent border-white text-white hover:bg-white/20"
                onClick={() => {
                  const available = mockSchoolCounselors.find(c => c.available)
                  if (available) handleStartChat(available)
                }}
              >
                <MessageCircle className="h-4 w-4 mr-1.5" />
                在线聊天
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-0 bg-red-50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-red-800">24小时心理危机热线</p>
                <p className="text-sm text-red-600">{mockMySchoolCenter.emergencyPhone}</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-100 bg-transparent">
                立即拨打
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="home">首页</TabsTrigger>
            <TabsTrigger value="counselors">咨询师</TabsTrigger>
            <TabsTrigger value="activities">活动</TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-4 mt-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-white hover:bg-blue-50 border-gray-200"
                onClick={() => {
                  const available = mockSchoolCounselors.find(c => c.available)
                  if (available) {
                    setSelectedCounselor(available)
                    setShowBookingDialog(true)
                  }
                }}
              >
                <Calendar className="h-6 w-6 text-blue-500" />
                <span className="text-sm font-medium">预约咨询</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-white hover:bg-green-50 border-gray-200"
                onClick={() => {
                  const available = mockSchoolCounselors.find(c => c.available)
                  if (available) handleStartChat(available)
                }}
              >
                <MessageCircle className="h-6 w-6 text-green-500" />
                <span className="text-sm font-medium">在线聊天</span>
              </Button>
            </div>
            
            {/* Introduction */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">中心简介</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{mockMySchoolCenter.description}</p>
              </CardContent>
            </Card>
            
            {/* Features */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">服务特色</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {mockMySchoolCenter.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Counselors Tab */}
          <TabsContent value="counselors" className="space-y-4 mt-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="搜索咨询师或擅长领域..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            
            {/* Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button variant="outline" size="sm" className="shrink-0 bg-white">
                <Filter className="h-3 w-3 mr-1" />
                筛选
              </Button>
              <Badge variant="outline" className="shrink-0 bg-blue-50 text-blue-700 cursor-pointer">
                全部
              </Badge>
              <Badge variant="outline" className="shrink-0 bg-white cursor-pointer hover:bg-gray-50">
                可预约
              </Badge>
              <Badge variant="outline" className="shrink-0 bg-white cursor-pointer hover:bg-gray-50">
                焦虑抑郁
              </Badge>
              <Badge variant="outline" className="shrink-0 bg-white cursor-pointer hover:bg-gray-50">
                人际关系
              </Badge>
            </div>
            
            {/* Counselors List */}
            <div className="space-y-3">
              {filteredCounselors.map((counselor) => (
                <Card key={counselor.id} className="border-0 bg-white shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100">
                          {counselor.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-bold text-gray-800">{counselor.name}</h3>
                            <p className="text-sm text-gray-600">{counselor.title}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-sm">{counselor.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {counselor.specialty.map((s, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                              {s}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <span>{counselor.experience}年经验</span>
                          <span>·</span>
                          <span>{counselor.consultationCount}次咨询</span>
                          {counselor.available ? (
                            <Badge className="bg-green-100 text-green-700 text-xs">可预约</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-600 text-xs">已约满</Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-blue-500 hover:bg-blue-600"
                            disabled={!counselor.available}
                            onClick={() => {
                              setSelectedCounselor(counselor)
                              setShowBookingDialog(true)
                            }}
                          >
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            预约
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => handleStartChat(counselor)}
                          >
                            <MessageCircle className="h-3.5 w-3.5 mr-1" />
                            聊天
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-4 mt-4">
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-1">团体活动</h3>
                <p className="text-sm text-gray-500 mb-4">学校定期举办各类心理健康团体活动，欢迎参加</p>
                <Button variant="outline" className="bg-transparent">
                  敬请期待
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>预约咨询</DialogTitle>
            <DialogDescription>
              预约 {selectedCounselor?.name} 老师的咨询服务
            </DialogDescription>
          </DialogHeader>
          
          {bookingSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">预约成功</h3>
              <p className="text-sm text-gray-600 mb-4">
                您已成功预约 {selectedCounselor?.name}，{selectedTimeSlot}。请准时到达咨询室。
              </p>
              <Button onClick={() => {
                setShowBookingDialog(false)
                setBookingSuccess(false)
                setSelectedTimeSlot(null)
                setBookingNote("")
              }} className="w-full">
                完成
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {/* Time Slots */}
                <div>
                  <Label className="mb-2 block">选择时间</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {mockTimeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        disabled={!slot.available}
                        onClick={() => setSelectedTimeSlot(`${slot.date} ${slot.time}`)}
                        className={`p-2 rounded-lg text-sm border transition-colors ${
                          selectedTimeSlot === `${slot.date} ${slot.time}`
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : slot.available
                            ? "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                            : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <div className="font-medium">{slot.date}</div>
                        <div>{slot.time}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Note */}
                <div>
                  <Label htmlFor="note">备注（可选）</Label>
                  <Textarea
                    id="note"
                    placeholder="简要描述您想咨询的问题..."
                    value={bookingNote}
                    onChange={(e) => setBookingNote(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                {/* Notice */}
                <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>您的所有信息将严格保密，预约后请准时到达，如需取消请提前1天操作。</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
                  取消
                </Button>
                <Button onClick={handleBooking} disabled={isBooking} className="bg-blue-500 hover:bg-blue-600">
                  {isBooking ? "提交中..." : "确认预约"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-lg h-[600px] flex flex-col p-0">
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100">
                    {chatCounselor?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-base">{chatCounselor?.name}</DialogTitle>
                  <DialogDescription className="text-xs">{chatCounselor?.title}</DialogDescription>
                </div>
              </div>
              {isInCall && (
                <Button size="sm" variant="outline" onClick={handleEndCall} className="text-red-600">
                  <PhoneOff className="h-4 w-4 mr-1" />
                  结束
                </Button>
              )}
            </div>
          </DialogHeader>
          
          {/* Chat Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {msg.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatMessagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Call Controls */}
          {isInCall && (
            <div className="p-3 border-t bg-gray-50">
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="icon"
                  variant={isMuted ? "destructive" : "outline"}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant={!isVideoOn ? "destructive" : "outline"}
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="destructive" onClick={handleEndCall}>
                  <PhoneOff className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Input Area */}
          {!isInCall && (
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="输入消息..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleStartCall}>
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
