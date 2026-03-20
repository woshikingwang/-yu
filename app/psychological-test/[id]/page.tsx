"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PsychologicalTestDetailPage() {
  const params = useParams()
  const id = params?.id as string

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-background">
      <p className="text-muted-foreground">测试详情页（id: {id}）即将开放</p>
      <Button asChild variant="outline">
        <Link href="/psychological-test" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          返回心理测试
        </Link>
      </Button>
    </div>
  )
}
