import style from "./NavBar.module.css";
import { FaCog } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <main className={style.main}>
      <nav>
        <h1>FLUXO DE CAIXA</h1>
        <ul>
          <Link to="/"> Inicio</Link>
          <Link to="/Configuracao">
            <FaCog></FaCog>
          </Link>
        </ul>
      </nav>
    </main>
  );
}
