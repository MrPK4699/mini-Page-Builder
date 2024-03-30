// // // Page.jsx

// // import React, { useState } from 'react';
// // import Element from './Element';

// // const Page = () => {
// //   const [elements, setElements] = useState([]);

// //   const handleDrop = (event) => {
// //     event.preventDefault();
// //     const elementType = event.dataTransfer.getData('elementType');
// //     const x = event.clientX;
// //     const y = event.clientY;
// //     const newElement = { type: elementType, x, y };
// //     setElements([...elements, newElement]);
// //   };

// //   const handleDragOver = (event) => {
// //     event.preventDefault();
// //   };

// //   return (
// //     <div className="page" onDrop={handleDrop} onDragOver={handleDragOver}>
// //       {elements.map((element, index) => (
// //         <Element key={index} type={element.type} x={element.x} y={element.y} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default Page;
// import React, { useState } from 'react';
// import Element from './Element';
// import Modal from './Modal';

// const Page = () => {
//   const [elements, setElements] = useState([]);
//   const [selectedElement, setSelectedElement] = useState(null);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const elementType = event.dataTransfer.getData('text');
//     const x = event.clientX;
//     const y = event.clientY;
//     const newElement = { type: elementType, x, y, config: {} };
//     setElements([...elements, newElement]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleElementClick = (index) => {
//     setSelectedElement(index);
//   };

//   const handleElementDelete = (index) => {
//     const updatedElements = elements.filter((element, i) => i !== index);
//     setElements(updatedElements);
//     setSelectedElement(null);
//   };

//   const handleModalSave = (config) => {
//     if (selectedElement !== null) {
//       const updatedElements = [...elements];
//       updatedElements[selectedElement].config = config;
//       setElements(updatedElements);
//       setSelectedElement(null);
//     }
//   };

//   return (
//     <div className="page" onDrop={handleDrop} onDragOver={handleDragOver}>
//       {elements.map((element, index) => (
//         <Element
//           key={index}
//           index={index}
//           type={element.type}
//           x={element.x}
//           y={element.y}
//           config={element.config}
//           onClick={handleElementClick}
//           onDelete={handleElementDelete}
//           // onClick={()=>console.log('pressed-enter')}
//           // onDelete={()=>console.log('pressed-delete')}
//         />
//       ))}
//       {selectedElement !== null && (
//         <Modal onSave={handleModalSave} />
//       )}
//     </div>
//   );
// };

// export default Page;

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
