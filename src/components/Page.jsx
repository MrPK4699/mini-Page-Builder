// Page.jsx

import React, { useState } from 'react';
import Element from './Element';
import Modal from './Modal';

const Page = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const elementType = event.dataTransfer.getData('text');
    const x = event.clientX;
    const y = event.clientY;
    const newElement = { id: Date.now(), title: elementType, x, y, config: {} };
    setElements([...elements, newElement]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    // console.log(event.clientX,event.clientY)
  };

  const handleElementClick = (id) => {
    setSelectedElement(id);
  };

  const handleElementDelete = () => {
    if (selectedElement !== null) {
      const updatedElements = elements.filter((element) => element.id !== selectedElement);
      setElements(updatedElements);
      setSelectedElement(null);
    }
  };

  const handleModalSave = (config) => {
    if (selectedElement !== null) {
      const updatedElements = elements.map((element) => {
        if (element.id === selectedElement) {
          return { ...element, config };
        }
        return element;
      });
      setElements(updatedElements);
      setSelectedElement(null);
    }
  };

  const handleElementMove = (id, newX, newY) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        return { ...element, x: newX, y: newY };
      }
      return element;
    });
    setElements(updatedElements);
  };

  return (
    <div className="page" onDrop={handleDrop} onDragOver={handleDragOver}>
      {elements.map((element) => (
        <Element
          key={element.id}
          id={element.id}
          title={element.title}
          x={element.x}
          y={element.y}
          isSelected={selectedElement === element.id}
          handleElementClick ={handleElementClick}
          handleElementDelete ={handleElementDelete}
          handleElementMove ={handleElementMove}
        />
      ))}
      {selectedElement !== null && (
        <Modal
          config={elements.find((element) => element.id === selectedElement)}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default Page;
