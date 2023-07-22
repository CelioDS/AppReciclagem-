import style from "./NavBar.module.css";

import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <main className={style.main}>
      <nav>
        <h1>FLUXO DE CAIXA</h1>
        <ul>
          <Link to="/"> materia prima</Link>
          <Link to="/cadastrar">depesa da empresa</Link>
        </ul>
      </nav>
    </main>
  );
}
