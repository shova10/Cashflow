import { useMemo } from 'react'
import { useStore } from '../store/useStore'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'

const COLORS = [
  '#4ade80',
  '#f87171',
  '#60a5fa',
  '#facc15',
  '#c084fc',
  '#fb923c',
  '#34d399',
  '#f472b6',
]

const fmt = (n) =>
  'Rs ' + n.toLocaleString('en-NP', { minimumFractionDigits: 0 })

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1d27] border border-white/10 rounded-lg px-3 py-2 text-xs">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  )
}

const Analytics = () => {
  const transactions = useStore((state) => state.transactions)

  const monthlyData = useMemo(() => {
    const map = {}
    transactions.forEach((t) => {
      const month = t.date?.slice(0, 7)
      if (!month) return
      if (!map[month]) map[month] = { month, income: 0, expense: 0 }
      map[month][t.type] += t.amount
    })
    return Object.values(map)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map((d) => ({
        ...d,
        month: new Date(d.month + '-01').toLocaleString('default', {
          month: 'short',
          year: '2-digit',
        }),
      }))
  }, [transactions])

  const categoryData = useMemo(() => {
    const map = {}
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount
      })
    return Object.entries(map).map(([name, value]) => ({ name, value }))
  }, [transactions])

  const savingsData = useMemo(() => {
    const map = {}
    transactions.forEach((t) => {
      const month = t.date?.slice(0, 7)
      if (!month) return
      if (!map[month]) map[month] = { month, income: 0, expense: 0 }
      map[month][t.type] += t.amount
    })
    return Object.values(map)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map((d) => ({
        month: new Date(d.month + '-01').toLocaleString('default', {
          month: 'short',
          year: '2-digit',
        }),
        rate:
          d.income > 0
            ? parseFloat((((d.income - d.expense) / d.income) * 100).toFixed(1))
            : 0,
      }))
  }, [transactions])

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0)
  const overallRate =
    totalIncome > 0
      ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
      : 0

  const axisStyle = { fill: '#6b7280', fontSize: 11 }
  const chartProps = { style: { background: 'transparent' } }

  if (transactions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-xl font-semibold text-white mb-2">Analytics</h1>
        <p className="text-gray-500 text-sm">
          Add some transactions to see your analytics.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-24 space-y-6">
      <h1 className="text-xl font-semibold text-white">Analytics</h1>

      <div className="bg-[#1a1d27] border border-white/8 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Overall Savings Rate
          </p>
          <p
            className={`text-3xl font-semibold ${
              overallRate >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {overallRate}%
          </p>
        </div>
        <div className="sm:text-right text-xs text-gray-500 space-y-1">
          <p>Income: {fmt(totalIncome)}</p>
          <p>Expense: {fmt(totalExpense)}</p>
          <p>Saved: {fmt(totalIncome - totalExpense)}</p>
        </div>
      </div>

      <div className="bg-[#1a1d27] border border-white/8 rounded-xl p-5">
        <p className="text-sm font-semibold text-white mb-4">
          Income vs Expense — Monthly
        </p>
        <ResponsiveContainer width="100%" height={220} {...chartProps}>
          <BarChart data={monthlyData} barCategoryGap="30%">
            <XAxis
              dataKey="month"
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => 'Rs ' + (v / 1000).toFixed(0) + 'k'}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
            <Bar
              dataKey="income"
              name="Income"
              fill="#4ade80"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expense"
              name="Expense"
              fill="#f87171"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1d27] border border-white/8 rounded-xl p-5">
          <p className="text-sm font-semibold text-white mb-4">
            Expenses by Category
          </p>
          {categoryData.length === 0 ? (
            <p className="text-xs text-gray-500">No expense data yet.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180} {...chartProps}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={<CustomTooltip />}
                    formatter={(v) => fmt(v)}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <ul className="mt-3 space-y-1">
                {categoryData.map((d, i) => (
                  <li
                    key={d.name}
                    className="flex items-center gap-2 text-xs text-gray-400"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    <span className="flex-1">{d.name}</span>
                    <span className="text-white">{fmt(d.value)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="bg-[#1a1d27] border border-white/8 rounded-xl p-5">
          <p className="text-sm font-semibold text-white mb-4">
            Savings Rate Trend
          </p>
          <ResponsiveContainer width="100%" height={220} {...chartProps}>
            <LineChart data={savingsData}>
              <XAxis
                dataKey="month"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v + '%'}
              />
              <Tooltip
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div className="bg-[#1a1d27] border border-white/10 rounded-lg px-3 py-2 text-xs">
                      <p className="text-gray-400 mb-1">{label}</p>
                      <p className="text-green-400">
                        Rate: {payload[0].value}%
                      </p>
                    </div>
                  ) : null
                }
              />
              <Line
                type="monotone"
                dataKey="rate"
                name="Savings Rate"
                stroke="#4ade80"
                strokeWidth={2}
                dot={{ r: 3, fill: '#4ade80' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Analytics
