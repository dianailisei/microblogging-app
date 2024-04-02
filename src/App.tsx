import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Posts from "./pages/Posts";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/feed" element={<Posts />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
