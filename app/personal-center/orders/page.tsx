"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Star, MessageSquare } from "lucide-react"

// Mock data for orders
const mockOrders = [
  {
    id: "20250606001",
    date: "2025-06-06",
    status: "待发货",
    statusType: "pending",
    total: 156.9,
    items: [
      {
        id: "p1",
        name: "《心理学与生活》经典版",
        image: "/images/product-psychology-book.png",
        price: 68.0,
        quantity: 1,
        category: "心理书籍",
      },
      {
        id: "p2",
        name: "冥想引导音频套装",
        image: "/images/product-meditation-audio.png",
        price: 39.9,
        quantity: 1,
        category: "冥想音频",
      },
      {
        id: "p6",
        name: "深度睡眠音乐专辑",
        image: "/images/product-sleep-music.png",
        price: 29.9,
        quantity: 1,
        category: "冥想音频",
      },
    ],
  },
  {
    id: "20250604002",
    date: "2025-06-04",
    status: "配送中",
    statusType: "shipping",
    total: 89.0,
    trackingNumber: "SF1234567890",
    items: [
      {
        id: "p4",
        name: "治愈系手工香薰蜡烛",
        image: "/images/product-candle-alt.png",
        price: 89.0,
        quantity: 1,
        category: "心灵礼品",
      },
    ],
  },
  {
    id: "20250531003",
    date: "2025-05-31",
    status: "已完成",
    statusType: "completed",
    total: 199.0,
    rating: 5,
    review: "课程内容非常实用，讲师讲解得很清晰，收获很大！",
    items: [
      {
        id: "p3",
        name: "情绪管理与压力缓解课程",
        image: "/images/product-course-emotion.png",
        price: 199.0,
        quantity: 1,
        category: "心理课程",
      },
    ],
  },
  {
    id: "20250528004",
    date: "2025-05-28",
    status: "已完成",
    statusType: "completed",
    total: 45.0,
    rating: 4,
    items: [
      {
        id: "p5",
        name: "《冥想正念练习指南》",
        image: "/images/product-meditation-book.png",
        price: 45.0,
        quantity: 1,
        category: "心理书籍",
      },
    ],
  },
  {
    id: "20250520005",
    date: "2025-05-20",
    status: "已取消",
    statusType: "cancelled",
    total: 68.0,
    cancelReason: "选错商品，已重新下单",
    items: [
      {
        id: "p1",
        name: "《心理学与生活》经典版",
        image: "/images/product-psychology-book.png",
        price: 68.0,
        quantity: 1,
        category: "心理书籍",
      },
    ],
  },
]

const statusConfig: Record<
  string,
  {
    color: string
    icon: React.ReactNode
  }
> = {
  pending: {
    color: "bg-amber-50 text-amber-600 border-amber-200",
    icon: <Package className="h-4 w-4" />,
  },
  shipping: {
    color: "bg-blue-50 text-blue-600 border-blue-200",
    icon: <Truck className="h-4 w-4" />,
  },
  completed: {
    color: "bg-green-50 text-green-600 border-green-200",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  cancelled: {
    color: "bg-gray-100 text-gray-600 border-gray-200",
    icon: <XCircle className="h-4 w-4" />,
  },
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filterOrders = (type: string) => {
    if (type === "all") return mockOrders
    return mockOrders.filter((order) => order.statusType === type)
  }

  const filteredOrders = filterOrders(activeTab)

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
          <h1 className="text-xl font-bold text-blue-600">我的订单</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto flex-1 space-y-4 p-4 md:p-6 max-w-5xl">
        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">全部订单</p>
                  <p className="text-2xl font-bold text-blue-600">{mockOrders.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">待发货</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {mockOrders.filter((o) => o.statusType === "pending").length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">配送中</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {mockOrders.filter((o) => o.statusType === "shipping").length}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">已完成</p>
                  <p className="text-2xl font-bold text-green-600">
                    {mockOrders.filter((o) => o.statusType === "completed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border-0 shadow-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              全部
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-600">
              待发货
            </TabsTrigger>
            <TabsTrigger value="shipping" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              配送中
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
            >
              已完成
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-gray-50 data-[state=active]:text-gray-600">
              已取消
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-base text-gray-800">订单号：{order.id}</CardTitle>
                        <Badge className={`${statusConfig[order.statusType].color} border`}>
                          {statusConfig[order.statusType].icon}
                          <span className="ml-1">{order.status}</span>
                        </Badge>
                      </div>
                      <CardDescription className="text-xs text-gray-500">{order.date}</CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                              <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">x{item.quantity}</span>
                              <span className="text-sm font-medium text-blue-600">¥{item.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Number */}
                    {order.trackingNumber && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-600 font-medium mb-1">物流单号：</p>
                        <p className="text-sm text-gray-700">{order.trackingNumber}</p>
                      </div>
                    )}

                    {/* Review */}
                    {order.review && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-xs text-green-600 font-medium">我的评价：</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < (order.rating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{order.review}</p>
                      </div>
                    )}

                    {/* Cancel Reason */}
                    {order.cancelReason && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">取消原因：</p>
                        <p className="text-sm text-gray-700">{order.cancelReason}</p>
                      </div>
                    )}

                    {/* Total and Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-right">
                        <p className="text-xs text-gray-600">订单总额</p>
                        <p className="text-xl font-bold text-blue-600">¥{order.total}</p>
                      </div>
                      <div className="flex gap-2">
                        {order.statusType === "pending" && (
                          <>
                            <Button variant="outline" size="sm">
                              提醒发货
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              取消订单
                            </Button>
                          </>
                        )}
                        {order.statusType === "shipping" && (
                          <>
                            <Button variant="outline" size="sm">
                              查看物流
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              确认收货
                            </Button>
                          </>
                        )}
                        {order.statusType === "completed" && !order.review && (
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4 mr-1" />
                            评价订单
                          </Button>
                        )}
                        {order.statusType === "completed" && (
                          <>
                            <Button variant="outline" size="sm">
                              再次购买
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              联系客服
                            </Button>
                          </>
                        )}
                        {order.statusType === "cancelled" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            重新购买
                          </Button>
                        )}
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 bg-transparent"
                        >
                          <Link href={`/personal-center/orders/${order.id}`}>查看详情</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">暂无订单</p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/mall">去商城逛逛</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
