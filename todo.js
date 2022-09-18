import { createStore } from "redux";
import {v4 as uuid} from "uuid";
const app = document.getElementById("app");
const todoText = document.getElementById("todo");
const addBtn=document.getElementById("add_todo");
//define actions related to todo app
const ADD_TODO="ADD_TODO";
const REM_TODO="REM_TODO";
const TOGGLE_TODO="TOGGLE_TODO";
//define action creators for todo app
const add =(todo)=>{
    return{type : ADD_TODO, payload : todo}
}
const remove =(id)=>{
    return {type: REM_TODO, payload: id}
}
const toggle =(id)=>{
    return {type: TOGGLE_TODO, payload: id}
}
//define reducer for todo app
const todoReducer = (state=[], action={})=>{
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload];
        case REM_TODO:
            return state.filter(todo=>todo.id!==action.payload)
        case TOGGLE_TODO:
            return state.map((todo)=>
            todo.id== action.payload?{...todo, completed:!todo.completed}: todo
            )
        default:
            return state;
        }
    };
    // define store for todo app
    const store= createStore(todoReducer);
    //define subscribe to store for todo app
    store.subscribe(()=>{
        const todos= store.getState();
        const textItem = todos.length > 0 ? "": "<li>There are no todo items...</li>";
        app.innerHTML= textItem;
        todos.length > 0 && todos.forEach((todo) => {
            const li = document.createElement("li");
            li.type="list";
            li.setAttribute('data-id',todo.id);
            const itemClass= todo.completed ? "completed" : "notcompleted";
            li.classList.add(itemClass);
            const btnRem = document.createElement("button");
            btnRem.type="button";
            btnRem.classList.add("rem-todo");
            btnRem.setAttribute('data-id',todo.id);
            const btnText=document.createTextNode("x");
            const text = document.createTextNode(todo.title);
            btnRem.appendChild(btnText);
            li.appendChild(text);
            li.appendChild(btnRem);
            app.appendChild(li);
        });
        
    });
    addBtn.addEventListener(
        "click", 
        ()=> 
        todoText.value != "" && store.dispatch({
             type: ADD_TODO, 
             payload: { id : uuid(), title: todoText.value, completed: false},
})
);
app.addEventListener("click",(e)=>{
  //  console.log(e.target.dataset.id);
    const id=e.target.dataset.id;
    const type = e.target.type==="button"? REM_TODO : TOGGLE_TODO;
    id != undefined && store.dispatch({
        type: type,
        payload: id,
    });
});