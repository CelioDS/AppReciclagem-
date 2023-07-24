import style from "./Header.module.css";

export default function Header({entrada, saida, caixa}) {
  return (
    <header className={style.header}>
      <div>
        <h1>ENTRADA</h1>
        <span>
          <h1>R$ {entrada}</h1>
        </span>
      </div>
      <div>
        <h1>SAÍDA</h1>
        <span>
          <h1>R$ {saida}</h1>
        </span>
      </div>
      <div>
        <h1>CAIXA</h1>
        <span>
          <h1>R$ {caixa + entrada - saida}</h1>
        </span>
      </div>
    </header>
  );
}
