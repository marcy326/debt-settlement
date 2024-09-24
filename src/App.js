import React, { useState } from 'react';
import DebtForm from './components/DebtForm';
import DebtResult from './components/DebtResult';

function App() {
  const [people, setPeople] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // グリーディ法でペア探索して最小の取引を計算する関数
  const calculateTransactions = () => {
    let lenders = people.filter(p => p.amount > 0).sort((a, b) => b.amount - a.amount);
    let borrowers = people.filter(p => p.amount < 0).sort((a, b) => a.amount - b.amount);
    const results = [];
  
    let lenderIndex = 0;
    let borrowerIndex = 0;
  
    // 同値のペアを先に探す
    while (lenderIndex < lenders.length && borrowerIndex < borrowers.length) {
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
  
        results.push(`${borrower.name} pays ${lender.name} ${transferAmount}`);
  
        lender.amount = 0;
        borrower.amount = 0;
  
        lenderIndex++;
        borrowerIndex++;
      } else {
        // 同値のペアがない場合、通常の取引を行う
        const lender = lenders[lenderIndex];
        const borrower = borrowers[borrowerIndex];
        const transferAmount = Math.min(lender.amount, -borrower.amount);
  
        results.push(`${borrower.name} pays ${lender.name} ${transferAmount}`);
  
        lender.amount -= transferAmount;
        borrower.amount += transferAmount;
  
        if (lender.amount === 0) lenderIndex++;
        if (borrower.amount === 0) borrowerIndex++;
      }
    }
  
    setTransactions(results);
  };

  return (
    <div className="App">
      <h1>Debt Settlement App</h1>

      {/* メンバー入力フォーム */}
      <DebtForm setPeople={setPeople} />

      {/* 追加したメンバーの表示 */}
      <h2>Added People</h2>
      <ul>
        {people.map((person, index) => (
          <li key={index}>{person.name}: {person.amount}</li>
        ))}
      </ul>

      {/* 取引の計算ボタン */}
      <button onClick={calculateTransactions}>Calculate Transactions</button>

      {/* 計算結果の表示 */}
      <DebtResult transactions={transactions} />
    </div>
  );
}

export default App;
