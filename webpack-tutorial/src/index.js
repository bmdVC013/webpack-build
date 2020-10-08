// import "./style.css";
import "./style.scss";

// Code splitting, library compare.
import moment from "moment";

// load the module and use the function.
import { getUsers } from "./common/usersAPI";
getUsers().then(json => console.log(json));

// Dynamic imports
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  // A "naive" approach can use a static import to load the function.
  // getUsers().then(json => console.log(json));
  // -> The problem is that ES modules are static, meaning we cannot change imports at runtime.

  // With a dynamic import instead we can choose when to load our code.
  // Here we create a function to load the module dynamically:
  const getUserModule = () =>
    import(/* webpackChunkName: "usersAPI" */ "./common/usersAPI");

  getUserModule().then(({ getUsers }) => {
    getUsers().then(json => console.log(json));
  });
  // ->  "./common/usersAPI" loads only when clicking the button
});

const fancyFunc = () => {
  return [1, 2];
};

const [a, b] = fancyFunc();

console.log("Hello webpack!");
