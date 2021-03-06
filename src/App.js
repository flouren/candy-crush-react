import "./App.css";
import { useState, useEffect } from "react";
import AppleCandy from "./img/apple.png";
import BAnanaCandy from "./img/banana.png";
import OrangeCandy from "./img/orange.png";
import PearCandy from "./img/pear.png";
import PomgranateCandy from "./img/pomgranate.png";
import WatermelonCandy from "./img/watermelon.png";
import Blank from "./img/blank.png";
import ScoreBoard from "./components/ScoreBoard";

const width = 8;
const candyColours = [
  AppleCandy,
  BAnanaCandy,
  OrangeCandy,
  PearCandy,
  PomgranateCandy,
  WatermelonCandy,
];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  // Function that creates game board
  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomNumberFrom0to5 = Math.floor(
        Math.random() * candyColours.length
      );
      const randomColor = candyColours[randomNumberFrom0to5];
      randomColorArrangement.push(randomColor);
    }
    // console.log(randomColorArrangement)
    setCurrentColorArrangement(randomColorArrangement);
  };

  // Function that checks three imgs in col
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  // Function that checks four imgs in col
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  // Function that checks if there are three imgs in row
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === Blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3); //....
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  // Function that checks if there are four imgs in row
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === Blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4); //...
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === Blank) {
        let randomNumber = Math.floor(Math.random() * candyColours.length);
        currentColorArrangement[i] = candyColours[randomNumber];
      }

      if (currentColorArrangement[i + width] === Blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = Blank;
      }
    }
  };

  console.log("score is : ", scoreDisplay);

  const dragStart = (e) => {
    console.log(e.target);
    console.log("drag start");
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log(e.target);
    console.log("drag drop");
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    console.log(e.target);
    console.log("drag end");
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    console.log(squareBeingDraggedId);
    console.log(squareBeingReplacedId);

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingDraggedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  /**
   *  useEffect to create board game
   */
  useEffect(() => {
    createBoard();
    // console.log('useEffect calls');
  }, []);
  // console.log(currentColorArrangement)

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
      // console.log('Checking for threes and fours ..');
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <div className="App">
      <div className="game">
        {currentColorArrangement.map((candyColours, index) => (
          <img
            key={index}
            // style={{backgroundColor:candyColours}}
            src={candyColours}
            alt={candyColours}
            data-id={index}
            onDragStart={dragStart}
            draggable={true}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          ></img>
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
};

export default App;
