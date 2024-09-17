import GoogleUserLogo from './Logo';
import './App.css';
import KanbanBoard from './kanbanBoard';
import react, { useState, useEffect, useContext } from "react"
import axios from 'axios';
import { MyProvider, context } from './Context';


function App() {
  const {theme} = useContext(context)
   
  return (
    <div className={` min-h-screen ${theme ? " text-black" : "text-white"}`}>
      <KanbanBoard />
    </div>

  );
}

export default App;
