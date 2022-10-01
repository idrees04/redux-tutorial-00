import { createStore } from "redux";
import {v4 as uuid} from "uuid";
import rootReducer, {incr, decr, res,ADD_TODO, REM_TODO, TOGGLE_TODO } from "./reducers";
const counterApp = document.getElementById("root");
const increment = document.getElementById("inc");
const decrement = document.getElementById("dec");
const cmpTask = document.getElementById("cmp");
const ncmpTask = document.getElementById("ncmp");

const todoText = document.getElementById("todo");
const addBtn=document.getElementById("add_todo");
const num = +document.getElementById('num').value
const reset = document.getElementById("reset");

//Redux store for Counter App
const store = createStore(rootReducer);
console.log(store);
store.subscribe(() => {  
    //counter app logic
      let {counter, todos} = store.getState();
      counterApp.innerHTML = counter.value;
      counter.value < 10 ? 
      increment.removeAttribute("disabled")
      : increment.setAttribute("disabled", "disabled");

      counter.value > 1 
      ? decrement.removeAttribute("disabled")
      : decrement.setAttribute("disabled", "disabled");
//todo app logic
const textItem = todos.length > 0 ? "": "<li>There are no todo items...</li>";
ncmpTask.innerHTML= textItem;
cmpTask.innerHTML= textItem;

todos.length > 0 && 
todos.forEach((todo) => {
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
    todo.completed ? cmpTask.appendChild(li) : ncmpTask.appendChild(li);

});

});

window.onload = function () {
    store.dispatch({ type: "INIT" });
};
increment.addEventListener("click", () => {
    //store.getState() < 10 && store.dispatch({ type: INCREMENT });
  //  store.getState() < 10 && store.dispatch(incr(2));
    store.getState().counter.value < 10 && store.dispatch(incr(num));

});
decrement.addEventListener("click", () => {
   // store.getState() > 1 &&  store.dispatch({ type: DECREMENT });
  // store.getState() > 1 &&  store.dispatch(decr(2));
   store.getState().counter.value > 1 &&  store.dispatch(decr(num));


});
reset.addEventListener("click", () => {
   // store.dispatch({ type: RESET });
   store.dispatch(res());

});

addBtn.addEventListener(
    "click", 
    ()=> 
    todoText.value != "" && store.dispatch({
         type: ADD_TODO, 
         payload: { id : uuid(), title: todoText.value, completed: false},
})
);
function taskHandler(e){
    const id=e.target.dataset.id;
    const type = e.target.type==="button"? REM_TODO : TOGGLE_TODO;
    id != undefined && store.dispatch({
        type: type,
        payload: id,
    });
}
ncmpTask.addEventListener("click",taskHandler);
cmpTask.addEventListener("click",taskHandler);