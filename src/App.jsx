import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [budget, setBudget] = useState(10000)
  const [food, setFood] = useState(0)
  const [travel, setTravel] = useState(0)
  const [shopping, setShopping] = useState(0)
  const [remaining, setRemaining] = useState(0)

   const handleBudget = () => {
    let f = Number(food)
    let t = Number(travel)
    let s = Number(shopping)

    let total = f + t + s

    if (total <= budget) {
      setRemaining(budget - total)
    } else {
      let excess = total - budget

      let expenses = [
        { category: 'food', value: f },
        { category: 'travel', value: t },
        { category: 'shopping', value: s }
      ]

      expenses.sort((a, b) => b.value - a.value)

      for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].value >= excess) {
          expenses[i].value -= excess
          excess = 0
          break
        } else {
          excess -= expenses[i].value
          expenses[i].value = 0
        }
      }

      setFood(expenses.find(e => e.category === 'food').value)
      setTravel(expenses.find(e => e.category === 'travel').value)
      setShopping(expenses.find(e => e.category === 'shopping').value)

      setRemaining(0)
    }
  }

  useEffect(()=>{
    handleBudget()
  }, [food, travel, shopping])

  return (
    <>
    <h1>Budget Allocation</h1>
    <h3>Total Budget: ₹{budget}</h3>
    <h3>Remaining Budget: ₹{remaining} </h3>
    <div>
      <label>Food: </label>
      <input type='text' value={food} onChange={(e)=> setFood(e.target.value)} placeholder='Enter Amount' />
      <span> ₹{food}</span>
    </div>
    <div>
      <label>Travel: </label>
      <input type='text' value={travel} onChange={(e)=>setTravel(e.target.value)} placeholder='Enter Amount' />
      <span>₹{travel}</span>
    </div>
    <div>
      <label>Shopping: </label>
      <input type='text' value={shopping} onChange={(e)=>setShopping(e.target.value)} placeholder='Enter Amount' />
      <span>₹{shopping}</span>
    </div>
      
    </>
  )
}

export default App
