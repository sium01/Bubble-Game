import  { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(5);
  const [highScore, setHighScore] = useState(0);


  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        const bubble = {
          id: Date.now(),
          x: Math.random() * 90, 
          y: Math.random() * 90,
        };
        setBubbles((prev) => [...prev, bubble]);
      }, 1000); 
      return () => clearInterval(interval);
    }
  }, [time]);

 
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => setTime((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else {
     
      setHighScore((prevHigh) => (score > prevHigh ? score : prevHigh));
    }
  }, [time, score]);


  const handlePop = (id) => {
    if (time > 0) { 
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
      setScore((prev) => prev + 1);
    }
  };


  const handleRestart = () => {
    setBubbles([]);
    setScore(0);
    setTime(120);
  };

  return (
    <div className="App">
      <h1>Bubble Pop Game</h1>
      <div className="scoreboard">
        <p>Score: {score}</p>
        <p>Time: {time}s</p>
        <p>High Score: {highScore}</p>
      </div>
      <div className="game-area">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
            style={{ left:`${bubble .x}%`, top:`${bubble.y}%`}}
            onClick={() => handlePop(bubble.id)}
          ></div>
        ))}
      </div>
      {time === 0 && (
        <div className="game-over">
          <h2>Game Over! Final Score: {score}</h2>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
   </div>
  );
}

export default App;