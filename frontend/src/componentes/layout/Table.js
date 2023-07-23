import style from "./Table.module.css";

export default function Table({ arrayDB }) {
  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            <th>data</th>
            <th>movimentação</th>
            <th>descrição</th>
            <th>valor</th>
          </tr>
        </thead>
        <tbody>
          {arrayDB.map((dado, id) => (
            <tr
              key={id}
              style={
                dado.movimentacao === "Entrada"
                  ? { background: "#008000" }
                  : dado.movimentacao === "Saida"
                  ? { background: "#800303fb" }
                  : { background: "#0099ff" } // Terceiro valor para outra movimentação
              }
            >
              <td>{dado.dataNew}</td>
              <td>{dado.movimentacao}</td>
              <td>{dado.descricao}</td>
              <td>{dado.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
