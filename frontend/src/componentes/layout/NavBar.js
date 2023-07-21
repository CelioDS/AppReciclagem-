import style from "./NavBar.module.css";

import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <main className={style.main}>
      <nav>
        <h1> logo </h1>
        <ul>
          <Link to="/">home</Link>
          <Link to="/cadastrar">cadastro</Link>
        </ul>
      </nav>
    </main>
  );
}
