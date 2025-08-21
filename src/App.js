import Die from "./Die.js"
import React from "react"
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
function App() {
  //Function for generating random Numbers within the range of 1-6
  //My Own method of generating Random Numbers gotten from the internet
  // function generateRandomNumber(min,max){
  //   return Math.floor(Math.random() * (max-min) + min)
  // }

  // const randomDie= []
  // for(let i=0; i<10; i++){
  //   randomDie.push(generateRandomNumber(1,6))
  // }
  
  //A state for giveing the array values to be inputted into "dice state"
  const [dice,setDice]= React.useState(generateAllDiceNum())

  //Creating a UseEffect Cause we are trying to access a value outside the system
  const buttonFocus = React.useRef(null)
  //The Function for generating "Random Dice Numbers from 1 to 6"
  //Converting it from an arrray to an array objects

  //For Checking if I won the game using Array.prototype.every, Mastermind for refreshing and updating the UI component
  const gameWon = dice.every(die=> die.isHeld) &&  
  dice.every(die=> die.value === dice[0].value)
   //Creating a UseEffect Cause we are trying to access a value outside the system
   React.useEffect(()=>{
    if(gameWon){
      buttonFocus.current.focus()
    }
   },[gameWon])
  function generateAllDiceNum(){
    return new Array(10)
    .fill(0)
    .map(()=>({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }))
   
  }
  


  function toggle(id){
     setDice(prevDice=>prevDice.map(die=>
      die.id === id?
      {...die,isHeld:!die.isHeld}:die
     ))
  }

  //Calling the function generateAllDiceNum() that generate random Numbers for the dice whenever the button is clicked
  function changeDiceNum(){
     if(!gameWon){
      setDice(prevDice=>prevDice.map(die=>
      die.isHeld?
      die:
      {...die,value:Math.ceil(Math.random() * 6)}
     ))}
     else{
      setDice(generateAllDiceNum())
     }
  }
  
  //A variable that contains the mapping of the array converted to array of objects
  //The component is updated to have a prop{value} which is the die number is there updated through the Array.prototype.map()
  const packOfDie = dice.map((dieObj)=>
     <Die 
  //Displays the die value from the dice state that is then mapped to display it to the screen.
   value ={dieObj.value}
  //Passed as a prop to change the styling of the button if the boolean is true or false.
   isHeld={dieObj.isHeld}
   key={dieObj.id}
   toggle={()=>toggle(dieObj.id)}
   />
 )
  
//  console.log(randomDie)
  return (
    <main>
      {gameWon && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll untill all dice are the same.Click each die to freeze it at its current value between rolls.</p>
      {/* Die Component */}
      <div className="Die-Component">
        {packOfDie}
      </div>
      <button ref={buttonFocus} onClick={changeDiceNum}>{gameWon ? "Start New Game": "Roll Dice"}</button>
    </main>
  )
}

export default App;
