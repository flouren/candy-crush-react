import './App.css';
import {useState,useEffect} from "react";

const width = 8
const candyColours = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
]

const App = () => {

    const [currentColorArrangement,setCurrentColorArrangement] = useState([])

    // Function that creates game board
    const createBoard = () => {

        const randomColorArrangement = []
        for (let i=0;i<width * width; i++){
            const randomNumberFrom0to5 = Math.floor(Math.random() * candyColours.length)
            const randomColor = candyColours[randomNumberFrom0to5]
            randomColorArrangement.push(randomColor)
        }
        // console.log(randomColorArrangement)
        setCurrentColorArrangement(randomColorArrangement)
    }

    // Function that checks three imgs in col
    const checkForColumnOfThree = () =>{
      for (let i = 0; i < 47; i++) {
        const columnOfThree = [i, i+width, i+width*2]
        const decidedColor = currentColorArrangement[i]

        if(columnOfThree.every(square => currentColorArrangement[square] === decidedColor)){
          columnOfThree.forEach(square=>currentColorArrangement[square] = '')
        }
    }
  }   


    // Function that checks four imgs in col
    const checkForColumnOfFour = () =>{
      for (let i = 0; i < 39; i++) {
        const columnOfFour = [i, i+width, i+width*2,i+width*3]
        const decidedColor = currentColorArrangement[i]

        if(columnOfFour.every(square => currentColorArrangement[square] === decidedColor)){
          columnOfFour.forEach(square=>currentColorArrangement[square] = '')
        }
    }
  }   



  // Function that checks if there are three imgs in row
  const checkForRowOfThree = () =>{
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i+1, i+2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]

      if(notValid.includes(i)) continue

      if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor)){
        rowOfThree.forEach(square=>currentColorArrangement[square] = '')
      }
  }
}  

// Function that checks if there are four imgs in row
const checkForRowOfFour = () =>{
  for (let i = 0; i < 64; i++) {
    const rowOfFour = [i, i+1, i+2,i+3]
    const decidedColor = currentColorArrangement[i]
    const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]

    if(notValid.includes(i)) continue

    if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor)){
      rowOfFour.forEach(square=>currentColorArrangement[square] = '')
    }
}
}   

const moveIntoSquareBelow = () => {
  for (let i = 0; i < 64-width; i++) {
    const firstRow = [0,1,2,3,4,5,6,7]
    const isFirstRow = firstRow.includes(i)

    if(isFirstRow && currentColorArrangement[i] === ''){
      let randomNumber = Math.floor(Math.random() * candyColours.length)
      currentColorArrangement[i] = candyColours[randomNumber] 
    }

    if((currentColorArrangement[i + width]) === ''){
      currentColorArrangement[i+width] = currentColorArrangement[i]
      currentColorArrangement[i] = ''
    }
    
  }
}

const dragStart = () => {}

const dragDrop = () => {}

const dragEnd = () => {}





/**
 *  useEffect to create board game
 */
      useEffect(() => {
        createBoard()
        // console.log('useEffect calls');
      },[])
      // console.log(currentColorArrangement)




      useEffect(() => {




        
        const timer = setInterval(() => {
          checkForColumnOfFour()
          checkForColumnOfThree()
          checkForRowOfFour()
          checkForRowOfThree()
          moveIntoSquareBelow()
          setCurrentColorArrangement([...currentColorArrangement])
          // console.log('Checking for threes and fours ..');
        }, 100);
        return ()=>clearInterval(timer)
      }, [checkForColumnOfFour,checkForColumnOfThree,checkForRowOfThree,moveIntoSquareBelow,currentColorArrangement])
      




  return (
    <div className="App">
      <div className="game">
        {currentColorArrangement.map((candyColours,index)=>(
          <img
            key={index}
            style={{backgroundColor:candyColours}}
            alt={candyColours}
            data-id={index}
            onDragStart={dragStart}
            draggable={true}
            onDragOver={(e)=>e.preventDefault()}
            onDragEnter={(e)=>e.preventDefault()}
            onDragLeave={(e)=>e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          >
          </img>
        ))}
      </div>
    </div>
  );
}

export default App;
