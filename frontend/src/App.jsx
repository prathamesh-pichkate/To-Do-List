// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTodoForm from "./forms/CreateForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-todo" element={<CreateTodoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
