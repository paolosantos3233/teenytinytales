import React, { useState, useEffect } from 'react';
import { eel } from "./eel.js";
import './App.css';
import TaleBook from './Book.js';
import EmptyBook from './EmptyBook.js';

import background from "./assets/background.png";
import menu_bg from "./assets/menu_bg.png";

eel.set_host("ws://localhost:8888");
/*

TODO

DESIGN BUTTON AND INPUTS
WRITE INSTRUCTIONS
ADD LOADING ANIMATIONS
ADD BOOK ACCESSIBILITY BUTTONS
POLISH OVERALL FRONTEND

*/
function App() {
  const [generatedContent, setGeneratedContent] = useState("Enter prompt to start...\n");
  const [isLoading, setIsLoading] = useState(true);
  const [prompt, setPrompt] = useState("");

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  }

  const handleButtonClick = () => {
    setIsLoading(true);
    if (prompt !== "") {
      eel.generate(prompt)().then(result => {
        setGeneratedContent(result);
        setIsLoading(false);
      });
    }
  }
  
  const generatePages = (content) => {
    const lines = content.split('\n');
    return lines.map((line, index) => <div key={index}>{line}</div>);
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <div className="Content">
        <div className="Menu">
          <img className="MenuBg" src={menu_bg} alt="menu" />
          <input className="Input" type="text" placeholder="Enter a sentence" onChange={handleInputChange} />
          <button className="Button" onClick={handleButtonClick}>Generate</button>
        </div>
        <div className="Book">
          {isLoading ? <EmptyBook/> : <TaleBook generatedContent={generatePages(generatedContent)} />}
        </div>
      </div>
    </div>
  );
}

export default App;