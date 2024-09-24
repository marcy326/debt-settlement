import React, { useState, useEffect } from 'react';
import DebtForm from './components/DebtForm';
import DebtResult from './components/DebtResult';
import './App.css';

function App() {
  const [people, setPeople] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    document.title = "Debt Settlement App";
  }, []);

  useEffect(() => {
    const total = people.reduce((sum, person) => sum + person.amount, 0);
    setTotalAmount(total);
  }, [people]);

  // グリーディ法でペア探索して最小の取引を計算する関数
  const calculateTransactions = () => {
    // 金額の総和が0でない場合は警告を出して計算を実行しない
    if (totalAmount !== 0) {
      setError('The total amount is not zero.');
      setTransactions([]);
      return;
    }
    // エラーをクリア
    setError('');

    // originalPeople を people にコピー
    const peopleCopy = people.map(person => ({ ...person }));

    let lenders = peopleCopy.filter(p => p.amount > 0).sort((a, b) => b.amount - a.amount);
    let borrowers = peopleCopy.filter(p => p.amount < 0).sort((a, b) => a.amount - b.amount);
    const results = [];
  
    // 同値のペアを先に探す
    while (lenders.length > 0 || borrowers.length > 0) {
      let hasEquivalent = false;
      let equivalentLenderIndex = -1;
      let equivalentBorrowerIndex = -1;
  
      // 貸し手と借り手のリストの中で同値のペアを探す
      for (let i = 0; i < lenders.length; i++) {
        for (let j = 0; j < borrowers.length; j++) {
          if (lenders[i].amount === -borrowers[j].amount) {
            hasEquivalent = true;
            equivalentLenderIndex = i;
            equivalentBorrowerIndex = j;
            break;
          }
        }
        if (hasEquivalent) break; // ペアが見つかったら探索を終了
      }
  
      if (hasEquivalent) {
        // 同値のペアが見つかった場合、そのペアで取引を行う
        const lender = lenders[equivalentLenderIndex];
        const borrower = borrowers[equivalentBorrowerIndex];
        const transferAmount = lender.amount;
  
        results.push(`${borrower.name} → ${lender.name} ${transferAmount}`);
  
        lender.amount = 0;
        borrower.amount = 0;
      } else {
        // 同値のペアがない場合、通常の取引を行う
        const lender = lenders[0];
        const borrower = borrowers[0];
        const transferAmount = Math.min(lender.amount, -borrower.amount);
  
        results.push(`${borrower.name} → ${lender.name} ${transferAmount}`);
  
        lender.amount -= transferAmount;
        borrower.amount += transferAmount;
      }
      lenders = peopleCopy.filter(p => p.amount > 0).sort((a, b) => b.amount - a.amount);
      borrowers = peopleCopy.filter(p => p.amount < 0).sort((a, b) => a.amount - b.amount);
    }
  
    setTransactions(results);
  };

  const removePerson = (index) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>Debt Settlement App</h1>
      <h2>Add Member</h2>
      {/* メンバー入力フォーム */}
      <DebtForm setPeople={setPeople} people={people} />

      {/* 追加したメンバーの表示 */}
      <h2>Members</h2>
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            <p>{person.name}: {person.amount}</p>
            <button onClick={() => removePerson(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Total: {totalAmount}</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* 取引の計算ボタン */}
      <button className="calculate" onClick={calculateTransactions}>Calculate</button>

      {/* 計算結果の表示 */}
      <DebtResult transactions={transactions} />
    </div>
  );
}

export default App;
