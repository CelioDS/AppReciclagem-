import "./App.css";
import NavBar from "./componentes/layout/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//2 Reproveitamento de estrutura
import { Outlet } from "react-router-dom";
import { useState } from "react";

// 4- nagegando entre paginas
function App() {
  const [zoomPage, setZoomPage] = useState(
    localStorage.getItem("FontSize") || 1
  );
  useState(() => {
    console.log(localStorage.getItem("FontSize"));
    setZoomPage(localStorage.getItem("FontSize"));
  }, [zoomPage]);

  return (
    <div className="App" style={{ zoom: zoomPage }}>
      <NavBar />
      <Outlet />
      <ToastContainer
        pauseOnHover={false}
        autoClose={3000}
        position={toast.POSITION.BOTTOM_RIGHT}
      />
    </div>
  );
}

export default App;
