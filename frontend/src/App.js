import "./App.css";
import NavBar from "./componentes/layout/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//2 Reproveitamento de estrutura
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// 4- nagegando entre paginas
function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [pass, setPass] = useState(localStorage.getItem("pass") || "");
  const [permission, setPermission] = useState(false);
  const [erro, seterro] = useState(false);

  const [zoomPage, setZoomPage] = useState(
    localStorage.getItem("FontSize") || 1
  );
  useState(() => {
    setZoomPage(localStorage.getItem("FontSize"));
  }, [zoomPage]);

  useEffect(() => {
    if (
      user === process.env.REACT_APP_USER &&
      pass === process.env.REACT_APP_PASS
    ) {
      setPermission(true);
      localStorage.setItem("user", process.env.REACT_APP_USER);
      localStorage.setItem("pass", process.env.REACT_APP_PASS);
    }
  }, [pass, user]);

  function handleLogin(e) {
    e.preventDefault();

    if (
      user === process.env.REACT_APP_USER &&
      pass === process.env.REACT_APP_PASS
    ) {
      setPermission(true);
      localStorage.setItem("user", process.env.REACT_APP_USER);
      localStorage.setItem("pass", process.env.REACT_APP_PASS);
    } else {
      seterro(true);
      setTimeout(() => {
        seterro(false);
      }, 3000);

      toast.error("Credencias invalida!!!");
    }
  }
  return (
    <div className="App" style={{ zoom: zoomPage }}>
      {permission && <NavBar />}
      {permission && <Outlet />}
      {!permission && (
        <form className={`login-form ${erro === true ? "erro" : ""}`}>
          <h2>Login</h2>
          <br />
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className={`login-input ${erro === true ? "erro" : ""}`}
          />
          <input
            type="password"
            placeholder="Senha"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={`login-input ${erro === true ? "erro" : ""}`}
          />
          <button
            onClick={handleLogin}
            onChange={handleLogin}
            className="login-button"
          >
            Entrar
          </button>
          {erro && <h6>Nâo é um terremoto e o Usuario/Senha errada!</h6>}
        </form>
      )}
      <ToastContainer
        pauseOnHover={false}
        autoClose={3000}
        position={toast.POSITION.BOTTOM_RIGHT}
      />
    </div>
  );
}

export default App;
