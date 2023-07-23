import "./App.css";
import NavBar from "./componentes/layout/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//2 Reproveitamento de estrutura
import { Outlet } from "react-router-dom";

// 4- nagegando entre paginas

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet/>
      <ToastContainer
        pauseOnHover={false}
        autoClose={3000}
        position={toast.POSITION.BOTTOM_RIGHT}
      />
    </div>
  );
}

export default App;
