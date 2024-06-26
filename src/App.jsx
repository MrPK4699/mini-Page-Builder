import React, { useState, useEffect, useRef } from "react";
// import React, { useState, useEffect, useRef, useContext } from "react";
// import ReactDOM from "react-dom";

import CustomModal from "./components/CustomModal";
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import useElementsStorage from "./customHooks/useElementsStorage";
import { handleElementDragStart } from "./helper";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [fontWeight, setFontWeight] = useState("");
  const [updateId, setUpdateId] = useState("");

  const [elements, setElement, deleteElement] = useElementsStorage();

  const mainRef = useRef();

  // Define elements to be used as blocks
  const ELEMENTBLOCKS = ["Label", "Input", "Button"];

  function handleBlockDragStart(e) {
    console.log("drag started", e);
    // set the sharable data on drop event
    e.dataTransfer.setData("element", e.target.innerText);
    e.dataTransfer.setData("type", e.target.dataset.type);
  }

  useEffect(() => {
    function handleDrop(e) {
      // disable the browser's default actions, like opening the url, file in case it's one
      e.preventDefault();
      console.log(e.dataTransfer.getData("type"), e.x, e.y);
      const elementType = e.dataTransfer.getData("type");
      if (elementType === "elementBlock") {
        setText("");
        setName(e.dataTransfer.getData("element"));
        setX(e.x);
        setY(e.y);
        setFontSize("");
        setFontWeight("");
        setUpdateId("");
        setShowModal(true);
      } else if (elementType === "addedElement") {
        const id = e.dataTransfer.getData("id");
        const element = document.querySelector(`#${id}`);
        if (element) {
          element.style.top = e.y + "px";
          element.style.left = e.x + "px";
          element.className = "added-element";
          setElement(element);
        }
      }
    }
    function enableDrag(e) {
      // allow the drop event for the element, by default most of the elements do not allow drop
      e.preventDefault();
    }
    function handleClick(e) {
      const focusedElement = mainRef.current.querySelector(
        ".added-element.focus"
      );
      if (focusedElement && e.target !== focusedElement) {
        focusedElement.classList.remove("focus");
      }
      if (e.target.classList.contains("added-element")) {
        e.target.classList.add("focus");
      }
    }
    function handleKeyUp(e) {
      const focusedElement = document.querySelector(".added-element.focus");
      if (focusedElement) {
        if (e.key === "Enter") {
          setUpdateId(focusedElement.id);
          setName(
            focusedElement.nodeName[0] +
              focusedElement.nodeName.slice(1).toLowerCase()
          );
          setX(
            focusedElement.style.left.slice(
              0,
              focusedElement.style.left.length - 2
            )
          );
          setY(
            focusedElement.style.top.slice(
              0,
              focusedElement.style.top.length - 2
            )
          );
          setFontSize(
            focusedElement.style.fontSize.slice(
              0,
              focusedElement.style.fontSize.length - 2
            )
          );
          setFontWeight(focusedElement.style.fontWeight);
          if (focusedElement.nodeName === "INPUT") {
            setText(focusedElement.placeholder);
          } else {
            setText(focusedElement.innerText);
          }
          setShowModal(true);
        } else if (e.key === "Delete") {
          console.log("delete pressed");
          deleteElement(focusedElement);
        }
      }
    }
    mainRef.current.addEventListener("drop", handleDrop);
    mainRef.current.addEventListener("dragover", enableDrag);
    mainRef.current.addEventListener("mousedown", handleClick);
    window.addEventListener("keyup", handleKeyUp);
  }, [deleteElement,setElement]);

  function createAddedElementsHTML() {
    const html = Object.entries(elements).reduce(
      (prevValue, currentValue) => prevValue + currentValue[1],
      ""
    );
    return {
      __html: html,
    };
  }

  useEffect(() => {
    mainRef.current.querySelectorAll(".added-element").forEach((element) => {
      // add drag start event listener to enable drag after creation as well
      element.ondragstart = function (e) {
        handleElementDragStart(e, element);
      };
    });
  }, [elements]);

  return (
    <>
      <CustomModal
        show={showModal}
        toggleFunc={setShowModal}
        name={name}
        x={x}
        y={y}
        text={text}
        fontSize={fontSize}
        fontWeight={fontWeight}
        setX={setX}
        setY={setY}
        setText={setText}
        setFontSize={setFontSize}
        setFontWeight={setFontWeight}
        updateId={updateId}
      />
      <div className="app">
        <main
          ref={mainRef}
          dangerouslySetInnerHTML={createAddedElementsHTML()}
        ></main>
        <aside>
          <h1>BLOCKS</h1>
          <section>
            {ELEMENTBLOCKS.map((element) => (
              <article
                draggable={true}
                onDragStart={handleBlockDragStart}
                key={element}
                className="element-block"
                data-type="elementBlock"
              >
                {element}
              </article>
            ))}
          </section>
        </aside>
      </div>
    </>
  );
}

export default App;
