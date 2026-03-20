"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Clock, Video, Phone, MessageSquare, Star, FileText, Download } from "lucide-react"

// Mock data for consultations
const mockUpcoming = [
  {
    id: "1",
    counselor: {
      name: "张心理咨询师",
      avatar: "/images/counselor-zhang.png",
      title: "国家二级心理咨询师",
    },
    date: "2025-06-15",
    time: "14:00 - 15:00",
    type: "视频咨询",
    status: "待开始",
    topic: "焦虑情绪管理",
    notes: "最近工作压力大，希望能得到一些缓解焦虑的方法",
  },
  {
    id: "2",
    counselor: {
      name: "李心理咨询师",
      avatar: "/images/counselor-li.png",
      title: "临床心理学博士",
    },
    date: "2025-06-18",
    time: "16:00 - 17:00",
    type: "语音咨询",
    status: "待开始",
    topic: "职场人际关系",
    notes: "与同事相处遇到一些问题",
  },
]

const mockCompleted = [
  {
    id: "3",
    counselor: {
      name: "张心理咨询师",
      avatar: "/images/counselor-zhang.png",
      title: "国家二级心理咨询师",
    },
    date: "2025-06-05",
    time: "14:00 - 15:00",
    type: "视频咨询",
    status: "已完成",
    topic: "情绪管理",
    rating: 5,
    review: "张老师非常专业，给了我很多实用的建议，感觉好多了！",
    summary: "本次咨询主要讨论了如何识别和管理焦虑情绪，学习了深呼吸和正念技巧。",
    hasReport: true,
  },
  {
    id: "4",
    counselor: {
      name: "王心理咨询师",
      avatar: "/images/counselor-wang.png",
      title: "婚姻家庭治疗师",
    },
    date: "2025-05-28",
    time: "10:00 - 11:00",
    type: "视频咨询",
    status: "已完成",
    topic: "家庭关系",
    rating: 5,
    review: "王老师很温和，帮助我理解了家庭沟通的重要性。",
    summary: "探讨了家庭成员之间的沟通模式，学习了有效沟通技巧。",
    hasReport: true,
  },
  {
    id: "5",
    counselor: {
      name: "李心理咨询师",
      avatar: "/images/counselor-li.png",
      title: "临床心理学博士",
    },
    date: "2025-05-20",
    time: "16:00 - 17:00",
    type: "语音咨询",
    status: "已完成",
    topic: "压力管理",
    rating: 4,
    review: "李老师的分析很到位，给了我新的视角。",
    summary: "分析了压力来源，制定了压力管理计划。",
    hasReport: true,
  },
]

const mockCancelled = [
  {
    id: "6",
    counselor: {
      name: "张心理咨询师",
      avatar: "/images/counselor-zhang.png",
      title: "国家二级心理咨询师",
    },
    date: "2025-05-15",
    time: "14:00 - 15:00",
    type: "视频咨询",
    status: "已取消",
    topic: "情绪管理",
    cancelReason: "临时有事，已重新预约",
    cancelDate: "2025-05-14",
  },
]

const typeIcons: Record<string, React.ReactNode> = {
  视频咨询: <Video className="h-4 w-4" />,
  语音咨询: <Phone className="h-4 w-4" />,
  文字咨询: <MessageSquare className="h-4 w-4" />,
}

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

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
          <h1 className="text-xl font-bold text-blue-600">咨询记录</h1>
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
                  <p className="text-sm text-gray-600">待开始</p>
                  <p className="text-2xl font-bold text-blue-600">{mockUpcoming.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">已完成</p>
                  <p className="text-2xl font-bold text-green-600">{mockCompleted.length}</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">咨询时长</p>
                  <p className="text-2xl font-bold text-purple-600">{mockCompleted.length}小时</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border-0 shadow-sm">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              待开始 ({mockUpcoming.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
            >
              已完成 ({mockCompleted.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-gray-50 data-[state=active]:text-gray-600">
              已取消 ({mockCancelled.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Consultations */}
          <TabsContent value="upcoming" className="mt-4">
            <div className="space-y-4">
              {mockUpcoming.map((consultation) => (
                <Card key={consultation.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Counselor Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-16 w-16 border-2 border-blue-100">
                          <AvatarImage src={consultation.counselor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-50 text-blue-600">
                            {consultation.counselor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{consultation.counselor.name}</h3>
                          <p className="text-sm text-gray-600">{consultation.counselor.title}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                              {typeIcons[consultation.type]}
                              <span className="ml-1">{consultation.type}</span>
                            </Badge>
                            <Badge className="bg-green-50 text-green-600 border-green-200">{consultation.status}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Consultation Details */}
                      <div className="flex flex-col gap-2 md:w-64">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{consultation.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{consultation.time}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">主题：</span>
                          <span className="font-medium text-gray-800">{consultation.topic}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {consultation.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">备注信息：</p>
                        <p className="text-sm text-gray-700">{consultation.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">进入咨询室</Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        修改预约
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                      >
                        取消预约
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Completed Consultations */}
          <TabsContent value="completed" className="mt-4">
            <div className="space-y-4">
              {mockCompleted.map((consultation) => (
                <Card key={consultation.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Counselor Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-16 w-16 border-2 border-green-100">
                          <AvatarImage src={consultation.counselor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-green-50 text-green-600">
                            {consultation.counselor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{consultation.counselor.name}</h3>
                          <p className="text-sm text-gray-600">{consultation.counselor.title}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-green-50 text-green-600 border-green-200">{consultation.status}</Badge>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < consultation.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Consultation Details */}
                      <div className="flex flex-col gap-2 md:w-64">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{consultation.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {typeIcons[consultation.type]}
                          <span>{consultation.type}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">主题：</span>
                          <span className="font-medium text-gray-800">{consultation.topic}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    {consultation.summary && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-600 font-medium mb-1">咨询总结：</p>
                        <p className="text-sm text-gray-700">{consultation.summary}</p>
                      </div>
                    )}

                    {/* Review */}
                    {consultation.review && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-xs text-green-600 font-medium mb-1">我的评价：</p>
                        <p className="text-sm text-gray-700">{consultation.review}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                      {consultation.hasReport && (
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          下载报告
                        </Button>
                      )}
                      <Button variant="outline" className="flex-1 bg-transparent">
                        再次预约
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        <Link
                          href={`/psychological-consultation/${consultation.counselor.name.replace(/老师|咨询师|医生/, "")}`}
                        >
                          查看详情
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cancelled Consultations */}
          <TabsContent value="cancelled" className="mt-4">
            <div className="space-y-4">
              {mockCancelled.map((consultation) => (
                <Card key={consultation.id} className="bg-white border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Counselor Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-16 w-16 border-2 border-gray-200 opacity-60">
                          <AvatarImage src={consultation.counselor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gray-50 text-gray-600">
                            {consultation.counselor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{consultation.counselor.name}</h3>
                          <p className="text-sm text-gray-600">{consultation.counselor.title}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-gray-100 text-gray-600 border-gray-200">{consultation.status}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Consultation Details */}
                      <div className="flex flex-col gap-2 md:w-64">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{consultation.date}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">主题：</span>
                          <span className="font-medium text-gray-800">{consultation.topic}</span>
                        </div>
                      </div>
                    </div>

                    {/* Cancel Reason */}
                    {consultation.cancelReason && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">取消原因：</p>
                        <p className="text-sm text-gray-700">{consultation.cancelReason}</p>
                        <p className="text-xs text-gray-500 mt-2">取消时间：{consultation.cancelDate}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">重新预约</Button>
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
