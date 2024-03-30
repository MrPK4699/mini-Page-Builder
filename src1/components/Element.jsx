// // // Element.jsx

// // import React from 'react';
// // import Modal from './Modal';

// // const Element = ({ type, x, y }) => {
// //   const handleClick = () => {
// //     // Handle element selection
// //   };

// //   return (
// //     <div className="element" style={{ position: 'absolute', left: x, top: y }} onClick={handleClick}>
// //       {type}
// //       <Modal />
// //     </div>
// //   );
// // };

// // export default Element;
// import React from 'react';

// const Element = ({ index, type, x, y, config, onClick, onDelete }) => {
//   const handleClick = () => {
//     onClick(index);
//   };

//   const handleDelete = () => {
//     onDelete(index);
//   };

//   return (
//     <div className="element" style={{ position: 'absolute', left: x, top: y }} onClick={handleClick}>
//       {type}
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default Element;

import React from 'react';

const Element = ({ id, type, x, y, isSelected, handleElementClick,  handleElementDelete,  handleElementMove }) => {
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
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {type}
      {/* <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
};

export default Element;
