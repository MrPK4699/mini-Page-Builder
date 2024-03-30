// App.js
  
import React from 'react';
// import DraggableElement from './component/DraggableElement';
import Sidebar from './components/Sidebar';
import Page from './components/Page';
import './App.css';
  
const App = () => {
  return (
    // <DraggableElement/>
    <div className="app">
      <Page />
      <Sidebar />
    </div>
  );
};

export default App;
