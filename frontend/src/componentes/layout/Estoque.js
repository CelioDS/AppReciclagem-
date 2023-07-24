import style from "./Estoque.module.css";

export default function Estoque({ ferro, papelao, plastico }) {
  return (
    <header className={style.header}>
      <div>
        <h1>ferro</h1>
        <span>
          <h1> {ferro}KG</h1>
        </span>
      </div>
      <div>
        <h1>papelao</h1>
        <span>
          <h1> {papelao}KG</h1>
        </span>
      </div>
      <div>
        <h1>plastico</h1>
        <span>
          <h1> {plastico}KG</h1>
        </span>
      </div>
    </header>
  );
}
