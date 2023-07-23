import style from "./Table.module.css";
import Mobile from "../function/CheckMobile";
import { useCallback } from "react";

export default function Table({ arrayDB }) {
  const checkMobile = useCallback(Mobile, []);
  const isMobile = checkMobile();
  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            {!isMobile && <th>data </th>}
            <th>movimentação</th>
            <th>descrição</th>
            <th>valor</th>
          </tr>
        </thead>
        <tbody>
          {arrayDB.map((dado, id) => (
            <tr key={id}>
              {!isMobile && <td>{dado.dataNew}</td>}
              <td
                style={
                  dado.movimentacao === "Entrada"
                    ? { color: "#008000" }
                    : dado.movimentacao === "Saida"
                    ? { color: "#800303fb" }
                    : { color: "#0099ff" } // Terceiro valor para outra movimentação
                }
              >
                {dado.movimentacao}
              </td>
              <td>{dado.descricao}</td>
              <td
                style={
                  dado.movimentacao === "Entrada"
                    ? { color: "#008000", background: "#d9f0cf" }
                    : dado.movimentacao === "Saida"
                    ? { color: "#800303fb", background: "#FFC0CB" }
                    : { color: "#0099ff", background: "#87CEEB" } // Terceiro valor para outra movimentação
                }
              >
                {dado.valor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
