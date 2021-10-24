import './App.css';

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

    const createBoard = () => {
        for (let i=0;i<width * width; i++){
            const randomColor = candyColours[Math.floor(Math.random()*candyColours.length)]
        }
    }

  return (
    <div className="App">

    </div>
  );
}

export default App;
