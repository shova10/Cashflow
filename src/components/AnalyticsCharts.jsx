import { useStore } from "../store/useStore"; 
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid } from "recharts";

const COLORS = ["#10B981", "#EF4444", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899"];

const AnalyticsCharts = () => {
    const transactions = useStore((state) => state.transactions);


    const categoryMap = {};
    transactions.forEach((t) => {
        if (t.type === "expense"){
            if (!categoryMap[t.category]) categoryMap[t.category] = 0;
            categoryMap[t.category] += t.amount;
        }
    });

    const pieData = Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key],
    }));


    const monthMap ={};
    transactions.forEach((t) => {
        const month = new Date(t.date).toLocaleString("default", {month: "short", year: "numeric"});
        if (!monthMap[month]) monthMap[month] = {income: 0, expense: 0};
        if (t.type === "income") monthMap[month].income += t.amount;
        else monthMap[month].expense += t.amount;
    });

    const barData = Object.keys7(monthMap).map((month) => ({
        month, 
        income: monthMap[month].income,
        expense: monthMap[month].expense,
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-gray-700 font-semibold mb-2 text-center">Expense By Category</h2>
                {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie 
                            date ={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS [index % COLORS.length]}  />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ):(
                    <p className="text-gray-400 text-center mt-12">No expense data</p>
                )}
            </div>


            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-gray-700 font-semibold mb-2 text-center">Income vs Expense per Month</h2>
                {barData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar datakey="income" fill="#10B981"/>
                            <Bar datakey="expense" fill="#10B981"/>
                        </BarChart>
                    </ResponsiveContainer>
                ):(
                    <p className="text-gray-400 text-center mt-12">No transaction data</p>
                )}
            </div>
        </div>
    );

};
export default AnalyticsCharts;