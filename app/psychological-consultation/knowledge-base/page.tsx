"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Clock,
  FileText,
  Heart,
  Brain,
  Activity,
  CheckCircle2,
} from "lucide-react"

const mockAssessments = [
  {
    id: "a1",
    title: "焦虑自评量表 (SAS)",
    description: "评估您的焦虑程度，了解是否需要专业帮助",
    icon: "😰",
    duration: "5-8分钟",
    questions: 20,
    category: "情绪评估",
    color: "blue",
    lastScore: null,
  },
  {
    id: "a2",
    title: "抑郁自评量表 (SDS)",
    description: "识别抑郁情绪，及早发现心理健康问题",
    icon: "😔",
    duration: "5-10分钟",
    questions: 20,
    category: "情绪评估",
    color: "purple",
    lastScore: 45,
  },
  {
    id: "a3",
    title: "压力水平测试",
    description: "了解您当前的压力状况和应对能力",
    icon: "💼",
    duration: "3-5分钟",
    questions: 15,
    category: "压力评估",
    color: "amber",
    lastScore: 62,
  },
  {
    id: "a4",
    title: "睡眠质量评估",
    description: "评估您的睡眠状况，找出影响睡眠的因素",
    icon: "😴",
    duration: "4-6分钟",
    questions: 18,
    category: "生活质量",
    color: "indigo",
    lastScore: null,
  },
]

const mockArticles = [
  {
    id: "k1",
    title: "如何识别和应对焦虑症状",
    excerpt: "焦虑是一种常见的情绪反应，但当它变得过度或持久时，可能需要关注...",
    category: "情绪管理",
    readTime: "8分钟",
    tags: ["焦虑", "情绪管理", "自我调节"],
    image: "/images/article-anxiety.png",
    views: 1234,
  },
  {
    id: "k2",
    title: "深度睡眠的重要性与改善方法",
    excerpt: "高质量的睡眠对身心健康至关重要。本文将介绍改善睡眠的科学方法...",
    category: "睡眠健康",
    readTime: "6分钟",
    tags: ["睡眠", "健康", "生活方式"],
    image: "/images/article-sleep.png",
    views: 2156,
  },
  {
    id: "k3",
    title: "正念冥想：减压的科学方法",
    excerpt: "正念冥想是一种经过科学验证的减压技巧，可以帮助你活在当下...",
    category: "减压技巧",
    readTime: "10分钟",
    tags: ["正念", "冥想", "减压"],
    image: "/images/article-meditation.png",
    views: 1876,
  },
  {
    id: "k4",
    title: "建立健康的人际关系边界",
    excerpt: "设定清晰的个人边界对维护心理健康和良好的人际关系至关重要...",
    category: "人际关系",
    readTime: "7分钟",
    tags: ["人际关系", "边界", "沟通"],
    image: "/images/article-boundaries.png",
    views: 1543,
  },
]

const mockTestHistory = [
  {
    id: "h1",
    testName: "抑郁自评量表 (SDS)",
    score: 45,
    level: "轻度抑郁倾向",
    date: "2025-01-10",
    color: "purple",
  },
  {
    id: "h2",
    testName: "压力水平测试",
    score: 62,
    level: "中等压力",
    date: "2025-01-08",
    color: "amber",
  },
  {
    id: "h3",
    testName: "焦虑自评量表 (SAS)",
    score: 38,
    level: "正常范围",
    date: "2025-01-05",
    color: "blue",
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    hover: "hover:bg-blue-100",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
    hover: "hover:bg-purple-100",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    hover: "hover:bg-amber-100",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-200",
    hover: "hover:bg-indigo-100",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
    hover: "hover:bg-green-100",
  },
}

export default function KnowledgeBasePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            <Link href="/psychological-consultation">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-br from-green-100 to-teal-100 p-2">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <h1 className="text-lg font-bold text-gray-800">自测与知识库</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto flex-1 p-4 md:p-6">
        <Tabs defaultValue="assessments" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger
              value="assessments"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              <ClipboardCheck className="h-4 w-4 mr-2" />
              心理自测
            </TabsTrigger>
            <TabsTrigger
              value="knowledge"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              知识文章
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              测试记录
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessments" className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-2">了解你的心理状态</h3>
                    <p className="text-sm text-gray-600">
                      通过科学的心理测评工具，帮助你更好地认识自己的情绪状态和心理健康水平。测评结果仅供参考，如有需要请咨询专业心理咨询师。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {mockAssessments.map((assessment) => {
                const colors = colorClasses[assessment.color]
                return (
                  <Card
                    key={assessment.id}
                    className="bg-white border-0 shadow-sm hover:shadow-md transition-all group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`text-3xl rounded-lg ${colors.bg} p-3`}>{assessment.icon}</div>
                          <div>
                            <CardTitle className="text-lg text-gray-800">{assessment.title}</CardTitle>
                            <Badge variant="outline" className={`${colors.border} ${colors.text} mt-1 text-xs`}>
                              {assessment.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600">{assessment.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{assessment.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{assessment.questions}题</span>
                        </div>
                      </div>

                      {assessment.lastScore !== null && (
                        <div className={`rounded-lg ${colors.bg} p-3`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">上次测评得分</span>
                            <span className={`font-bold ${colors.text}`}>{assessment.lastScore}分</span>
                          </div>
                          <Progress value={assessment.lastScore} className="h-2" />
                        </div>
                      )}

                      <Button
                        className={`w-full ${assessment.lastScore !== null ? colors.bg + " " + colors.text + " " + colors.hover : "bg-blue-600 hover:bg-blue-700 text-white"} group-hover:shadow-md transition-all`}
                      >
                        {assessment.lastScore !== null ? "重新测评" : "开始测评"}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-2">心理健康知识库</h3>
                    <p className="text-sm text-gray-600">
                      学习心理健康知识，掌握情绪管理技巧，提升生活质量。所有文章均由专业心理咨询师审核。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              {["all", "情绪管理", "睡眠健康", "减压技巧", "人际关系"].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-gray-200 hover:bg-green-50 bg-white"
                  }
                >
                  {category === "all" ? "全部" : category}
                </Button>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {mockArticles
                .filter((article) => selectedCategory === "all" || article.category === selectedCategory)
                .map((article) => (
                  <Card
                    key={article.id}
                    className="bg-white border-0 shadow-sm hover:shadow-md transition-all group overflow-hidden"
                  >
                    <div className="h-40 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-green-600" />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-green-200 text-green-600">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{article.views} 阅读</span>
                      </div>
                      <CardTitle className="text-lg text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 line-clamp-2">{article.excerpt}</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50">
                          阅读全文 →
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-gray-200 text-gray-600 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-100 p-3">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-2">测试记录与趋势</h3>
                    <p className="text-sm text-gray-600">
                      查看你的历史测评记录，了解心理状态的变化趋势，持续关注自己的心理健康。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {mockTestHistory.length > 0 ? (
              <div className="space-y-4">
                {mockTestHistory.map((record) => {
                  const colors = colorClasses[record.color]
                  return (
                    <Card key={record.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className={`h-5 w-5 ${colors.text}`} />
                              <h3 className="font-medium text-gray-800">{record.testName}</h3>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span>{record.date}</span>
                              <Badge variant="outline" className={`${colors.border} ${colors.text}`}>
                                {record.level}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">得分</span>
                                <span className={`font-bold ${colors.text}`}>{record.score}分</span>
                              </div>
                              <Progress value={record.score} className="h-2" />
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className={`${colors.text} ${colors.hover}`}>
                            查看详情
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-12 text-center">
                  <div className="rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <ClipboardCheck className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">还没有测试记录</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">去测评</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
