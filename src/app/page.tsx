import { Suspense } from 'react'
import Analytics from '@/components/Analytics'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Analytics />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gradient mb-6">
            Ryan Yang
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            前端开发工程师 | 技术博客作者 | 摄影爱好者
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            专注于现代Web技术栈，热爱创造优秀的用户体验，擅长React、Vue、TypeScript等现代前端技术
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">8年+</div>
              <div className="text-gray-300">开发经验</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">30+</div>
              <div className="text-gray-300">项目经验</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">20+</div>
              <div className="text-gray-300">技术栈</div>
            </div>
          </div>
        </div>
      </section>

      {/* Frontend Navigation Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              前端开发导航
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              精选前端开发必备的工具、库和资源，助力提升开发效率
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "前端库",
                description: "React、Vue、Angular等主流框架",
                count: "6个资源",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "开发工具",
                description: "VS Code、Chrome DevTools等开发工具",
                count: "6个资源",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Node.js生态",
                description: "Node.js、Express、Koa等后端技术",
                count: "6个资源",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "编译构建",
                description: "Webpack、Vite、Babel等构建工具",
                count: "6个资源",
                color: "from-orange-500 to-red-500"
              },
              {
                title: "可视化",
                description: "D3.js、ECharts、Chart.js等图表库",
                count: "6个资源",
                color: "from-indigo-500 to-purple-500"
              },
              {
                title: "生态社区",
                description: "GitHub、MDN、Stack Overflow等社区",
                count: "6个资源",
                color: "from-teal-500 to-cyan-500"
              }
            ].map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl p-6 border border-dark-600 hover:border-primary-500 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">
                      {category.title.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{category.count}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-400 text-sm font-medium">查看详情</span>
                  <span className="text-primary-400">→</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="glass-effect rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                快速访问
              </h3>
              <p className="text-gray-300 mb-6">
                常用工具和资源的快速入口
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: "React 官方文档", url: "https://react.dev", icon: "⚛️" },
                  { name: "Vue.js 官方文档", url: "https://vuejs.org", icon: "🟢" },
                  { name: "TypeScript 官方文档", url: "https://www.typescriptlang.org", icon: "🔷" },
                  { name: "MDN Web Docs", url: "https://developer.mozilla.org", icon: "📚" },
                  { name: "GitHub", url: "https://github.com", icon: "🐙" },
                  { name: "Stack Overflow", url: "https://stackoverflow.com", icon: "💬" }
                ].map((quickLink, index) => (
                  <a
                    key={quickLink.name}
                    href={quickLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-primary-600 rounded-full text-white transition-all duration-300"
                  >
                    <span className="text-lg">{quickLink.icon}</span>
                    <span className="text-sm font-medium">{quickLink.name}</span>
                  </a>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="/skills"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium transition-colors duration-200"
                >
                  <span>查看完整导航</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
