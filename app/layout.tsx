import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { XinyuAIFloatingBall } from "@/components/xinyu-ai-floating-ball"

export const metadata: Metadata = {
  title: "心愈 - 心理健康与情绪管理平台",
  description: "陕西心愈科技有限公司 - 专业的心理健康与情绪管理平台，提供心灵漂流瓶、树洞倾诉、专业心理咨询等服务",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <XinyuAIFloatingBall />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
