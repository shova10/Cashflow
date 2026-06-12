import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart2,
  HardDrive,
} from 'lucide-react'

const features = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    description: 'Balance overview and recent activity at a glance.',
    route: '/dashboard',
  },
  {
    icon: ArrowLeftRight,
    title: 'Transactions',
    description: 'Log and filter every income and expense entry.',
    route: '/transactions',
  },
  {
    icon: BarChart2,
    title: 'Analytics',
    description: 'Monthly trends and category breakdown charts.',
    route: '/analytics',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#0f1117] text-white">
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 sm:pt-28 pb-2 sm:pb-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Your money, clearly.
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-md mb-4 sm:mb-6">
          Track income and expenses, visualize trends, and stay on top of your
          finances.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, description, route }) => (
            <div
              key={title}
              onClick={() => route && navigate(route)}
              className={`bg-[#1a1d27] border border-white/8 rounded-xl p-5 flex flex-col gap-3 transition-colors ${
                route
                  ? 'cursor-pointer hover:border-green-500/40 hover:bg-[#1e2130]'
                  : 'cursor-default'
              }`}
            >
              <Icon size={20} className="text-green-400" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
