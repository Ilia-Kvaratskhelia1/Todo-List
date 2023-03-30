import "./Todo.css";
import flowers from "./images/sun.png";
import React, { useState, useReducer} from "react";
import { IoIosAdd } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { FiCircle } from "react-icons/fi";

function Todo() {
  
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const time = new Date();
  const day = weekday[time.getDay()];
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const globalDate = `${hours}:${minutes}${hours >= 12 ? "PM" : "AM"}`;
  
  const ACTION_TYPE = {
    ADD: "add-todo",
    TOGGLE: "toggle-todo",
    REMOVE: "remove-toto",
  };

  const reducer = (todos, action) => {
    switch (action.type) {
      case ACTION_TYPE.ADD:
        return [...todos, NewTodo(action.payload.name)];

      case ACTION_TYPE.REMOVE:
        return todos.filter((item) => item.id !== action.payload.id);
      
      case ACTION_TYPE.TOGGLE:
        return todos.map((item)=>{
          if(item.id === action.payload.id){
            return {...item , complete:!item.complete}
          }
          return item;
        })
      default:
        return todos;
    }
  };
  const NewTodo = (name) => {
    return { id: Date.now(), name, complete: false };
  };
  const addItem = (e) => {
    e.preventDefault(); 
    if(name !== ''){
      disppatch({ type: ACTION_TYPE.ADD, payload: { name: name } });
      setName("");
    }else {
      alert("Please Fill Plan")
    }   
   
  };
  const [todo, disppatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  return (
    <div className="todoContainer">
     <div className="time">
     <p className="mainDay">{day}</p>
      <p className="mainDate">{globalDate}</p>
     </div>
      <img className="flowers" src={flowers} />
        <div className="AddSection">
          <TfiArrowCircleRight style={search.style} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Plane..."
          />
          <button onClick={addItem}>
            <IoIosAdd style={icon.style} />
          </button>
        </div>
      <div className="itemsSection">
        {todo.map((item) => {
          return (
            <div className="todoItems" key={item.id}>
              <li className="todoLeftSide">
                {item.name}
                <br></br>
                <span className="timeZone">{item.hours}</span>
              </li>
              <div className="iconsSection">
                
                <span
                onClick={() =>
                  disppatch({
                    type: ACTION_TYPE.TOGGLE,
                    payload: { id: item.id },
                  })
                }
                >
                  {item.complete ?
                     <TfiArrowCircleRight style={agree.style} />
                  : <FiCircle style={agree.style}/>}
                </span>
                <BsTrash
                  style={trash.style}
                  onClick={() =>
                    disppatch({
                      type: ACTION_TYPE.REMOVE,
                      payload: { id: item.id },
                    })
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const icon = {
  style: { width: "60px", height: "35px", cursor: "pointer" },
};
const trash = {
  style: { width: "60px", height: "35px", color: "red", cursor: "pointer" },
};

const agree = {
  style: {
    width: "60px",
    height: "35px",
    color: "green",
    rotate: "90deg",
    cursor: "pointer",
  },
};
const search = {
  style: {
    width: "40px",
    height: "25px",
    color: "green",
    rotate: "90deg",
    position: "absolute",
    top: "10px",
  },
};
export default Todo;
