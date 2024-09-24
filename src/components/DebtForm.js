import React, { useState } from 'react';
import '../App.css';

function DebtForm({ setPeople, people }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (people.some(person => person.name === name)) {
      setError('同じ名前のメンバーが既に存在します。');
      return;
    }
    setPeople(prev => [...prev, { name, amount: parseFloat(amount) }]);
    setName('');
    setAmount('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
        required 
      />
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount (positive for lender, negative for borrower)" 
        required 
      />
      <button type="submit">Add Person</button>
    </form>
  );
}

export default DebtForm;
