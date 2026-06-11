import { useStore } from "../store/useStore";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

const Dashboard = () => {
  const transactions = useStore((state) => state.transactions);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const fmt = (n) =>
    "Rs " + n.toLocaleString("en-NP", { minimumFractionDigits: 2 });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#1a1d27] border border-white/8 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <ArrowUpCircle size={18} className="text-green-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Total Income
            </span>
          </div>
          <p className="text-2xl font-semibold text-green-400">{fmt(income)}</p>
        </div>

        <div className="bg-[#1a1d27] border border-white/8 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <ArrowDownCircle size={18} className="text-red-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Total Expense
            </span>
          </div>
          <p className="text-2xl font-semibold text-red-400">{fmt(expense)}</p>
        </div>

        <div className="bg-[#1a1d27] border border-white/8 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={18} className="text-white/60" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Balance
            </span>
          </div>
          <p
            className={`text-2xl font-semibold ${
              balance >= 0 ? "text-white" : "text-red-400"
            }`}
          >
            {fmt(balance)}
          </p>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-[#1a1d27] border border-white/8 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">
          Recent Transactions
        </h2>

        {recent.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            No transactions yet. Add one to get started.
          </p>
        ) : (
          <ul className="divide-y divide-white/6">
            {recent.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm text-white font-medium">{t.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.category} · {t.date}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    t.type === "income" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}
                  {fmt(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;