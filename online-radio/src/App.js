import logo from "./logo.svg";
import "./App.css";
import Player from "./components/home/Player";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Onlain Radio</h1>
        <h2>Choose a station and start listening</h2>
        <h2>Happy listening!</h2>
        <Player />
      </header>
    </div>
  );
}

export default App;
