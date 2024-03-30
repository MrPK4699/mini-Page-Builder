// // // Modal.jsx

// // import React, { useState } from 'react';

// // const Modal = () => {
// //   const [config, setConfig] = useState({});

// //   const handleChange = (event) => {
// //     const { name, value } = event.target;
// //     setConfig({ ...config, [name]: value });
// //   };

// //   const handleSave = () => {
// //     // Handle save changes
// //   };

// //   return (
// //     <div className="modal">
// //       <input type="text" name="config1" onChange={handleChange} value={config.config1} />
// //       <input type="text" name="config2" onChange={handleChange} value={config.config2} />
// //       <button onClick={handleSave}>Save</button>
// //     </div>
// //   );
// // };

// // export default Modal;
// import React, { useState } from 'react';

// const Modal = ({ onSave }) => {
//   const [config, setConfig] = useState({});

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setConfig({ ...config, [name]: value });
//   };

//   const handleSave = () => {
//     onSave(config);
//     setConfig({}); // Clear config after saving
//   };

//   return (
//     <div className="modal">
//       <input type="text" name="config1" onChange={handleChange} value={config.config1 || ''} placeholder="Config 1" />
//       <input type="text" name="config2" onChange={handleChange} value={config.config2 || ''} placeholder="Config 2" />
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };

// export default Modal;

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
