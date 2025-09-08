import React, { useEffect, useRef, useState } from 'react';
import { Search, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import TransactionModal from '../../components/Transaction/TransactionModal';
import PinVerificationModal from '../../components/Transaction/PinVerficationModal';
import TransactionDetailsModal from '../../components/Transaction/TransactionDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { getAccountsByCustomer } from '../../api/AccountsApi';
import { getTransactionsForAccount } from '../../api/Transaction';

const Deposit = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const accounts = useSelector((state) => state.accounts.list);

  useEffect(() => {
    getTransactionsForAccount("ACCT1757233047592")
    .then(response => {
      console.log("Fetched transactions:", response.data);
    })
    .catch(err => console.error("Error fetching transactions:", err));
  }
  , []);
  
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      type: 'credit',
      amount: 2500.0,
      description: 'Salary Deposit',
      date: '2025-01-15',
      accountNumber: '****1234',
      recipient: 'ABC Company'
    },
    {
      id: '2',
      type: 'debit',
      amount: 150.0,
      description: 'Grocery Shopping',
      date: '2025-01-14',
      accountNumber: '****1234',
      recipient: 'SuperMart'
    },
    {
      id: '3',
      type: 'debit',
      amount: 75.5,
      description: 'Electric Bill',
      date: '2025-01-13',
      accountNumber: '****5678',
      recipient: 'Power Company'
    },
    {
      id: '4',
      type: 'credit',
      amount: 1000.0,
      description: 'Freelance Payment',
      date: '2025-01-12',
      accountNumber: '****9012',
      recipient: 'Client XYZ'
    },
    {
      id: '5',
      type: 'debit',
      amount: 200.0,
      description: 'Online Purchase',
      date: '2025-01-11',
      accountNumber: '****1234',
      recipient: 'E-commerce Store'
    }
  ]);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.accountNumber.includes(searchTerm)
  );

  const handleTransactionSubmit = (data) => {
    setTransactionData(data);
    setShowTransactionModal(false);
    setShowPinModal(true);
  };

  const handlePinVerification = (pin) => {
    // Simulate PIN verification (PIN: 1234)
    if (pin === '1234') {
      const newTransaction = {
        id: Date.now().toString(),
        type: 'debit',
        amount: parseFloat(transactionData.amount),
        description: transactionData.description,
        date: new Date().toISOString().split('T')[0],
        accountNumber: transactionData.fromAccount.split(' - ')[0],
        recipient: `Account ${transactionData.toAccountNumber}`
      };

      setTransactions((prev) => [newTransaction, ...prev]);
      setShowPinModal(false);
      setTransactionData(null);

      alert('Transaction completed successfully!');
    } else {
      alert('Invalid PIN. Please try again.');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deposits</h1>
          <p className="text-gray-600">View and add deposits to your account</p>
        </div>

        {/* Account Summary Cards */}
        {/* (unchanged) */}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search deposits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Deposit Button */}
          <button
            onClick={() => setShowTransactionModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Deposit
          </button>
        </div>

        {/* Deposits List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Deposits</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredTransactions.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 mb-2">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-500">No deposits found</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* ... transaction UI unchanged ... */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals remain same */}
      {showTransactionModal && (
        <TransactionModal
          accounts={accounts}
          onClose={() => setShowTransactionModal(false)}
          onSubmit={handleTransactionSubmit}
        />
      )}

      <TransactionDetailsModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      {showPinModal && (
        <PinVerificationModal
          onClose={() => {
            setShowPinModal(false);
            setTransactionData(null);
          }}
          onVerify={handlePinVerification}
          transactionData={transactionData}
        />
      )}
    </div>
  );
};

export default Deposit;
