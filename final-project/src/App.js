import Header from './components/Header.js'
import Card from './components/card.js'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import AddMovie from './components/AddMovie.js'
import Detail from './components/Detail.js';
import { createContext, useState } from 'react';
import Enter from './components/Enter.js'
import Enterin from './components/Enterin.js'


const Appstate = createContext();
function App() {
  const [login, setlogin] = useState(false);
  const [userName, setuserName] = useState("");
  return (
    <Appstate.Provider value={{ login, userName, setlogin, setuserName }}>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <div className="main">
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="/AddMovie" element={<AddMovie />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/enter" element={<Enter />} />
            <Route path="/enterin" element={<Enterin />} />
          </Routes>
        </div>
      </div>
    </Appstate.Provider>
  );
}
export { Appstate };
export default App;
