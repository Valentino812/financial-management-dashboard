'use client'

import { useState } from 'react'
import { Pencil, X, Save } from 'lucide-react'
import { updateTransaction } from '@/app/(dashboard)/table/actions' 
import toast from 'react-hot-toast'

// Transaction Data
type Transaction = {
  id: string
  product_name: string
  price: number
  quantity: number
}

export default function EditTransaction({ trx }: { trx: Transaction }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async (formData: FormData) => {
    setIsLoading(true)
    
    // Calling Update Transaction
    await updateTransaction(formData)
    
    // Success notification
    toast.success('Data berhasil diperbarui!')
    
    setIsLoading(false)
    setIsOpen(false) 
  }

  return (
    <>
      {/* Pencil Edit Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-blue-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
        title="Edit Data"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {/* Pop Up Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          
          {/* Main Container*/}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-800 text-lg">Edit Produk</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-red-500 transition-colors bg-white p-1 rounded-full hover:bg-red-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form action={handleUpdate} className="p-6 space-y-5">
              
              {/* Product ID */}
              <input type="hidden" name="id" value={trx.id} />

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Nama Produk
                </label>
                <input 
                  name="product_name" 
                  type="text" 
                  defaultValue={trx.product_name}
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900 font-medium"
                />
              </div>

              <div className="flex gap-4">
                {/* Price Input */}
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                    Harga (Rp)
                  </label>
                  <input 
                    name="price" 
                    type="number" 
                    defaultValue={trx.price} // <--- NILAI ASLI
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900 font-medium"
                  />
                </div>

                {/* Quantity Input */}
                <div className="w-28">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                    Qty
                  </label>
                  <input 
                    name="quantity" 
                    type="number" 
                    defaultValue={trx.quantity} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900 font-medium"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-5 py-2.5 text-sm font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Menyimpan...' : (
                    <>
                      <Save className="w-4 h-4" /> Save changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}