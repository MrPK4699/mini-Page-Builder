import React, { useRef, useState } from 'react';
import './DraggableElement.css';

const DraggableElement = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  // let ele= document.getElementById('draggable-element');
  // let rect= ele.getBoundingClientRect();
  
  const ele = useRef(null)
  const handleMouseDown = (event) => {
    setDragging(true);
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y
    });
    console.log('mouse-down');
    console.log(event.clientX, event.clientY);
  };
  
  const handleMouseMove = (event) => {
    const rect = ele.current.getBoundingClientRect();
    console.log(rect.left,rect.right,rect.top,rect.bottom)
    // if(){
    //   handleMouseUp();
    // }
    // if (dragging ) {
    if (dragging && ( rect.top>=0 || rect.left>=0 ) ) {
      setPosition({
        x: event.clientX - offset.x,
        y: event.clientY - offset.y
      });
    }
    console.log('mouse-move');
    console.log(event.clientX, event.clientY);
  };

  const handleMouseUp = () => {
    setDragging(false);
    console.log('mouse-up');
    // console.log(event.clientX, event.clientY);
  };

  return (
    <div
      className="draggable-element"
      ref={ele}
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      Drag me!
    </div>
  );
};

export default DraggableElement;
