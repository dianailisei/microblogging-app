import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile"; 
import { Provider } from "react-redux";
import store from "./store";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
