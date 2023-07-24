import style from "./Configuracao.module.css";
import FontSize from "../function/FontSize";
import ChangeColor from "../function/ChangeColor";

export default function Configuracao() {
  return (
    <main className={style.main}>
      <h1>Configuracao</h1>
      <br />
      <FontSize />
      <ChangeColor />
    </main>
  );
}
