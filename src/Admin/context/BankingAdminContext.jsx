import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMockData } from '../utils/mockData';

// Context without TypeScript types
const BankingAdminContext = createContext(undefined);

export const BankingAdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = generateMockData();
    setUsers(data.users);
    setTransactions(data.transactions);
    setAccounts(data.accounts);
    setTickets(data.tickets);
    setLogs(data.logs);
    setLoading(false);
  }, []);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      const data = generateMockData();
      setUsers(data.users);
      setTransactions(data.transactions);
      setAccounts(data.accounts);
      setTickets(data.tickets);
      setLogs(data.logs);
      setLoading(false);
    }, 1000);
  };

  const updateUser = (id, updates) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...updates } : user));
  };

  const updateAccount = (id, updates) => {
    setAccounts(prev => prev.map(account => account.id === id ? { ...account, ...updates } : account));
  };

  const reverseTransaction = (id) => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === id 
        ? { ...transaction, status: 'reversed', reversedAt: new Date() }
        : transaction
    ));
  };

  const flagTransaction = (id, reason) => {
    setTransactions(prev => prev.map(transaction =>
      transaction.id === id
        ? { ...transaction, flagged: true, flagReason: reason }
        : transaction
    ));
  };

  const updateTicket = (id, updates) => {
    setTickets(prev => prev.map(ticket => ticket.id === id ? { ...ticket, ...updates } : ticket));
  };

  const value = {
    users,
    transactions,
    accounts,
    tickets,
    logs,
    loading,
    refreshData,
    updateUser,
    updateAccount,
    reverseTransaction,
    flagTransaction,
    updateTicket,
  };

  return (
    <BankingAdminContext.Provider value={value}>
      {children}
    </BankingAdminContext.Provider>
  );
};

export const useBankingAdmin = () => {
  const context = useContext(BankingAdminContext);
  if (!context) {
    throw new Error('useBankingAdmin must be used within a BankingAdminProvider');
  }
  return context;
};
