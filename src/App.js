import './App.css';
import {useState} from "react";

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

    const [currentColorArrangement,setColorArrangement] = useState()

    const createBoard = () => {

        const randomColorArrangement = []
        for (let i=0;i<width * width; i++){
            const randomNumberFrom0to5 = Math.floor(Math.random() * candyColours.length)
            const randomColor = candyColours[randomNumberFrom0to5]
            randomColorArrangement.push(randomColor)
        }
        // console.log(randomColorArrangement)
        setColorArrangement(randomColorArrangement)
        console.log(currentColorArrangement)
    }

    createBoard()

  return (
    <div className="App">

    </div>
  );
}

export default App;
