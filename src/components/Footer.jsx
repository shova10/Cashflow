const Footer = () => {
  return (
    <footer className="border-t border-white/8 mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col items-center justify-center gap-1 text-xs text-gray-500 text-center">
        <p>
          CashFlow &copy; {new Date().getFullYear()}. All data stays in your
          browser.
        </p>
        <p className="text-gray-600">
          Built by Shova Pandey with React, Zustand & Recharts
        </p>
      </div>
    </footer>
  )
}

export default Footer
