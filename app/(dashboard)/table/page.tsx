import { createClient } from '@/utils/supabase/server'
import { addTransaction, deleteTransaction } from './actions'
import { Trash2, Plus } from 'lucide-react'
import { Suspense } from 'react'
import ToastListener from '@/components/toastListener'
import EditTransaction from '@/components/editTransaction'

async function TransactionList() {
  const supabase = await createClient()

  // Fetching Transaction Data From Supabase (READ)
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <ToastListener />

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Financial Report Table</h1>
        <div className="text-sm text-gray-500">
          PPn: 11% | PPh: 2.5% (Final)
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-indigo-900">Add New Transaction</h3>
        <form action={addTransaction} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-700 mb-1">Product Name</label>
            <input name="product_name" type="text" placeholder="Nama Produk" required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 placeholder-gray-500" />
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium text-gray-700 mb-1">Price (Rp)</label>
            <input name="price" type="number" placeholder="0" required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 placeholder-gray-500" />
          </div>
          <div className="w-24">
            <label className="block text-xs font-medium text-gray-700 mb-1">Qty</label>
            <input name="quantity" type="number" defaultValue="1" required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 placeholder-gray-500" />
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-50 text-indigo-900 text-xs uppercase font-semibold">
            <tr>
              <th className="p-4">Produk</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Subtotal</th>
              <th className="p-4 text-orange-600">PPn (11%)</th>
              <th className="p-4 text-green-600">PPh (2.5%)</th>
              <th className="p-4 text-right">Total Net</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {transactions?.map((trx) => {
              // Tax Calculations
              const subtotal = trx.price * trx.quantity
              const ppn = subtotal * 0.11
              const pph = subtotal * 0.025
              const totalNet = subtotal + ppn + pph

              return (
                <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{trx.product_name}</td>
                  <td className="p-4">Rp {trx.price.toLocaleString()}</td>
                  <td className="p-4">{trx.quantity}</td>
                  <td className="p-4 font-semibold">Rp {subtotal.toLocaleString()}</td>
                  <td className="p-4 text-orange-600">+ Rp {ppn.toLocaleString()}</td>
                  <td className="p-4 text-green-600">+ Rp {pph.toLocaleString()}</td>
                  <td className="p-4 text-right font-bold text-indigo-700">Rp {totalNet.toLocaleString()}</td>
                  {/* Action Column */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">

                      {/* Edit Transaction */}
                      <EditTransaction trx={trx} />

                      {/* Delete Transaction */}
                      <form action={deleteTransaction.bind(null, trx.id)}>
                        <button
                          className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              )
            })}

            {(!transactions || transactions.length === 0) && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-400">Belum ada data transaksi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

// Exported function
export default function TablesPage() {
  return (
    <div className="space-y-8">
      {/* Fallback UI while data is fetching */}
      <Suspense fallback={
        <div className="w-full h-96 flex items-center justify-center text-indigo-900/50 animate-pulse">
          Loading Financial Data...
        </div>
      }>
        <TransactionList />
      </Suspense>
    </div>
  )
}