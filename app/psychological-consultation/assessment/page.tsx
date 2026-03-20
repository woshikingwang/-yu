"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Bookmark, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 测评类型定义
interface Assessment {
  id: string
  title: string
  description: string
  duration: number
  questionsCount: number
  category: string
  completed: boolean
  progress: number
  image?: string
}

// 测评题目定义
interface Question {
  id: string
  text: string
  options: { id: string; text: string; score: number }[]
}

// 模拟测评数据
const mockAssessments: Assessment[] = [
  {
    id: "anxiety",
    title: "焦虑自评量表（SAS）",
    description: "评估您最近一周内的焦虑程度",
    duration: 5,
    questionsCount: 20,
    category: "情绪评估",
    completed: false,
    progress: 65,
    image: "/images/mood-anxious.png"
  },
  {
    id: "stress",
    title: "压力水平评估",
    description: "了解您当前的压力状态和应对能力",
    duration: 3,
    questionsCount: 15,
    category: "压力管理",
    completed: false,
    progress: 80,
    image: "/images/mood-tired.png"
  },
  {
    id: "depression",
    title: "抑郁筛查量表（PHQ-9）",
    description: "初步评估您的情绪状态",
    duration: 4,
    questionsCount: 9,
    category: "情绪评估",
    completed: false,
    progress: 0,
    image: "/images/mood-confused.png"
  },
  {
    id: "sleep",
    title: "睡眠质量评估",
    description: "评估您的睡眠模式和质量",
    duration: 3,
    questionsCount: 12,
    category: "健康生活",
    completed: false,
    progress: 0,
    image: "/images/mood-calm.png"
  },
  {
    id: "personality",
    title: "性格特质测试",
    description: "了解您的性格特点和优势",
    duration: 10,
    questionsCount: 50,
    category: "自我探索",
    completed: false,
    progress: 0,
    image: "/images/mood-happy.png"
  },
  {
    id: "relationship",
    title: "人际关系满意度评估",
    description: "评估您的人际关系质量",
    duration: 4,
    questionsCount: 18,
    category: "社交健康",
    completed: false,
    progress: 0,
    image: "/images/mood-excited.png"
  }
]

// 模拟题目数据
const mockQuestions: Record<string, Question[]> = {
  anxiety: [
    {
      id: "anxiety-1",
      text: "我觉得比平时容易紧张和着急",
      options: [
        { id: "anxiety-1-1", text: "很少有", score: 1 },
        { id: "anxiety-1-2", text: "有时有", score: 2 },
        { id: "anxiety-1-3", text: "大部分时间有", score: 3 },
        { id: "anxiety-1-4", text: "绝大部分时间有", score: 4 }
      ]
    },
    {
      id: "anxiety-2",
      text: "我无缘无故地感到害怕",
      options: [
        { id: "anxiety-2-1", text: "很少有", score: 1 },
        { id: "anxiety-2-2", text: "有时有", score: 2 },
        { id: "anxiety-2-3", text: "大部分时间有", score: 3 },
        { id: "anxiety-2-4", text: "绝大部分时间有", score: 4 }
      ]
    },
    {
      id: "anxiety-3",
      text: "我容易心里烦乱或觉得惊恐",
      options: [
        { id: "anxiety-3-1", text: "很少有", score: 1 },
        { id: "anxiety-3-2", text: "有时有", score: 2 },
        { id: "anxiety-3-3", text: "大部分时间有", score: 3 },
        { id: "anxiety-3-4", text: "绝大部分时间有", score: 4 }
      ]
    }
  ],
  stress: [
    {
      id: "stress-1",
      text: "我感到时间不够用，事情太多",
      options: [
        { id: "stress-1-1", text: "从不", score: 0 },
        { id: "stress-1-2", text: "偶尔", score: 1 },
        { id: "stress-1-3", text: "经常", score: 2 },
        { id: "stress-1-4", text: "总是", score: 3 }
      ]
    },
    {
      id: "stress-2",
      text: "我感到无法控制生活中的重要事情",
      options: [
        { id: "stress-2-1", text: "从不", score: 0 },
        { id: "stress-2-2", text: "偶尔", score: 1 },
        { id: "stress-2-3", text: "经常", score: 2 },
        { id: "stress-2-4", text: "总是", score: 3 }
      ]
    }
  ]
}

