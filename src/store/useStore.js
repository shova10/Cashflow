import { create } from "zustand";


const getInitialTransactions = () => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];

};   

export const useStore = create((set) => ({
    transactions: getInitialTransactions(),


    addTransaction: (transaction) => {
        set((state) => {
            const updated = [...state.transactions, transaction];
            localStorage.setItem("transactions", JSON.stringify(updated));
            return { transactions: updated };
        });
    },

    deleteTransaction: (id) => {
        set((state) => {
            const updated = state.transactions.filter(t=> t.id !==id);
            localStorage.setItem("transactions", JSON.stringify(updated));
            return { transactions: updated};
        });
    },


    clearTransactions: () => {
        set(() => {
            localStorage.removeItem("transactions");
            return {transactions: []};
        });
    }



}));