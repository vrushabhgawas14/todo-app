import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Router>
  );
}
