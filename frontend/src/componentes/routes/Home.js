import style from "./Home.module.css";

import Input from "../layout/Input";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [caixa, setCaixa] = useState(0);
  const [Entrada, setEntrada] = useState([]);
  const [saida, setSaida] = useState([]);
  const [arrayDB, setArrayDB] = useState([]);

  async function GetDB() {
    try {
      const res = await axios.get("http://localhost:8800");
      setArrayDB(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetDB();
  }, [setArrayDB]);

  useEffect(() => {
    setCaixa(1);
    setEntrada(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "saida" ) {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );
    setSaida(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "entrada") {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );
  }, [arrayDB]);

  return (
    <main className={style.main}>
      <h1>Fluxo de caixa</h1>
      <header>
        <div>
          <h1>ENTRADA</h1>
          <span>
            <h1> R$ + {Entrada}</h1>
          </span>
        </div>
        <div>
          <h1>SAÍDA</h1>
          <span>
            <h1>R$ - {saida}</h1>
          </span>
        </div>
        <div>
          <h1>CAIXA</h1>
          <span>
            <h1>R$ {caixa + Entrada - saida}</h1>
          </span>
        </div>
      </header>

      <form>
        <Input
          text="DATA"
          placeholder="data"
          type="date"
          id="data"
          name="data"
          className={style.input}
        />
        <Input
          text="MOVIMENTAÇÃO"
          placeholder="Entrada ou Saida"
          type="text"
          id="Movimentação"
          name="Movimentação"
          className={style.input}
        />

        <Input
          text="DESCRIÇÃO"
          placeholder="Descrição"
          type="select"
          id="Descrição"
          name="Descrição"
          className={style.input}
        />
        <Input
          text="VALOR"
          placeholder="valor"
          type="number"
          id="Valor"
          name="Valor"
          className={style.input}
        />

        <Input
          text="Salvar"
          placeholder="Salvar"
          type="submit"
          id="Salvar"
          name="Salvar"
          className={style.input}
        />
      </form>

      <table>
        <thead>
          <tr>
            <th>data</th>
            <th>movimentação</th>
            <th>descrição</th>
            <th>valor</th>
          </tr>
        </thead>
        <tbody>
          {arrayDB.map((data, id) => (
            <tr
              key={id}
              style={
                data.movimentacao === "saida"
                  ? { background: "#008000" }
                  : { background: "#800303fb" }
              }
            >
              <td>{data.data}</td>
              <td>{data.movimentacao}</td>
              <td>{data.descricao}</td>
              <td>{data.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
