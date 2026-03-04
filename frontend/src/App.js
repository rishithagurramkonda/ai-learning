import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AIAssistant from "./components/AIAssistance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/smartAI" element={<AIAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;