import React, { useState } from 'react';

function DebtForm({ setPeople }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setPeople(prev => [...prev, { name, amount: parseFloat(amount) }]);
    setName('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
