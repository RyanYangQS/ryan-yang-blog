import { Suspense } from 'react'
import Analytics from '@/components/Analytics'
import FrontendNavigation from '@/components/FrontendNavigation'

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Analytics />
      
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          技术技能
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          掌握现代前端开发的核心技术栈，持续学习新技术
        </p>
      </div>

      {/* Frontend Navigation */}
      <FrontendNavigation />
    </div>
  )
}
