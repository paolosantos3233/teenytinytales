import React, { useState, useEffect } from 'react';
import { eel } from "./eel.js";
import './App.css';
import TaleBook from './Book.js';
import EmptyBook from './EmptyBook.js';

import background from "./assets/background.png";
import menu_bg from "./assets/menu_bg.png";
import generate_button from "./assets/generate_button.png";

eel.set_host("ws://localhost:8888");
/*

TODO

WRITE INSTRUCTIONS BOOK
DESIGN ACCESSIBILITY BUTTONS
POLISH OVERALL FRONTEND

*/
function App() {
  const [generatedContent, setGeneratedContent] = useState("Enter prompt to start...\n");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStart, setloadingStart] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  }

  const handleButtonClick = () => {
    setIsLoading(true);
    if (prompt !== "") {
      setloadingStart(true);
      eel.generate(prompt)().then(result => {
        setGeneratedContent(result);
        setIsLoading(false);
        setloadingStart(false);
      });
    }
  }
  
  const generatePages = (content) => {
    const lines = content.split('\n');
    return lines.map((line, index) => <div key={index}>{line}</div>);
  }

  let bookClassName = isLoading ? "BookLoading" : "Book";
  let emptyBookClassName = loadingStart ? "emptyBookLoading" : "emptyBook";
  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <div className="Content">
        <div className="Menu">
          <img className="MenuBg" src={menu_bg} alt="menu" />
          <textarea className="Input" placeholder="Start your story here..." onChange={handleInputChange} />
          <button className="Button" onClick={handleButtonClick}>
            <img className="ButtonImg" src={generate_button} alt="Generate" />
          </button>
        </div>
        <div className={bookClassName}>
          {isLoading ? <EmptyBook emptyBookClassName={emptyBookClassName}/> : <TaleBook generatedContent={generatePages(generatedContent)} />}
        </div>
      </div>
    </div>
  );
}

export default App;