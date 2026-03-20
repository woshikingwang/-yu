export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa]">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">加载中...</p>
      </div>
    </div>
  )
}
