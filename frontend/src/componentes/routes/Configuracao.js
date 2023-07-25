import style from "./Configuracao.module.css";
import FontSize from "../Function/FontSize";
import ChangeColor from "../Function/ChangeColor";

import { useEffect } from "react";

export default function Configuracao() {
  useEffect(() => {
    document.title = "Configuracao - BusinessHere";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className={style.main}>
      <h1>Configuracao</h1>
      <br />
      <FontSize />
      <ChangeColor />
    </main>
  );
}