export default function PsychologicalAssessmentPage() {
  const { toast } = useToast()
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState<Record<string, any>>({})

  // 过滤测评列表
  const filteredAssessments = selectedTab === "all" 
    ? mockAssessments 
    : mockAssessments.filter(assessment => assessment.category === selectedTab)

  // 开始测评
  const startAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
  }

  // 提交答案
  const handleAnswerSubmit = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  // 下一题
  const nextQuestion = () => {
    const currentQuestions = selectedAssessment ? mockQuestions[selectedAssessment] || [] : []
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // 上一题
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // 完成测评
  const completeAssessment = () => {
    // 计算分数和结果
    const currentQuestions = selectedAssessment ? mockQuestions[selectedAssessment] || [] : []
    let totalScore = 0
    
    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = currentQuestions.find(q => q.id === questionId)
      if (question) {
        const selectedOption = question.options.find(opt => opt.id === optionId)
        if (selectedOption) {
          totalScore += selectedOption.score
        }
      }
    })

    // 生成测评结果
    const result = {
      score: totalScore,
      maxScore: currentQuestions.length * 4,
      percentage: Math.round((totalScore / (currentQuestions.length * 4)) * 100),
      interpretation: getInterpretation(selectedAssessment!, totalScore, currentQuestions.length * 4),
      suggestions: getSuggestions(selectedAssessment!),
      date: new Date().toISOString()
    }

    setAssessmentResults(result)
    setShowResults(true)
    
    // 更新测评进度
    toast({
      title: "测评完成！",
      description: "您的测评结果已生成",
    })
  }

  // 获取解释结果
  const getInterpretation = (assessmentId: string, score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    
    if (assessmentId === "anxiety") {
      if (percentage < 25) return "您的焦虑程度较低，保持良好的心理状态。"
      if (percentage < 50) return "您有轻度焦虑症状，建议适当放松和调整。"
      if (percentage < 75) return "您有中度焦虑症状，建议寻求专业心理咨询。"
      return "您的焦虑程度较高，强烈建议咨询专业心理医生。"
    }
    
    if (assessmentId === "stress") {
      if (percentage < 25) return "您的压力水平较低，能够很好地应对生活挑战。"
      if (percentage < 50) return "您面临轻度压力，注意适当休息和自我调节。"
      if (percentage < 75) return "您的压力较大，需要寻找有效的减压方法。"
      return "您承受着巨大压力，建议寻求专业帮助并调整生活方式。"
    }
    
    return "根据您的回答，我们为您生成了个性化的分析结果。"
  }

  // 获取建议
  const getSuggestions = (assessmentId: string) => {
    if (assessmentId === "anxiety") {
      return [
        "尝试深呼吸练习：吸气4秒，屏息2秒，呼气6秒",
        "保持规律的运动，如散步、瑜伽等",
        "保证充足的睡眠，建立良好的睡眠习惯",
        "学习正念冥想，专注当下",
        "与信任的朋友分享您的感受"
      ]
    }
    
    if (assessmentId === "stress") {
      return [
        "学习时间管理技巧，合理安排任务",
        "设定明确的边界，避免过度承诺",
        "培养兴趣爱好，丰富业余生活",
        "尝试放松技巧，如渐进式肌肉放松",
        "必要时寻求社会支持"
      ]
    }
    
    return ["保持积极的心态", "定期进行自我评估", "关注心理健康"]
  }

  // 退出测评
  const exitAssessment = () => {
    setSelectedAssessment(null)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
  }

  // 当前正在进行的测评
  const currentAssessment = selectedAssessment 
    ? mockAssessments.find(a => a.id === selectedAssessment) 
    : null
  
  // 当前问题列表
  const currentQuestions = selectedAssessment 
    ? mockQuestions[selectedAssessment] || [] 
    : []

  // 当前问题
  const currentQuestion = currentQuestions[currentQuestionIndex]

  // 计算完成进度
  const getCompletionProgress = () => {
    if (!currentQuestions.length) return 0
    return Math.round(((Object.keys(answers).length) / currentQuestions.length) * 100)
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* 头部 */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center">
          <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-700">
            <Link href="/">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-gray-600 ml-4">心理测评</h1>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        {selectedAssessment && (currentQuestion || showResults) ? (
          // 测评进行中或查看结果
          <Card className="max-w-3xl mx-auto bg-white border-0 shadow-sm">
            {!showResults ? (
              // 测评进行中
              <>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-600">{currentAssessment.title}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={exitAssessment} className="text-gray-500">
                      退出
                    </Button>
                  </div>
                  <CardDescription className="text-gray-500">
                    问题 {currentQuestionIndex + 1} / {currentQuestions.length}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* 进度条 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">完成进度</span>
                      <span className="text-gray-600 font-medium">{getCompletionProgress()}%</span>
                    </div>
                    <Progress value={getCompletionProgress()} className="h-2" />
                  </div>

                  {/* 问题内容 */}
                  {currentQuestion && (
                    <div className="space-y-6">
                      <div className="text-lg font-medium text-gray-800">{currentQuestion.text}</div>
                      
                      <RadioGroup 
                        value={answers[currentQuestion.id] || ""}
                        onValueChange={(value) => handleAnswerSubmit(currentQuestion.id, value)}
                        className="space-y-4"
                      >
                        {currentQuestion.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                            <RadioGroupItem value={option.id} id={option.id} className="text-blue-500" />
                            <Label htmlFor={option.id} className="flex-1 text-gray-700 cursor-pointer">
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </CardContent>

                {/* 导航按钮 */}
                <div className="flex justify-between p-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={prevQuestion} 
                    disabled={currentQuestionIndex === 0}
                    className="text-gray-600"
                  >
                    上一题
                  </Button>
                  
                  {currentQuestionIndex === currentQuestions.length - 1 ? (
                    <Button 
                      onClick={completeAssessment} 
                      disabled={!answers[currentQuestion?.id || ""]}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      完成测评
                    </Button>
                  ) : (
                    <Button 
                      onClick={nextQuestion} 
                      disabled={!answers[currentQuestion?.id || ""]}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      下一题
                    </Button>
                  )}
                </div>
              </>
            ) : (
              // 测评结果
              <>
                <CardHeader>
                  <CardTitle className="text-center text-gray-600">{currentAssessment.title} - 测评结果</CardTitle>
                  <CardDescription className="text-center text-gray-500">
                    完成时间：{new Date(assessmentResults.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-8 p-6">
                  {/* 分数卡片 */}
                  <div className="bg-blue-50 rounded-lg p-6 text-center space-y-4">
                    <div className="text-5xl font-bold text-blue-600">
                      {assessmentResults.score} / {assessmentResults.maxScore}
                    </div>
                    <div className="text-xl font-medium text-blue-700">{assessmentResults.percentage}%</div>
                    <div className="text-gray-700">{assessmentResults.interpretation}</div>
                  </div>

                  {/* 改善建议 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                      改善建议
                    </h3>
                    <ul className="space-y-3">
                      {assessmentResults.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 专业咨询建议 */}
                  <div className="bg-amber-50 rounded-lg p-5 border-l-4 border-amber-400">
                    <h3 className="font-medium text-amber-800 mb-2">专业建议</h3>
                    <p className="text-amber-700 text-sm">
                      这份测评仅作为参考，不能替代专业诊断。如果您持续感到不适，建议寻求专业心理咨询师的帮助。
                    </p>
                  </div>
                </CardContent>

                <div className="flex justify-center gap-4 p-6 border-t">
                  <Button variant="outline" onClick={exitAssessment} className="text-gray-600">
                    返回测评列表
                  </Button>
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600 text-white" 
                    asChild
                  >
                    <Link href="/psychological-consultation">
                      预约专业咨询
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </Card>
        ) : (
          // 测评列表页面
          <div className="space-y-8">
            {/* 页面说明 */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">心理测评中心</h2>
              <p className="text-gray-600">
                通过科学的心理测评，了解自己的心理健康状态，获取个性化的改善建议
              </p>
            </div>

            {/* 测评分类标签页 */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full justify-start flex-wrap p-1 bg-gray-100">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  全部测评
                </TabsTrigger>
                <TabsTrigger value="情绪评估" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  情绪评估
                </TabsTrigger>
                <TabsTrigger value="压力管理" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  压力管理
                </TabsTrigger>
                <TabsTrigger value="健康生活" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  健康生活
                </TabsTrigger>
                <TabsTrigger value="自我探索" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  自我探索
                </TabsTrigger>
                <TabsTrigger value="社交健康" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  社交健康
                </TabsTrigger>
              </TabsList>

              {/* 测评列表 */}
              <TabsContent value={selectedTab} className="pt-6">
                {filteredAssessments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAssessments.map((assessment) => (
                      <Card 
                        key={assessment.id} 
                        className={`overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer border-0 shadow-sm ${assessment.completed ? 'bg-blue-50' : 'bg-white'}`}
                        onClick={() => startAssessment(assessment.id)}
                      >
                        <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
                          {assessment.image && (
                            <img 
                              src={assessment.image} 
                              alt={assessment.title} 
                              className="w-full h-full object-cover mix-blend-overlay opacity-70"
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-white text-xl font-bold">{assessment.title}</h3>
                          </div>
                          {assessment.progress > 0 && !assessment.completed && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-2">
                              <div className="flex justify-between text-xs text-white mb-1">
                                <span>进行中</span>
                                <span>{assessment.progress}%</span>
                              </div>
                              <Progress value={assessment.progress} className="h-1.5 bg-white/30 [&>div]:bg-white" />
                            </div>
                          )}
                          {assessment.completed && (
                            <Badge className="absolute top-3 right-3 bg-green-500">
                              已完成
                            </Badge>
                          )}
                        </div>
                        
                        <CardContent className="p-5 space-y-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{assessment.description}</p>
                          
                          <div className="flex justify-between items-center text-sm">
                            <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                              {assessment.category}
                            </Badge>
                            <div className="flex items-center gap-4 text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{assessment.duration}分钟</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Bookmark className="h-3.5 w-3.5" />
                                <span>{assessment.questionsCount}题</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            className={`w-full ${assessment.progress > 0 && !assessment.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                            onClick={(e) => {
                              e.stopPropagation()
                              startAssessment(assessment.id)
                            }}
                          >
                            {assessment.progress > 0 && !assessment.completed ? '继续测评' : '开始测评'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">该分类下暂无测评</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* 测评说明 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-w-3xl mx-auto">
              <h3 className="text-lg font-medium text-gray-700 mb-3">测评须知</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">1</div>
                  <span>测评结果仅作为参考，不能替代专业诊断和治疗</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">2</div>
                  <span>请根据您的真实感受回答问题，以获得准确的评估结果</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">3</div>
                  <span>测评完成后，您可以查看详细报告和改善建议</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}