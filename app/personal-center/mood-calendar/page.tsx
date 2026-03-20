"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Smile,
  Frown,
  Meh,
  Plus,
  Edit,
  Share,
  Download,
  Bell,
  BarChart3,
  CalendarIcon,
  Heart,
  Brain,
  Sun,
  Cloud,
  CloudRain,
  X,
  Check,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 扩展的心情数据
const mockMoodData: Record<string, any> = {
  "2025-06-07": {
    mood: "开心",
    level: 4,
    note: "今天工作顺利，心情不错。和同事一起完成了一个重要项目，感觉很有成就感。",
    tags: ["工作顺利", "团队合作", "成就感"],
    weather: "晴天",
    activities: ["工作", "团队会议", "项目完成"],
    energy: 4,
    sleep: 8,
    stress: 2,
    gratitude: "感谢团队的支持和帮助",
    photos: ["/images/mood-happy.png"],
  },
  "2025-06-06": {
    mood: "平静",
    level: 3,
    note: "普通的一天，没有什么特别的事情发生。",
    tags: ["平常", "安静"],
    weather: "多云",
    activities: ["阅读", "散步", "看电影"],
    energy: 3,
    sleep: 7,
    stress: 2,
    gratitude: "感谢平静的一天",
    photos: ["/images/mood-calm.png"],
  },
  "2025-06-05": {
    mood: "焦虑",
    level: 2,
    note: "工作压力有点大，明天有重要的presentation，感觉有些紧张。",
    tags: ["工作压力", "紧张", "presentation"],
    weather: "阴天",
    activities: ["加班", "准备演示", "练习"],
    energy: 2,
    sleep: 6,
    stress: 4,
    gratitude: "感谢同事的鼓励",
    photos: ["/images/mood-anxious.png"],
  },
  "2025-06-04": {
    mood: "兴奋",
    level: 5,
    note: "和朋友聚餐很开心，聊了很多有趣的话题，感觉充满活力。",
    tags: ["朋友聚会", "开心", "充满活力"],
    weather: "晴天",
    activities: ["聚餐", "聊天", "购物"],
    energy: 5,
    sleep: 7,
    stress: 1,
    gratitude: "感谢朋友们的陪伴",
    photos: ["/images/mood-excited.png"],
  },
  "2025-06-03": {
    mood: "沮丧",
    level: 1,
    note: "遇到了一些挫折，项目被推迟了，感觉有些失落。",
    tags: ["挫折", "失落", "项目推迟"],
    weather: "雨天",
    activities: ["工作", "思考", "独处"],
    energy: 2,
    sleep: 6,
    stress: 4,
    gratitude: "感谢家人的理解",
    photos: ["/images/mood-sad.png"],
  },
  "2025-06-02": {
    mood: "疲惫",
    level: 2,
    note: "周末休息，但还是感觉很累，需要好好调整状态。",
    tags: ["疲惫", "休息", "调整"],
    weather: "多云",
    activities: ["休息", "睡觉", "轻松活动"],
    energy: 2,
    sleep: 9,
    stress: 2,
    gratitude: "感谢能有休息的时间",
    photos: ["/images/mood-tired.png"],
  },
  "2025-06-01": {
    mood: "开心",
    level: 4,
    note: "新的一个月开始，制定了新的目标，感觉充满希望。",
    tags: ["新开始", "目标", "希望"],
    weather: "晴天",
    activities: ["计划", "目标设定", "运动"],
    energy: 4,
    sleep: 8,
    stress: 2,
    gratitude: "感谢新的开始",
    photos: ["/images/mood-happy.png"],
  },
}

const moodColors = {
  开心: "bg-green-50 text-green-700",
  平静: "bg-blue-50 text-blue-700",
  焦虑: "bg-amber-50 text-amber-700",
  沮丧: "bg-red-50 text-red-700",
  兴奋: "bg-green-50 text-green-700",
  疲惫: "bg-blue-50 text-blue-700",
  愤怒: "bg-amber-50 text-amber-700",
  困惑: "bg-blue-50 text-blue-700",
}

