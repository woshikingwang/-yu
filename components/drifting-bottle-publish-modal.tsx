"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Mic, Send, Sparkles, Image as ImageIcon, Music } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DriftingBottlePublishModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bottleType?: "normal" | "beautiful"
}

const beautifulBottleTemplates = [
  { id: 1, name: "星空", image: "/images/bottle-stars.jpg", color: "from-indigo-400 to-purple-600" },
  { id: 2, name: "海洋", image: "/images/bottle-ocean.jpg", color: "from-cyan-400 to-blue-600" },
  { id: 3, name: "日落", image: "/images/bottle-sunset.jpg", color: "from-orange-400 to-pink-500" },
  { id: 4, name: "森林", image: "/images/bottle-forest.jpg", color: "from-green-400 to-emerald-600" },
  { id: 5, name: "樱花", image: "/images/bottle-sakura.jpg", color: "from-pink-300 to-rose-500" },
  { id: 6, name: "极光", image: "/images/bottle-aurora.jpg", color: "from-teal-400 to-cyan-600" },
]

export default function DriftingBottlePublishModal({ open, onOpenChange, bottleType = "normal" }: DriftingBottlePublishModalProps) {
  const [publishType, setPublishType] = useState("anonymous")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement actual submission logic here
    alert(bottleType === "beautiful" ? "漂亮瓶发布成功！" : "漂流瓶发布成功！")
    setContent("")
    setTitle("")
    setSelectedTemplate(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {bottleType === "beautiful" ? (
              <>
                <Sparkles className="h-5 w-5 text-pink-500" />
                发布漂亮瓶
              </>
            ) : (
              "发布漂流瓶"
            )}
          </DialogTitle>
          <DialogDescription>
            {bottleType === "beautiful"
              ? "选择精美模板，让你的瓶子更加独特"
              : "分享你的心情或困惑，让它随风漂流"}
          </DialogDescription>
        </DialogHeader>

        {bottleType === "beautiful" && (
          <div className="space-y-3">
            <Label>选择瓶身模板</Label>
            <div className="grid grid-cols-3 gap-2">
              {beautifulBottleTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? "ring-4 ring-primary ring-offset-2 scale-105"
                      : "hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                    <Sparkles className="h-8 w-8 text-white/80" />
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-1 right-1">
                      <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-primary">
                        ✓
                      </Badge>
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-white font-medium drop-shadow">
                    {template.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          {/* Title for beautiful bottle */}
          {bottleType === "beautiful" && (
            <div className="space-y-2">
              <Label htmlFor="title">标题 (选填)</Label>
              <Input
                id="title"
                placeholder="给你的瓶子起个名字..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={30}
              />
            </div>
          )}

          {/* Anonymous or Real-name selection */}
          <div className="space-y-2">
            <Label>发布方式</Label>
            <RadioGroup defaultValue="anonymous" onValueChange={setPublishType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anonymous" id="anonymous" />
                <Label htmlFor="anonymous" className="cursor-pointer">匿名发布</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="real-name" id="real-name" />
                <Label htmlFor="real-name" className="cursor-pointer">实名发布</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <Label htmlFor="content">
              文字内容 {bottleType === "beautiful" && <span className="text-muted-foreground text-xs">(必填)</span>}
            </Label>
            <Textarea
              id="content"
              placeholder={bottleType === "beautiful" ? "写下你的故事..." : "写下你的心情或想说的话..."}
              className="min-h-[120px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required={bottleType === "beautiful"}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">{content.length}/500</p>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>上传图片 {bottleType === "beautiful" && <span className="text-muted-foreground text-xs">(可选，最多3张)</span>}</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">点击或拖拽图片到这里</p>
                <p className="text-xs text-muted-foreground">支持 JPG、PNG 格式</p>
              </div>
              <Input id="images" type="file" multiple accept="image/*" className="hidden" />
            </div>
          </div>

          {/* Voice Upload/Record */}
          <div className="space-y-2">
            <Label>录制语音 {bottleType === "beautiful" && <span className="text-muted-foreground text-xs">(可选)</span>}</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" className="flex-1 gap-2">
                <Mic className="h-4 w-4" />
                点击录音
              </Button>
              <Button type="button" variant="outline" className="flex-1 gap-2">
                <Music className="h-4 w-4" />
                上传语音
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">支持 MP3、WAV 格式，每段最长60秒</p>
          </div>

          {/* Options */}
          {bottleType === "beautiful" && (
            <div className="flex items-center space-x-2">
              <Checkbox id="ai-summary" />
              <label
                htmlFor="ai-summary"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                生成AI心情总结
              </label>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              {bottleType === "beautiful" ? "发布漂亮瓶" : "发布"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
