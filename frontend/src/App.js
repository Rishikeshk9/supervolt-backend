import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddType from "./components/AddType/AddType";
import AddDept from "./components/AddDept/AddDept";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import AddDesignation from "./components/AddDesignation/AddDesignation";

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/create/station" element={<AddDept />}></Route>
        <Route path="/create/type" element={<AddType />} />
        <Route path="/create/designation" element={<AddDesignation />} />
        <Route path="/create/vehicle" element={<AddEmployee />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
