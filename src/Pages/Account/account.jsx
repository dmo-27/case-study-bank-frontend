import React, { useState } from 'react'

/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'

const accounts = [
  {
    name: 'Jane Cooper',
    accountNumber: '1234567890',
    balance: 'INR 12,450.00',
    type: 'Savings',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    },
  // More accounts...
]


export default function Account() {

    const [showBalance, setShowBalance] = useState(false)
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <li key={account.accountNumber} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm font-medium truncate">{account.accountNumber}</h3>
                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-blue-800 text-xs font-medium bg-blue-100 rounded-full">
                  {account.type}
                </span>
              </div>
              <p className="mt-1 text-gray-500 text-sm truncate">{account.name}</p>
              {
                showBalance && 
               <p className="mt-1 text-gray-900 text-sm font-semibold">Balance: {account.balance}</p> 
              }
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <button
                  onClick={() => {setShowBalance(true)}}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  💰
                  <span className="ml-2">Check Balance</span>
                </button>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                <button
                  onClick={() => alert(`Set ${account.name}'s account as active`)}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  ⚙️
                  <span className="ml-2">Set Active</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
