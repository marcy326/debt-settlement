import React from 'react';
import '../App.css';

function DebtResult({ transactions }) {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))}
      </ul>
    </div>
  );
}

export default DebtResult;
