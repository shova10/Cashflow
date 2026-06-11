import { useState } from "react";
import { useStore } from "../store/useStore";
import TransactionForm from "./TransactionForm";
import { Trash2, Plus } from "lucide-react";

const TransactionList = () => {
  const { transactions, deleteTransaction } = useStore();
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = [...transactions]
    .filter((t) => filter === "all" || t.type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const fmt = (n) =>
    "Rs " + n.toLocaleString("en-NP", { minimumFractionDigits: 2 });

  const filterBtn = (value, label) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
        filter === value
          ? "bg-white/10 border-white/20 text-white"
          : "border-transparent text-gray-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-white">Transactions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black text-sm font-semibold transition-colors"
        >
          <Plus size={15} />
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-1 mb-5">
        {filterBtn("all", "All")}
        {filterBtn("income", "Income")}
        {filterBtn("expense", "Expense")}
      </div>

      {/* List */}
      <div className="bg-[#1a1d27] border border-white/8 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-12">
            No transactions found.
          </p>
        ) : (
          <ul className="divide-y divide-white/6">
            {filtered.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">
                    {t.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.category} · {t.date}
                  </p>
                </div>

                <div className="flex items-center gap-4 ml-4">
                  <span
                    className={`text-sm font-semibold ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {fmt(t.amount)}
                  </span>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Transactions page also updates the Transactions.jsx to wire in this component */}
      {showForm && <TransactionForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default TransactionList;