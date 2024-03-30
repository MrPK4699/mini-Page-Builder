// Modal.jsx


import React, { useState } from 'react';

const Modal = ({ config, onSave }) => {
  // const [title, setTitle] = useState(config.title || '');
  // const [color, setColor] = useState(config.color || '');
  const [eleConfig, setEleConfig] = useState(config || '');

  const onChange= (name,value)=>{
    setEleConfig({...eleConfig, name:value})
  }
  const handleSave = () => {
    onSave(eleConfig);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSave}>
        <label>Title </label>
        <input type="text" value={eleConfig.title} onChange={(e) => onChange(e.target.name , e.target.value)} placeholder="Title" name='title'/> <br/>
        <label>X </label>
        <input type="number" value={eleConfig.X} onChange={(e) => onChange(e.target.name , e.target.value)} placeholder="X" name='x'/> <br/>
        <label>Y </label>
        <input type="number" value={eleConfig.Y} onChange={(e) => onChange(e.target.name , e.target.value)} placeholder="Y" name='y'/> <br/>
        <label>Color </label>
        <input type="text" value={eleConfig.color} onChange={(e) => onChange(e.target.name , e.target.value)} placeholder="Color" name='color '/><br/>
        <button> Save </button>
      </form>
    </div>
  );
};

export default Modal;
