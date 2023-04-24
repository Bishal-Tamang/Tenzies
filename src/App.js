import React,{useState, useEffect} from 'react'
import './App.css';
import Die from './components/Die'
import {nanoid}  from 'nanoid'
import Confetti from 'react-confetti'



function App() {


  const [dice, setDice] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)


 

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

useEffect(()=>{
  const allHeld = dice.every(item => item.isHeld)
  const FirstValue = dice[0].value
  const CommonValue = dice.every(item=> item.value === FirstValue)

  if(allHeld && CommonValue){
    setTenzies(true)
    console.log("Congratulations! You've won the game")
  
  }
}, [dice])
 

  function allNewDice(){
    const array= [];
    for(let i=0; i<10; i++){
      array.push(generateNewDie())
    }
    
    return array
  }

  function holdDice(id){
   setDice(prev => prev.map(item =>{
    return item.id === id ? 
    {...item, isHeld: !item.isHeld} : item 
   }))
  }
  
  const diceElements = dice.map( die => 
  <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice = {()=> holdDice(die.id)}/>
  ) 

  function handleRoll(){
    
    if(!tenzies){
      setDice(prev => prev.map(item => {
        return item.isHeld ? 
          item : 
          generateNewDie()
      }))
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
      

  }

//   function handleRoll(){
    
//     tenzies ? 
//       setTenzies(false) && setDice(allNewDice())
//     : setDice(prev => prev.map(item => {
//       return item.isHeld ? 
//         item : 
//         generateNewDie()
//     }))

// }



  return (
    <main className="main">

      <div className='inner-div'>
        {tenzies &&   <Confetti/>}

          <div className="instruction">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each dice to freeze at its current value between rolls.</p>
          </div>

          <div className='numbergrid'>
            {diceElements}
          
          </div>
         
            <button className='btn' onClick={handleRoll}>
              {tenzies ? 
              "New Game" : "Roll"  
            }
              </button>
      </div>

    </main>
  );
}

export default App;
