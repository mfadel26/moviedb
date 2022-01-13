import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Homes from "./pages/Homes";

export default function App() {
  return (
    <Router>
     <Route exact path ={'/'} component={Home}/>
     <Route exact path ={'/home'} component={Homes}/>
   </Router>
  );
}