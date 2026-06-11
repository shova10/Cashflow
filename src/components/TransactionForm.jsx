import { useState } from 'react'
import { useStore } from '../store/useStore'
import { X } from 'lucide-react'

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: [
    'Food',
    'Transport',
    'Housing',
    'Health',
    'Shopping',
    'Education',
    'Entertainment',
    'Other',
  ],
}

const defaultForm = {
  title: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: '',
}

const TransactionForm = ({ onClose }) => {
  const addTransaction = useStore((state) => state.addTransaction)
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      const updated = { ...prev, [name]: value }
   
      if (name === 'type') {
        updated.category = CATEGORIES[value][0]
      }
      return updated
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return setError('Title is required.')
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      return setError('Enter a valid amount.')
    if (!form.date) return setError('Date is required.')

    addTransaction({
      title: form.title.trim(),
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    })

    setForm(defaultForm)
    setError('')
    onClose?.()
  }

  const inputClass =
    'w-full bg-[#0f1117] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 transition-colors'
  const labelClass = 'block text-xs text-gray-400 mb-1'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-[#1a1d27] border border-white/10 rounded-2xl w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-white">
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Type toggle */}
          <div>
            <label className={labelClass}>Type</label>
            <div className="flex gap-2">
              {['income', 'expense'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() =>
                    handleChange({ target: { name: 'type', value: t } })
                  }
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-green-500/15 border-green-500/50 text-green-400'
                        : 'bg-red-500/15 border-red-500/50 text-red-400'
                      : 'border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={labelClass}>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Grocery run"
              className={inputClass}
            />
          </div>

          {/* Amount */}
          <div>
            <label className={labelClass}>Amount (Rs)</label>
            <input
              name="amount"
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              {CATEGORIES[form.type].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className={labelClass}>Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            className="mt-1 w-full py-2.5 rounded-lg bg-green-500 hover:bg-green-400 text-black text-sm font-semibold transition-colors"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm
