import React from 'react';
import '../App.css';

function DebtResult({ transactions }) {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p>{transaction}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DebtResult;
