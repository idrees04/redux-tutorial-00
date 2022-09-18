import { createStore } from "redux";
const app = document.getElementById("root");
const increment = document.getElementById("inc");
const decrement = document.getElementById("dec");
//these are 3 actions related to counter reducer
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";
//these are 3 action creators related to counter reducer
const incr =(num)=>{
    return{"type":"INCREMENT", payload:num }
};
const decr =(num)=>{
    return{"type":"DECREMENT", payload:num}
};
const res =()=>{
    return{"type":"RESET"}
};


const reset = document.getElementById("reset");
const counter = (state = {value : 1}, action = {}) => {
    switch (action.type) {
        case INCREMENT:
            return {value: state.value + action.payload};
        case DECREMENT:
            return {value: state.value  - action.payload};
        case RESET:
            return {value:1};
        default:
            return state;
    }
};
//Redux store for Counter App
const store = createStore(counter);
console.log(store);
store.subscribe(() => {  
      let {value} = store.getState();
      app.innerHTML = value;
      value < 10 ? increment.removeAttribute("disabled")
      : increment.setAttribute("disabled", "disabled");

      value > 1 ? decrement.removeAttribute("disabled")
      : decrement.setAttribute("disabled", "disabled");
});

window.onload = function () {
    store.dispatch({ type: "INIT" });
};
increment.addEventListener("click", () => {
    //store.getState() < 10 && store.dispatch({ type: INCREMENT });
  //  store.getState() < 10 && store.dispatch(incr(2));
    const num = +document.getElementById('num').value
    store.getState().value < 10 && store.dispatch(incr(num));

});
decrement.addEventListener("click", () => {
   // store.getState() > 1 &&  store.dispatch({ type: DECREMENT });
  // store.getState() > 1 &&  store.dispatch(decr(2));
   const num = +document.getElementById('num').value
   store.getState().value > 1 &&  store.dispatch(decr(num));


});
reset.addEventListener("click", () => {
   // store.dispatch({ type: RESET });
   store.dispatch(res());

});