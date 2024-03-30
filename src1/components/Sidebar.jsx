// Sidebar.jsx

import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>BLOCKS</h1>
      <div draggable className="element" data-type="Label">Label</div>
      <div draggable className="element" data-type="Input">Input</div>
      <div draggable className="element" data-type="Button">Button</div>
    </div>
  );
};

export default Sidebar;

