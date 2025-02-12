import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import UserPage from "./pages/UserPage";
import ItemPage from "./pages/ItemPage";

function App() {
  return (
    <Router>
      <div className="helvetica-neue">
        <Routes>
          <Route path="/users" element={<UserPage />} />
          <Route path="/item" element={<ItemPage />} />
          {/* <Route path="/users/:id" element={<UserDetail />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
