"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  ArrowLeft, 
  Upload, 
  CheckCircle, 
  GraduationCap, 
  FileText, 
  Shield, 
  AlertCircle,
  X,
  ImageIcon,
  Clock,
  RefreshCw,
  Building2,
  User,
  Phone,
  Mail
} from "lucide-react"

type VerificationStatus = "none" | "pending" | "approved" | "rejected"

interface VerificationData {
  school: string
  studentId: string
  realName: string
  major: string
  grade: string
  phone: string
  email: string
  submitTime?: string
  rejectionReason?: string
}

export default function StudentVerificationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<VerificationStatus>("none")
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  
  const [formData, setFormData] = useState({
    school: "",
    studentId: "",
    realName: "",
    idCard: "",
    phone: "",
    email: "",
    major: "",
    grade: "",
  })
  
  const [files, setFiles] = useState({
    studentCard: null as File | null,
    studentCardPreview: null as string | null,
    idCardFront: null as File | null,
    idCardFrontPreview: null as string | null,
  })

  const studentCardInputRef = useRef<HTMLInputElement>(null)
  const idCardInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateFile = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    const maxSize = 5 * 1024 * 1024 // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "文件格式错误",
        description: "仅支持 JPG、PNG 格式",
        variant: "destructive",
      })
      return false
    }
    
    if (file.size > maxSize) {
      toast({
        title: "文件过大",
        description: "文件大小不能超过 5MB",
        variant: "destructive",
      })
      return false
    }
    
    return true
  }

  const handleFileChange = (field: string, file: File | null) => {
    if (!file) return
    
    if (!validateFile(file)) return
    
    const preview = URL.createObjectURL(file)
    
    if (field === "studentCard") {
      setFiles((prev) => ({ 
        ...prev, 
        studentCard: file,
        studentCardPreview: preview 
      }))
    } else if (field === "idCardFront") {
      setFiles((prev) => ({ 
        ...prev, 
        idCardFront: file,
        idCardFrontPreview: preview 
      }))
    }
  }

  const removeFile = (field: string) => {
    if (field === "studentCard") {
      setFiles((prev) => ({ 
        ...prev, 
        studentCard: null,
        studentCardPreview: null 
      }))
    } else if (field === "idCardFront") {
      setFiles((prev) => ({ 
        ...prev, 
        idCardFront: null,
        idCardFrontPreview: null 
      }))
    }
  }

  const validateStep1 = (): boolean => {
    if (!formData.school) {
      toast({
        title: "请选择学校",
        description: "学校为必填项",
        variant: "destructive",
      })
      return false
    }
    if (!formData.studentId.trim()) {
      toast({
        title: "请输入学号",
        description: "学号为必填项",
        variant: "destructive",
      })
      return false
    }
    if (!formData.realName.trim()) {
      toast({
        title: "请输入真实姓名",
        description: "姓名为必填项",
        variant: "destructive",
      })
      return false
    }
    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的手机号",
        variant: "destructive",
      })
      return false
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "邮箱格式错误",
        description: "请输入正确的邮箱地址",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!files.studentCard) {
      toast({
        title: "请上传学生证照片",
        description: "学生证照片为必传项",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const data: VerificationData = {
      ...formData,
      submitTime: new Date().toISOString(),
    }
    
    setVerificationData(data)
    setStatus("pending")
    setIsLoading(false)
    setStep(3)
    
    toast({
      title: "认证申请已提交",
      description: "我们将在1-3个工作日内完成审核",
    })
  }

  const handleResubmit = () => {
    setStatus("none")
    setStep(1)
    setVerificationData(null)
  }

  const schools = [
    // 985高校
    "北京大学", "清华大学", "复旦大学", "上海交通大学", "浙江大学",
    "南京大学", "中国科学技术大学", "武汉大学", "华中科技大学", 
    "西安交通大学", "哈尔滨工业大学", "北京航空航天大学", "天津大学",
    "东南大学", "厦门大学", "山东大学", "湖南大学", "中南大学",
    "四川大学", "电子科技大学", "重庆大学", "大连理工大学", "吉林大学",
    "中国人民大学", "北京师范大学", "南开大学", "同济大学", "华东师范大学",
    // 211高校
    "北京交通大学", "北京工业大学", "北京科技大学", "北京化工大学", "北京邮电大学",
    "华北电力大学", "中国矿业大学", "中国石油大学", "北方工业大学", "北京建筑工程学院",
    "上海大学", "上海财经大学", "上海外国语大学", "华东理工大学", "东华大学",
    "上海海洋大学", "上海中医药大学", "上海体育学院", "上海音乐学院",
    "河海大学", "江南大学", "南京农业大学", "南京师范大学", "南京理工大学",
    "苏州大学", "扬州大学", "江苏大学", "南京信息工程大学",
    "浙江工业大学", "浙江师范大学", "杭州电子科技大学", "宁波大学", "温州医科大学",
    // 其他知名高校
    "深圳大学", "南方医科大学", "广州大学", "广东工业大学", "华南师范大学",
    "暨南大学", "汕头大学", "广州中医药大学", "华南农业大学",
    "武汉理工大学", "华中师范大学", "中南财经政法大学", "武汉科技大学",
    "湖北大学", "湖北中医药大学", "三峡大学",
    "西安电子科技大学", "陕西师范大学", "西北大学", "长安大学", "西安建筑科技大学",
    "成都理工大学", "西南财经大学", "四川师范大学", "成都中医药大学",
    "重庆医科大学", "西南大学", "重庆师范大学",
    "天津医科大学", "天津师范大学", "天津中医药大学", "天津工业大学",
    "哈尔滨工程大学", "东北林业大学", "东北农业大学", "哈尔滨医科大学",
    "吉林农业大学", "长春理工大学", "东北师范大学",
    "辽宁大学", "大连医科大学", "沈阳药科大学", "中国医科大学",
    "河北工业大学", "燕山大学", "河北师范大学", "河北医科大学",
    "郑州大学", "河南大学", "河南师范大学", "河南科技大学",
    "安徽大学", "安徽医科大学", "安徽师范大学", "合肥工业大学",
    "南昌大学", "江西师范大学", "江西财经大学", "华东交通大学",
    "福建师范大学", "福建农林大学", "华侨大学", "闽南师范大学",
    "广西大学", "广西师范大学", "桂林电子科技大学", "广西医科大学",
    "海南大学", "海南师范大学", "海南医学院",
    "贵州大学", "贵州师范大学", "贵州医科大学", "遵义医科大学",
    "云南大学", "云南师范大学", "昆明医科大学", "大理大学",
    "西藏大学", "西藏民族大学",
    "西北农林科技大学", "陕西中医药大学", "西安外国语大学", "西安美术学院",
    "宁夏大学", "宁夏医科大学", "北方民族大学",
    "青海大学", "青海师范大学", "青海民族大学",
    "新疆大学", "新疆医科大学", "新疆师范大学", "石河子大学",
    "内蒙古大学", "内蒙古师范大学", "内蒙古医科大学",
    // 军事院校
    "国防科技大学", "陆军工程大学", "海军工程大学", "空军工程大学",
  ]

  const grades = ["大一", "大二", "大三", "大四", "大五", "研一", "研二", "研三", "博一", "博二", "博三", "博四", "博五"]

  const getStepProgress = () => {
    return (step / 3) * 100
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
          <h1 className="text-xl font-bold text-gray-800">学生认证</h1>
          {status === "pending" && (
            <Button variant="ghost" size="sm" onClick={handleResubmit}>
              <RefreshCw className="h-4 w-4 mr-1" />
              重新认证
            </Button>
          )}
          {status === "rejected" && (
            <Button variant="ghost" size="sm" onClick={handleResubmit} className="text-orange-600">
              <RefreshCw className="h-4 w-4 mr-1" />
              重新认证
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 space-y-6 p-4 md:p-6 max-w-2xl">
        {/* Status Banner */}
        {status !== "none" && (
          <Card className={`border-0 shadow-sm ${
            status === "approved" ? "bg-green-50" : 
            status === "rejected" ? "bg-red-50" : "bg-blue-50"
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {status === "pending" && (
                  <>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">审核中</h3>
                      <p className="text-sm text-gray-600">您的认证申请正在审核中，请耐心等待</p>
                    </div>
                  </>
                )}
                {status === "approved" && (
                  <>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">认证成功</h3>
                      <p className="text-sm text-gray-600">恭喜您已完成学生认证</p>
                    </div>
                  </>
                )}
                {status === "rejected" && (
                  <>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">认证被拒绝</h3>
                      <p className="text-sm text-gray-600">{verificationData?.rejectionReason || "请重新提交认证申请"}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Steps */}
        {status === "none" && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>认证进度</span>
                <span>第 {step} 步 / 共 3 步</span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>

            <div className="flex items-center justify-center gap-2 md:gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm ${
                    step >= 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  1
                </div>
                <span className="text-xs mt-1 md:mt-2 text-gray-600">填写信息</span>
              </div>
              <div className={`w-8 md:w-16 h-1 ${step >= 2 ? "bg-blue-500" : "bg-gray-200"}`} />
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm ${
                    step >= 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  2
                </div>
                <span className="text-xs mt-1 md:mt-2 text-gray-600">上传证件</span>
              </div>
              <div className={`w-8 md:w-16 h-1 ${step >= 3 ? "bg-blue-500" : "bg-gray-200"}`} />
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm ${
                    step >= 3 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  3
                </div>
                <span className="text-xs mt-1 md:mt-2 text-gray-600">等待审核</span>
              </div>
            </div>
          </>
        )}

        {/* Step 1: Basic Information */}
        {step === 1 && status === "none" && (
          <Card className="border-0 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                基本信息
              </CardTitle>
              <CardDescription>请填写您的学生信息，带 * 的为必填项</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="school">学校名称 *</Label>
                <Select value={formData.school} onValueChange={(value) => handleInputChange("school", value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="请选择您的学校" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    {schools.map((school) => (
                      <SelectItem key={school} value={school}>
                        {school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">学号 *</Label>
                <Input
                  id="studentId"
                  placeholder="请输入您的学号"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange("studentId", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="realName">真实姓名 *</Label>
                <Input
                  id="realName"
                  placeholder="请输入您的真实姓名"
                  value={formData.realName}
                  onChange={(e) => handleInputChange("realName", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="major">专业</Label>
                  <Input
                    id="major"
                    placeholder="请输入您的专业"
                    value={formData.major}
                    onChange={(e) => handleInputChange("major", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">年级</Label>
                  <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="请选择您的年级" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="请输入您的手机号"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入您的邮箱"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/personal-center">取消</Link>
                </Button>
                <Button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600" 
                  onClick={() => {
                    if (validateStep1()) setStep(2)
                  }}
                >
                  下一步
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Upload Documents */}
        {step === 2 && status === "none" && (
          <Card className="border-0 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <FileText className="h-5 w-5 text-blue-500" />
                上传证件
              </CardTitle>
              <CardDescription>请上传学生证等证明材料，* 为必传项</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Card */}
              <div className="space-y-3">
                <Label>学生证照片 *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    ref={studentCardInputRef}
                    onChange={(e) => handleFileChange("studentCard", e.target.files?.[0] || null)}
                  />
                  {files.studentCardPreview ? (
                    <div className="relative">
                      <img 
                        src={files.studentCardPreview} 
                        alt="学生证预览" 
                        className="w-full max-h-48 object-contain rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => removeFile("studentCard")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="mt-2 flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">{files.studentCard?.name}</span>
                      </div>
                    </div>
                  ) : (
                    <label 
                      htmlFor="studentCard" 
                      className="cursor-pointer flex flex-col items-center py-4"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">点击上传学生证照片</p>
                      <p className="text-xs text-gray-500 mt-1">支持 JPG、PNG 格式，大小不超过 5MB</p>
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500">请确保学生证信息清晰可见，包含姓名、学号、学校等信息</p>
              </div>

              {/* ID Card (Optional) */}
              <div className="space-y-3">
                <Label>身份证照片（可选）</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    ref={idCardInputRef}
                    onChange={(e) => handleFileChange("idCardFront", e.target.files?.[0] || null)}
                  />
                  {files.idCardFrontPreview ? (
                    <div className="relative">
                      <img 
                        src={files.idCardFrontPreview} 
                        alt="身份证预览" 
                        className="w-full max-h-48 object-contain rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => removeFile("idCardFront")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="mt-2 flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">{files.idCardFront?.name}</span>
                      </div>
                    </div>
                  ) : (
                    <label 
                      htmlFor="idCard" 
                      className="cursor-pointer flex flex-col items-center py-4"
                    >
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">点击上传身份证正面</p>
                      <p className="text-xs text-gray-500 mt-1">用于辅助验证身份，可不填</p>
                    </label>
                  )}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">隐私保护承诺</p>
                    <p className="text-xs leading-relaxed">
                      您上传的所有证件信息仅用于学生身份认证，我们将严格保护您的个人信息安全，不会用于其他用途或向第三方泄露。审核完成后，您的证件照片将被安全删除。
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                  上一步
                </Button>
                <Button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600" 
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    "提交认证"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Submitted */}
        {step === 3 && status === "pending" && (
          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">认证申请已提交</h2>
              <p className="text-gray-600 mb-6">我们将在1-3个工作日内完成审核，请耐心等待</p>
              
              {verificationData && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-800 mb-3">提交信息</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">学校：</span>
                      <span className="text-gray-800 font-medium">{verificationData.school}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">学号：</span>
                      <span className="text-gray-800 font-medium">{verificationData.studentId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">姓名：</span>
                      <span className="text-gray-800 font-medium">{verificationData.realName}</span>
                    </div>
                    {verificationData.major && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">专业：</span>
                        <span className="text-gray-800 font-medium">{verificationData.major}</span>
                      </div>
                    )}
                    {verificationData.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">手机：</span>
                        <span className="text-gray-800 font-medium">{verificationData.phone}</span>
                      </div>
                    )}
                    {verificationData.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">邮箱：</span>
                        <span className="text-gray-800 font-medium">{verificationData.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">提交时间：</span>
                      <span className="text-gray-800 font-medium">
                        {verificationData.submitTime && new Date(verificationData.submitTime).toLocaleString("zh-CN")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                  <Link href="/personal-center">返回个人中心</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/psychological-consultation/school">浏览学校咨询处</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefits Card */}
        {step < 3 && status === "none" && (
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">认证后可享受</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">免费咨询服务</p>
                  <p className="text-sm text-gray-600">使用本校心理咨询中心的免费咨询服务</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">团体活动</p>
                  <p className="text-sm text-gray-600">参加学校组织的各类心理健康团体活动</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">专属标识</p>
                  <p className="text-sm text-gray-600">获得学生认证标识，享受学生专属功能</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">优先预约</p>
                  <p className="text-sm text-gray-600">优先预约热门时段和资深咨询师</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
