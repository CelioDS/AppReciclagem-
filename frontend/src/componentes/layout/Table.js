import style from "./Table.module.css";
import Mobile from "../function/CheckMobile";
import { useCallback } from "react";

import Loading from "./Loading";

export default function Table({ arrayDB }) {
  const checkMobile = useCallback(Mobile, []);
  const isMobile = checkMobile();

  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            {!isMobile && <th>id </th>}
            {!isMobile && <th>data </th>}
            <th>movimentação</th>
            <th>descrição</th>
            <th>quantidade(KG)</th>
            <th>valor</th>
            <th>preço por KG</th>
          </tr>
        </thead>
        <tbody>
          {arrayDB.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <Loading></Loading>
              </td>
            </tr>
          ) : (
            arrayDB.map(
              ({ id, dataNew, descricao, quantidade, movimentacao, valor }) => (
                <tr key={id}>
                  {!isMobile && (
                    <td
                      style={
                        movimentacao === "Entrada"
                          ? { color: "#008000" }
                          : movimentacao === "Saida"
                          ? { color: "#800303fb" }
                          : { color: "#0099ff" } // Terceiro valor para outra movimentação
                      }
                    >
                      {id + 1}
                    </td>
                  )}
                  {!isMobile && <td>{dataNew}</td>}
                  <td
                    style={
                      movimentacao === "Entrada"
                        ? { color: "#008000" }
                        : movimentacao === "Saida"
                        ? { color: "#800303fb" }
                        : { color: "#0099ff" } // Terceiro valor para outra movimentação
                    }
                  >
                    {movimentacao}
                  </td>
                  <td>{descricao}</td>
                  <td>{quantidade}</td>
                  <td
                    style={
                      movimentacao === "Entrada"
                        ? { color: "#008000", background: "#d9f0cf" }
                        : movimentacao === "Saida"
                        ? { color: "#800303fb", background: "#FFC0CB" }
                        : { color: "#0099ff", background: "#87CEEB" } // Terceiro valor para outra movimentação
                    }
                  >
                    {valor}
                  </td>
                  <td>
                    {movimentacao !== "Caixa"
                      ? parseFloat(valor / quantidade).toFixed(2)
                      : "-"}
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </section>
  );
}
