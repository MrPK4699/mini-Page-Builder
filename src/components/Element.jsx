// Element.jsx

import React from 'react';

const Element = ({ id, title, x, y, isSelected, handleElementClick,  handleElementDelete,  handleElementMove }) => {
  const handleClick = () => {
    handleElementClick(id);
  };

  const handleDelete = () => {
    handleElementDelete();
  };

  const handleMouseMove = (event) => {
    if (event.buttons === 1) {
      const newX = event.clientX;
      const newY = event.clientY;
      handleElementMove(id, newX, newY);
    }
  };

  return (
    <div
      draggable
      className={`element${isSelected ? ' selected' : ''}`}
      style={{ position: 'absolute', left: x, top: y }}
      // onClick={handleClick}
      // onMouseMove={handleMouseMove}
    >
      it's a {title}
      {/* <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
};

export default Element;
