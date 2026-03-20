"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, X, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const predefinedTags = ["工作", "学习", "运动", "社交", "娱乐", "家庭", "休息", "旅行", "购物", "美食"]
const predefinedActivities = ["工作", "学习", "运动", "阅读", "散步", "聚餐", "看电影", "听音乐", "冥想", "购物"]

export default function QuickMoodEditPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showMoodDialog, setShowMoodDialog] = useState(true)
  
  // 表单状态
  const [mood, setMood] = useState("")
  const [level, setLevel] = useState("")
  const [note, setNote] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")
  const [activities, setActivities] = useState<string[]>([])
  const [customActivity, setCustomActivity] = useState("")
  const [weather, setWeather] = useState("")
  const [energy, setEnergy] = useState("")
  const [sleep, setSleep] = useState("")
  const [stress, setStress] = useState("")
  const [gratitude, setGratitude] = useState("")

  useEffect(() => {
    // 页面加载后自动显示对话框
    setShowMoodDialog(true)
  }, [])

  const handleSave = () => {
    // 验证必填字段
    if (!mood || !level) {
      toast({
        title: "保存失败",
        description: "请选择心情状态和心情指数",
        variant: "destructive"
      })
      return
    }

    // 构建保存的数据
    const moodData = {
      mood,
      level: Number(level),
      note: note.trim(),
      tags,
      activities,
      weather,
      energy: energy ? Number(energy) : 3,
      sleep: sleep ? Number(sleep) : 8,
      stress: stress ? Number(stress) : 3,
      gratitude: gratitude.trim(),
      photos: [`/images/mood-${mood === "开心" ? "happy" : mood === "平静" ? "calm" : mood === "焦虑" ? "anxious" : mood === "疲惫" ? "tired" : "confused"}.png`]
    }

    // 这里应该调用API保存数据，现在只是模拟保存
    console.log("保存心情数据:", moodData)
    
    toast({
      title: "保存成功",
      description: "今日心情已记录",
    })
    
    // 保存后返回首页
    setTimeout(() => {
      router.push("/")
    }, 1000)
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
    <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
      {/* 简单的头部 */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center">
          <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-700">
            <Link href="/">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">返回首页</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-gray-600 ml-4">记录今日心情</h1>
        </div>
      </header>

      {/* 主体内容 - 直接显示心情编辑表单 */}
      <main className="container mx-auto flex-1 p-4 md:p-6">
        <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-sm">
            <DialogHeader>
              <DialogTitle className="text-gray-600 text-center">今天感觉怎么样？</DialogTitle>
              <DialogDescription className="text-gray-500 text-center">快速记录您的今日心情</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* 心情状态选择 - 大图标网格布局 */}
              <div>
                <Label className="text-gray-600 mb-3 block text-center font-medium">选择您的心情</Label>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { value: "开心", emoji: "😊", label: "开心" },
                    { value: "平静", emoji: "😌", label: "平静" },
                    { value: "焦虑", emoji: "😰", label: "焦虑" },
                    { value: "沮丧", emoji: "😢", label: "沮丧" },
                    { value: "兴奋", emoji: "🤩", label: "兴奋" },
                    { value: "疲惫", emoji: "😴", label: "疲惫" },
                    { value: "愤怒", emoji: "😠", label: "愤怒" },
                    { value: "困惑", emoji: "😕", label: "困惑" }
                  ].map((item) => (
                    <Button
                      key={item.value}
                      variant={mood === item.value ? "default" : "outline"}
                      className={`flex flex-col items-center justify-center p-4 h-28 ${mood === item.value ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                      onClick={() => setMood(item.value)}
                    >
                      <span className="text-3xl mb-2">{item.emoji}</span>
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* 心情指数 */}
              {mood && (
                <div>
                  <Label className="text-gray-600 mb-2 block">心情指数 (1-5)</Label>
                  <div className="flex items-center justify-between">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        variant={level === num.toString() ? "default" : "outline"}
                        className={`w-16 py-3 ${level === num.toString() ? "bg-blue-500 text-white" : "text-gray-600"}`}
                        onClick={() => setLevel(num.toString())}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>很糟糕</span>
                    <span>很好</span>
                  </div>
                </div>
              )}

              {/* 简短记录 */}
              <div>
                <Label htmlFor="note" className="text-gray-600 mb-2 block">
                  简短记录
                </Label>
                <Textarea
                  id="note"
                  placeholder="今天发生了什么让您有这样的心情？"
                  className="text-gray-600 min-h-[100px]"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* 天气状况 */}
              <div>
                <Label htmlFor="weather" className="text-gray-600 mb-2 block">
                  今日天气
                </Label>
                <Select value={weather} onValueChange={setWeather}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择天气" className="text-gray-600" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="晴天" className="text-gray-600">☀️ 晴天</SelectItem>
                    <SelectItem value="多云" className="text-gray-600">⛅ 多云</SelectItem>
                    <SelectItem value="阴天" className="text-gray-600">☁️ 阴天</SelectItem>
                    <SelectItem value="雨天" className="text-gray-600">🌧️ 雨天</SelectItem>
                    <SelectItem value="雪天" className="text-gray-600">❄️ 雪天</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 可选的详细信息 - 默认折叠但可以展开 */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-600 mb-3">详细信息（可选）</h3>
                
                {/* 情绪标签 */}
                <div className="mb-4">
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
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => router.push("/")} className="text-gray-600">
                取消
              </Button>
              <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">
                保存记录
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}