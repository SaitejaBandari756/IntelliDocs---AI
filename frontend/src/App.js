import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Notebook from "./pages/Notebook";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/notebook/:id" element={<Notebook />} />
        
      </Routes>
    </BrowserRouter>
  );
}