const moodIcons = {
  开心: <Smile className="h-4 w-4" />,
  平静: <Meh className="h-4 w-4" />,
  焦虑: <Frown className="h-4 w-4" />,
  沮丧: <Frown className="h-4 w-4" />,
  兴奋: <Smile className="h-4 w-4" />,
  疲惫: <Meh className="h-4 w-4" />,
  愤怒: <Frown className="h-4 w-4" />,
  困惑: <Meh className="h-4 w-4" />,
}

const weatherIcons = {
  晴天: <Sun className="h-4 w-4 text-gray-500" />,
  多云: <Cloud className="h-4 w-4 text-gray-500" />,
  阴天: <Cloud className="h-4 w-4 text-gray-600" />,
  雨天: <CloudRain className="h-4 w-4 text-gray-500" />,
}

const predefinedTags = ["工作", "学习", "运动", "社交", "娱乐", "家庭", "休息", "旅行", "购物", "美食"]
const predefinedActivities = ["工作", "学习", "运动", "阅读", "散步", "聚餐", "看电影", "听音乐", "冥想", "购物"]

export default function MoodCalendarPage() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState("calendar")
  const [showAddMood, setShowAddMood] = useState(false)
  const [showEditMood, setShowEditMood] = useState(false)
  const [moodDataState, setMoodDataState] = useState(mockMoodData)

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const selectedDateData = selectedDate ? moodDataState[formatDate(selectedDate)] : null

  const getMoodStats = () => {
    const moods = Object.values(moodDataState)
    const avgLevel = moods.reduce((sum, mood) => sum + mood.level, 0) / moods.length
    const avgEnergy = moods.reduce((sum, mood) => sum + mood.energy, 0) / moods.length
    const avgSleep = moods.reduce((sum, mood) => sum + mood.sleep, 0) / moods.length
    const avgStress = moods.reduce((sum, mood) => sum + mood.stress, 0) / moods.length

    const moodCounts = moods.reduce(
      (acc, mood) => {
        acc[mood.mood] = (acc[mood.mood] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const dominantMood = Object.entries(moodCounts).reduce((a, b) => (moodCounts[a[0]] > moodCounts[b[0]] ? a : b))[0]

    return { avgLevel, avgEnergy, avgSleep, avgStress, dominantMood, moodCounts }
  }

  const stats = getMoodStats()

  const getMoodTrend = () => {
    const recentMoods = Object.entries(moodDataState)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-7)
      .map(([, data]) => data.level)

    if (recentMoods.length < 2) return "stable"

    const trend = recentMoods[recentMoods.length - 1] - recentMoods[0]
    if (trend > 0.5) return "improving"
    if (trend < -0.5) return "declining"
    return "stable"
  }

  const moodTrend = getMoodTrend()

  const handleAddMood = (data: any) => {
    const dateStr = formatDate(selectedDate || new Date())
    setMoodDataState({
      ...moodDataState,
      [dateStr]: data,
    })
    setShowAddMood(false)
    toast({
      title: "添加成功",
      description: "心情记录已保存",
    })
  }

  const handleEditMood = (data: any) => {
    const dateStr = formatDate(selectedDate || new Date())
    setMoodDataState({
      ...moodDataState,
      [dateStr]: data,
    })
    setShowEditMood(false)
    toast({
      title: "更新成功",
      description: "心情记录已更新",
    })
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
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="心愈 Logo" className="h-10 w-auto" />
            <h1 className="text-xl font-bold text-gray-600">心情日历</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Bell className="h-4 w-4 mr-1" />
              提醒
            </Button>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="calendar">日历</SelectItem>
                <SelectItem value="list">列表</SelectItem>
                <SelectItem value="chart">图表</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 space-y-6 p-4 md:p-6">
        {/* 心情统计概览 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.avgLevel.toFixed(1)}</div>
              <p className="text-sm text-gray-500">平均心情指数</p>
              <div className="flex items-center justify-center mt-1">
                {moodTrend === "improving" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : moodTrend === "stable" ? (
                  <Minus className="h-4 w-4 text-gray-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className="text-xs ml-1 text-gray-500">
                  {moodTrend === "improving" ? "上升" : moodTrend === "stable" ? "稳定" : "下降"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                {moodIcons[stats.dominantMood]}
                <span className="text-lg font-bold text-gray-600">{stats.dominantMood}</span>
              </div>
              <p className="text-sm text-gray-500">主要心情</p>
              <p className="text-xs text-gray-500 mt-1">{stats.moodCounts[stats.dominantMood]}天</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.avgEnergy.toFixed(1)}</div>
              <p className="text-sm text-gray-500">平均精力值</p>
              <Progress value={stats.avgEnergy * 20} className="mt-2 h-2 bg-blue-200" />
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{Object.keys(moodDataState).length}</div>
              <p className="text-sm text-gray-500">记录天数</p>
              <p className="text-xs text-gray-500 mt-1">本月</p>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容区域 */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar" className="bg-white border-0 shadow-sm">
              <CalendarIcon className="h-4 w-4 mr-1 text-gray-600" />
              日历视图
            </TabsTrigger>
            <TabsTrigger value="list" className="bg-white border-0 shadow-sm">
              列表视图
            </TabsTrigger>
            <TabsTrigger value="chart" className="bg-white border-0 shadow-sm">
              <BarChart3 className="h-4 w-4 mr-1 text-gray-600" />
              图表分析
            </TabsTrigger>
          </TabsList>

          {/* 日历视图 */}
          <TabsContent value="calendar" className="space-y-6 bg-white border-0 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* 日历 */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-600">心情日历</CardTitle>
                    <Dialog open={showAddMood} onOpenChange={setShowAddMood}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                          <Plus className="h-4 w-4 mr-1" />
                          添加记录
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-sm">
                        <DialogHeader>
                          <DialogTitle className="text-gray-600">添加心情记录</DialogTitle>
                          <DialogDescription className="text-gray-500">记录今天的心情和感受</DialogDescription>
                        </DialogHeader>
                        <AddMoodForm
                          selectedDate={selectedDate || new Date()}
                          onSave={handleAddMood}
                          onClose={() => setShowAddMood(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardDescription className="text-gray-500">点击日期查看详细记录</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      mood: (date) => {
                        const dateStr = formatDate(date)
                        return dateStr in moodDataState
                      },
                    }}
                    modifiersStyles={{
                      mood: {
                        backgroundColor: "#9b8cc6",
                        color: "white",
                        borderRadius: "50%",
                      },
                    }}
                  />
                </CardContent>
              </Card>

              {/* 选中日期详情 */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-600">
                      {selectedDate ? `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日` : "选择日期"}
                    </CardTitle>
                    {selectedDateData && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowEditMood(true)}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-gray-500">查看当日心情记录</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDateData ? (
                    <div className="space-y-4">
                      {/* 心情和图片 */}
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedDateData.photos[0] || "/placeholder.svg"}
                          alt={selectedDateData.mood}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {moodIcons[selectedDateData.mood]}
                            <Badge className={moodColors[selectedDateData.mood]}>{selectedDateData.mood}</Badge>
                            <span className="text-sm text-gray-500">心情指数: {selectedDateData.level}/5</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {weatherIcons[selectedDateData.weather]}
                            <span>{selectedDateData.weather}</span>
                          </div>
                        </div>
                      </div>

                      {/* 详细数据 */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-gray-600">{selectedDateData.energy}/5</div>
                          <div className="text-gray-500">精力值</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-600">{selectedDateData.sleep}h</div>
                          <div className="text-gray-500">睡眠时长</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-600">{selectedDateData.stress}/5</div>
                          <div className="text-gray-500">压力值</div>
                        </div>
                      </div>

                      {/* 标签 */}
                      <div>
                        <h4 className="font-medium mb-2 text-gray-600">情绪标签</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedDateData.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-gray-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 活动 */}
                      <div>
                        <h4 className="font-medium mb-2 text-gray-600">今日活动</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedDateData.activities.map((activity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs text-gray-600">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 心情记录 */}
                      <div>
                        <h4 className="font-medium mb-2 text-gray-600">心情记录</h4>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDateData.note}</p>
                      </div>

                      {/* 感恩记录 */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-1 text-gray-600">
                          <Heart className="h-4 w-4 text-red-500" />
                          感恩记录
                        </h4>
                        <p className="text-sm text-gray-700 bg-red-50 p-3 rounded-lg">{selectedDateData.gratitude}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">当日暂无心情记录</p>
                      <Button
                        size="sm"
                        onClick={() => setShowAddMood(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        添加记录
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 列表视图 */}
          <TabsContent value="list" className="space-y-4 bg-white border-0 shadow-sm">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-600">心情记录列表</CardTitle>
                <CardDescription className="text-gray-500">按时间顺序查看所有记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(moodDataState)
                    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                    .map(([date, data]) => (
                      <div
                        key={date}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={data.photos[0] || "/placeholder.svg"}
                          alt={data.mood}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-600">
                                {new Date(date).toLocaleDateString("zh-CN")}
                              </span>
                              <Badge className={`text-xs ${moodColors[data.mood]}`}>{data.mood}</Badge>
                              {weatherIcons[data.weather]}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>心情: {data.level}/5</span>
                              <span>精力: {data.energy}/5</span>
                              <span>压力: {data.stress}/5</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2 mb-2">{data.note}</p>
                          <div className="flex flex-wrap gap-1">
                            {data.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-gray-600">
                                {tag}
                              </Badge>
                            ))}
                            {data.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs text-gray-600">
                                +{data.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 图表分析 */}
          <TabsContent value="chart" className="space-y-6 bg-white border-0 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* 心情趋势图 */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-600">心情趋势分析</CardTitle>
                  <CardDescription className="text-gray-500">最近7天的心情变化趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2 p-4 bg-gray-50 rounded-lg">
                    {Object.entries(moodDataState)
                      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                      .slice(-7)
                      .map(([date, data], index) => (
                        <div key={date} className="flex flex-col items-center gap-2">
                          <div
                            className="bg-blue-500 rounded-t-md w-8 transition-all hover:bg-blue-600"
                            style={{ height: `${(data.level / 5) * 200}px` }}
                          />
                          <div className="text-xs text-gray-600 text-center">
                            <div>{new Date(date).getDate()}日</div>
                            <div className="text-xs">{data.mood}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* 心情分布 */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-600">心情分布统计</CardTitle>
                  <CardDescription className="text-gray-500">各种心情状态的分布情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stats.moodCounts)
                      .sort(([, a], [, b]) => b - a)
                      .map(([mood, count]) => (
                        <div key={mood} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {moodIcons[mood]}
                            <span className="text-sm font-medium text-gray-600">{mood}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress
                              value={(count / Object.keys(moodDataState).length) * 100}
                              className="w-24 h-2 bg-blue-200"
                            />
                            <span className="text-sm text-gray-500 w-8">{count}天</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* 生活指标 */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-600">生活指标分析</CardTitle>
                  <CardDescription className="text-gray-500">睡眠、精力、压力等指标的平均值</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">睡眠质量</span>
                      <div className="flex items-center gap-3">
                        <Progress value={(stats.avgSleep / 10) * 100} className="w-24 h-2 bg-blue-200" />
                        <span className="text-sm text-gray-500 w-12">{stats.avgSleep.toFixed(1)}h</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">精力水平</span>
                      <div className="flex items-center gap-3">
                        <Progress value={stats.avgEnergy * 20} className="w-24 h-2 bg-blue-200" />
                        <span className="text-sm text-gray-500 w-12">{stats.avgEnergy.toFixed(1)}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">压力水平</span>
                      <div className="flex items-center gap-3">
                        <Progress value={stats.avgStress * 20} className="w-24 h-2 bg-blue-200 [&>div]:bg-red-500" />
                        <span className="text-sm text-gray-500 w-12">{stats.avgStress.toFixed(1)}/5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI 建议 */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-600">
                    <Brain className="h-5 w-5 text-blue-500" />
                    AI 心情分析
                  </CardTitle>
                  <CardDescription className="text-gray-500">基于您的心情记录生成的个性化建议</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-600 mb-2">整体评估</h4>
                      <p className="text-sm text-blue-700">
                        {stats.avgLevel >= 3.5
                          ? "您的整体心情状态良好，继续保持积极的生活态度！"
                          : stats.avgLevel >= 2.5
                            ? "您的心情状态一般，建议多参与一些让您开心的活动。"
                            : "您最近的心情状态需要关注，建议寻求专业心理咨询师的帮助。"}
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-600 mb-2">改善建议</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 保持规律的睡眠时间，建议每晚7-8小时</li>
                        <li>• 适当运动可以提升心情和精力水平</li>
                        <li>• 学习压力管理技巧，如冥想和深呼吸</li>
                        <li>• 多与朋友家人交流，分享您的感受</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-600 mb-2">推荐活动</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-purple-700 border-purple-300">
                          户外散步
                        </Badge>
                        <Badge variant="outline" className="text-purple-700 border-purple-300">
                          听音乐
                        </Badge>
                        <Badge variant="outline" className="text-purple-700 border-purple-300">
                          阅读
                        </Badge>
                        <Badge variant="outline" className="text-purple-700 border-purple-300">
                          冥想
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 快捷操作 */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-600">快捷操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Download className="h-4 w-4 mr-1" />
                导出数据
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Share className="h-4 w-4 mr-1" />
                分享心情
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Bell className="h-4 w-4 mr-1" />
                设置提醒
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <BarChart3 className="h-4 w-4 mr-1" />
                生成报告
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* 编辑心情对话框 */}
      <Dialog open={showEditMood} onOpenChange={setShowEditMood}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-sm">
          <DialogHeader>
            <DialogTitle className="text-gray-600">编辑心情记录</DialogTitle>
            <DialogDescription className="text-gray-500">修改选中日期的心情记录</DialogDescription>
          </DialogHeader>
          {selectedDateData && (
            <EditMoodForm
              selectedDate={selectedDate || new Date()}
              initialData={selectedDateData}
              onSave={handleEditMood}
              onClose={() => setShowEditMood(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// 添加心情表单组件
function AddMoodForm({
  selectedDate,
  onSave,
  onClose,
}: {
  selectedDate: Date
  onSave: (data: any) => void
  onClose: () => void
}) {
  const [mood, setMood] = useState("开心")
  const [level, setLevel] = useState("3")
  const [note, setNote] = useState("")
  const [energy, setEnergy] = useState("3")
  const [sleep, setSleep] = useState("7")
  const [stress, setStress] = useState("3")
  const [weather, setWeather] = useState("晴天")
  const [gratitude, setGratitude] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")
  const [customActivity, setCustomActivity] = useState("")

  const handleSubmit = () => {
    if (!note.trim()) {
      alert("请填写心情记录")
      return
    }

    const data = {
      mood,
      level: Number.parseInt(level),
      note: note.trim(),
      tags,
      weather,
      activities,
      energy: Number.parseInt(energy),
      sleep: Number.parseInt(sleep),
      stress: Number.parseInt(stress),
      gratitude: gratitude.trim(),
      photos: [
        mood === "开心"
          ? "/images/mood-happy.png"
          : mood === "平静"
            ? "/images/mood-calm.png"
            : mood === "焦虑"
              ? "/images/mood-anxious.png"
              : mood === "沮丧"
                ? "/images/mood-sad.png"
                : mood === "兴奋"
                  ? "/images/mood-excited.png"
                  : "/images/mood-tired.png",
      ],
    }

    onSave(data)
  }

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag))
    } else {
      setTags([...tags, tag])
    }
  }

  const addCustomTag = () => {
    if (customTag.trim() && !tags.includes(customTag.trim())) {
      setTags([...tags, customTag.trim()])
      setCustomTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const toggleActivity = (activity: string) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter((a) => a !== activity))
    } else {
      setActivities([...activities, activity])
    }
  }

  const addCustomActivity = () => {
    if (customActivity.trim() && !activities.includes(customActivity.trim())) {
      setActivities([...activities, customActivity.trim()])
      setCustomActivity("")
    }
  }

  const removeActivity = (activity: string) => {
    setActivities(activities.filter((a) => a !== activity))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="mood" className="text-gray-600">
            心情状态 *
          </Label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger>
              <SelectValue placeholder="选择心情" className="text-gray-600" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="开心" className="text-gray-600">
                😊 开心
              </SelectItem>
              <SelectItem value="平静" className="text-gray-600">
                😌 平静
              </SelectItem>
              <SelectItem value="焦虑" className="text-gray-600">
                😰 焦虑
              </SelectItem>
              <SelectItem value="沮丧" className="text-gray-600">
                😢 沮丧
              </SelectItem>
              <SelectItem value="兴奋" className="text-gray-600">
                🤩 兴奋
              </SelectItem>
              <SelectItem value="疲惫" className="text-gray-600">
                😴 疲惫
              </SelectItem>
              <SelectItem value="愤怒" className="text-gray-600">
                😠 愤怒
              </SelectItem>
              <SelectItem value="困惑" className="text-gray-600">
                😕 困惑
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="level" className="text-gray-600">
            心情指数 (1-5) *
          </Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="选择指数" className="text-gray-600" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="1" className="text-gray-600">
                1 - 很糟糕
              </SelectItem>
              <SelectItem value="2" className="text-gray-600">
                2 - 不太好
              </SelectItem>
              <SelectItem value="3" className="text-gray-600">
                3 - 一般
              </SelectItem>
              <SelectItem value="4" className="text-gray-600">
                4 - 不错
              </SelectItem>
              <SelectItem value="5" className="text-gray-600">
                5 - 很棒
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="weather" className="text-gray-600">
          今日天气
        </Label>
        <Select value={weather} onValueChange={setWeather}>
          <SelectTrigger>
            <SelectValue placeholder="选择天气" className="text-gray-600" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="晴天" className="text-gray-600">
              ☀️ 晴天
            </SelectItem>
            <SelectItem value="多云" className="text-gray-600">
              ☁️ 多云
            </SelectItem>
            <SelectItem value="阴天" className="text-gray-600">
              🌥️ 阴天
            </SelectItem>
            <SelectItem value="雨天" className="text-gray-600">
              🌧️ 雨天
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="note" className="text-gray-600">
          心情记录 *
        </Label>
        <Textarea
          placeholder="今天有什么特别的事情吗？记录下你的心情和感受吧！"
          className="text-gray-600 min-h-[100px]"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div>
        <Label className="text-gray-600 mb-2 block">情绪标签</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {predefinedTags.map((tag) => (
            <Badge
              key={tag}
              variant={tags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer ${tags.includes(tag) ? "bg-blue-500 text-white" : "text-gray-600"}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} className="bg-blue-100 text-blue-700">
                {tag}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeTag(tag)} />
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            placeholder="添加自定义标签"
            className="text-gray-600"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCustomTag()}
          />
          <Button type="button" onClick={addCustomTag} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
            添加
          </Button>
        </div>
      </div>

      <div>
        <Label className="text-gray-600 mb-2 block">今日活动</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {predefinedActivities.map((activity) => (
            <Badge
              key={activity}
              variant={activities.includes(activity) ? "default" : "outline"}
              className={`cursor-pointer ${activities.includes(activity) ? "bg-green-500 text-white" : "text-gray-600"}`}
              onClick={() => toggleActivity(activity)}
            >
              {activity}
            </Badge>
          ))}
        </div>
        {activities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {activities.map((activity) => (
              <Badge key={activity} className="bg-green-100 text-green-700">
                {activity}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeActivity(activity)} />
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            placeholder="添加自定义活动"
            className="text-gray-600"
            value={customActivity}
            onChange={(e) => setCustomActivity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCustomActivity()}
          />
          <Button
            type="button"
            onClick={addCustomActivity}
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            添加
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="energy" className="text-gray-600">
            精力值 (1-5)
          </Label>
          <Select value={energy} onValueChange={setEnergy}>
            <SelectTrigger>
              <SelectValue placeholder="选择精力值" className="text-gray-600" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="1" className="text-gray-600">
                1
              </SelectItem>
              <SelectItem value="2" className="text-gray-600">
                2
              </SelectItem>
              <SelectItem value="3" className="text-gray-600">
                3
              </SelectItem>
              <SelectItem value="4" className="text-gray-600">
                4
              </SelectItem>
              <SelectItem value="5" className="text-gray-600">
                5
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sleep" className="text-gray-600">
            睡眠时长 (小时)
          </Label>
          <Input
            type="number"
            placeholder="睡眠了多久？"
            className="text-gray-600"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            min="0"
            max="24"
          />
        </div>
        <div>
          <Label htmlFor="stress" className="text-gray-600">
            压力值 (1-5)
          </Label>
          <Select value={stress} onValueChange={setStress}>
            <SelectTrigger>
              <SelectValue placeholder="选择压力值" className="text-gray-600" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="1" className="text-gray-600">
                1
              </SelectItem>
              <SelectItem value="2" className="text-gray-600">
                2
              </SelectItem>
              <SelectItem value="3" className="text-gray-600">
                3
              </SelectItem>
              <SelectItem value="4" className="text-gray-600">
                4
              </SelectItem>
              <SelectItem value="5" className="text-gray-600">
                5
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="gratitude" className="text-gray-600">
          感恩记录
        </Label>
        <Textarea
          placeholder="今天有什么值得感恩的事情吗？"
          className="text-gray-600"
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white"
        >
          取消
        </Button>
        <Button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Check className="h-4 w-4 mr-1" />
          保存
        </Button>
      </DialogFooter>
    </div>
  )
}

// 编辑心情表单组件
function EditMoodForm({
  selectedDate,
  initialData,
  onSave,
  onClose,
}: {
  selectedDate: Date
  initialData: any
  onSave: (data: any) => void
  onClose: () => void
}) {
  const [mood, setMood] = useState(initialData.mood)
  const [level, setLevel] = useState(String(initialData.level))
  const [note, setNote] = useState(initialData.note)
  const [energy, setEnergy] = useState(String(initialData.energy))
  const [sleep, setSleep] = useState(String(initialData.sleep))
  const [stress, setStress] = useState(String(initialData.stress))
  const [weather, setWeather] = useState(initialData.weather)
  const [gratitude, setGratitude] = useState(initialData.gratitude)
  const [tags, setTags] = useState<string[]>(initialData.tags)
  const [activities, setActivities] = useState<string[]>(initialData.activities)
  const [customTag, setCustomTag] = useState("")
  const [customActivity, setCustomActivity] = useState("")

  const handleSubmit = () => {
    if (!note.trim()) {
      alert("请填写心情记录")
      return
    }

    const data = {
      mood,
      level: Number.parseInt(level),
      note: note.trim(),
      tags,
      weather,
      activities,
      energy: Number.parseInt(energy),
      sleep: Number.parseInt(sleep),
      stress: Number.parseInt(stress),
      gratitude: gratitude.trim(),
      photos: initialData.photos,
    }

    onSave(data)
  }

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag))
    } else {
      setTags([...tags, tag])
    }
  }

  const addCustomTag = () => {
    if (customTag.trim() && !tags.includes(customTag.trim())) {
      setTags([...tags, customTag.trim()])
      setCustomTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const toggleActivity = (activity: string) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter((a) => a !== activity))
    } else {
      setActivities([...activities, activity])
    }
  }

  const addCustomActivity = () => {
    if (customActivity.trim() && !activities.includes(customActivity.trim())) {
      setActivities([...activities, customActivity.trim()])
      setCustomActivity("")
    }
  }

  const removeActivity = (activity: string) => {
    setActivities(activities.filter((a) => a !== activity))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="mood" className="text-gray-600">
            心情状态 *
          </Label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger>
              <SelectValue placeholder="选择心情" className="text-gray-600" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="开心" className="text-gray-600">
                😊 开心
              </SelectItem>
              <SelectItem value="平静" className="text-gray-600">
                😌 平静
              </SelectItem>
              <SelectItem value="焦虑" className="text-gray-600">
                😰 焦虑
              </SelectItem>
              <SelectItem value="沮丧" className="text-gray-600">
                😢 沮丧
              </SelectItem>
              <SelectItem value="兴奋" className="text-gray-600">
                🤩 兴奋
              </SelectItem>
              <SelectItem value="疲惫" className="text-gray-600">
                😴 疲惫
              </SelectItem>
              <SelectItem value="愤怒" className="text-gray-600">
                😠 愤怒
              </SelectItem>
              <SelectItem value="困惑" className="text-gray-600">
                😕 困惑
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="level" className="text-gray-600">
            心情指数 (1-5) *
          </Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="选择指数" className="text-gray-600" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="1" className="text-gray-600">
                1 - 很糟糕
              </SelectItem>
              <SelectItem value="2" className="text-gray-600">
                2 - 不太好
              </SelectItem>
              <SelectItem value="3" className="text-gray-600">
                3 - 一般
              </SelectItem>
              <SelectItem value="4" className="text-gray-600">
                4 - 不错
              </SelectItem>
              <SelectItem value="5" className="text-gray-600">
                5 - 很棒
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="weather" className="text-gray-600">
          今日天气
        </Label>
        <Select value={weather} onValueChange={setWeather}>
          <SelectTrigger>
            <SelectValue placeholder="选择天气" className="text-gray-600" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="晴天" className="text-gray-600">
              ☀️ 晴天
            </SelectItem>
            <SelectItem value="多云" className="text-gray-600">
              ☁️ 多云
            </SelectItem>
            <SelectItem value="阴天" className="text-gray-600">
              🌥️ 阴天
            </SelectItem>
            <SelectItem value="雨天" className="text-gray-600">
              🌧️ 雨天
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="note" className="text-gray-600">
          心情记录 *
        </Label>
        <Textarea
          placeholder="今天有什么特别的事情吗？记录下你的心情和感受吧！"
          className="text-gray-600 min-h-[100px]"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div>
        <Label className="text-gray-600 mb-2 block">情绪标签</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {predefinedTags.map((tag) => (
            <Badge
              key={tag}
              variant={tags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer ${tags.includes(tag) ? "bg-blue-500 text-white" : "text-gray-600"}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} className="bg-blue-100 text-blue-700">
                {tag}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeTag(tag)} />
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            placeholder="添加自定义标签"
            className="text-gray-600"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCustomTag()}
          />
          <Button type="button" onClick={addCustomTag} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
            添加
          </Button>
        </div>
      </div>

      <div>
        <Label className="text-gray-600 mb-2 block">今日活动</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {predefinedActivities.map((activity) => (
            <Badge
              key={activity}
              variant={activities.includes(activity) ? "default" : "outline"}
              className={`cursor-pointer ${activities.includes(activity) ? "bg-green-500 text-white" : "text-gray-600"}`}
              onClick={() => toggleActivity(activity)}
            >
              {activity}
            </Badge>
          ))}
        </div>
        {activities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {activities.map((activity) => (
              <Badge key={activity} className="bg-green-100 text-green-700">
                {activity}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeActivity(activity)} />
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            placeholder="添加自定义活动"
            className="text-gray-600"
            value={customActivity}
            onChange={(e) => setCustomActivity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCustomActivity()}
          />
          <Button
            type="button"
            onClick={addCustomActivity}
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            添加
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="energy" className="text-gray-600">
            精力值 (1-5)
          </Label>
          <Select value={energy} onValueChange={setEnergy}>
            <SelectTrigger>
              <SelectValue placeholder="选择精力值" className="text-gray-600" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="1" className="text-gray-600">
                1
              </SelectItem>
              <SelectItem value="2" className="text-gray-600">
                2
              </SelectItem>
              <SelectItem value="3" className="text-gray-600">
                3
              </SelectItem>
              <SelectItem value="4" className="text-gray-600">
                4
              </SelectItem>
              <SelectItem value="5" className="text-gray-600">
                5
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sleep" className="text-gray-600">
            睡眠时长 (小时)
          </Label>
          <Input
            type="number"
            placeholder="睡眠了多久？"
            className="text-gray-600"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            min="0"
            max="24"
          />
        </div>
        <div>
          <Label htmlFor="stress" className="text-gray-600">
            压力值 (1-5)
          </Label>
          <Select value={stress} onValueChange={setStress}>
            <SelectTrigger>
              <SelectValue placeholder="选择压力值" className="text-gray-600" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="1" className="text-gray-600">
                1
              </SelectItem>
              <SelectItem value="2" className="text-gray-600">
                2
              </SelectItem>
              <SelectItem value="3" className="text-gray-600">
                3
              </SelectItem>
              <SelectItem value="4" className="text-gray-600">
                4
              </SelectItem>
              <SelectItem value="5" className="text-gray-600">
                5
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="gratitude" className="text-gray-600">
          感恩记录
        </Label>
        <Textarea
          placeholder="今天有什么值得感恩的事情吗？"
          className="text-gray-600"
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white"
        >
          取消
        </Button>
        <Button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Check className="h-4 w-4 mr-1" />
          保存
        </Button>
      </DialogFooter>
    </div>
  )
}
