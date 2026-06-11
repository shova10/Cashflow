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
    <div className="min-h-screen bg-[#0f1117] text-white">
      <section className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Your money, clearly.
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-md mb-10">
          Track income and expenses, visualize trends, and stay on top of your
          finances.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Open dashboard
          </button>
          <button
            onClick={() => navigate('/transactions')}
            className="px-5 py-2.5 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Add transaction
          </button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
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
