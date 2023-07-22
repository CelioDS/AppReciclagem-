import style from "./Home.module.css";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Input from "../layout/Input";

export default function Home() {
  const ref = useRef();
  const [hora, setHora] = useState(new Date());
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
    setCaixa(0);
    setEntrada(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "saida") {
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

  async function handleSubmit(e) {
    e.preventDefault();
    setHora(new Date());
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    setHora(`${hour}:${minutes}:${seconds}`);
    const dadosForm = ref.current;

    if (
      !dadosForm.dataNew.value ||
      !dadosForm.movimentacao.value ||
      !dadosForm.descricao.value ||
      !dadosForm.valor.value
    ) {
      return toast.warn("Preencha todos os campos!!!");
    } else {
      await axios
        .post("http://localhost:8800", {
          dataNew: `${hora} ${dadosForm.dataNew.value}`,
          movimentacao: dadosForm.movimentacao.value,
          descricao: dadosForm.descricao.value,
          valor: dadosForm.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    dadosForm.dataNew.value = "";
    dadosForm.movimentacao.value = "";
    dadosForm.descricao.value = "";
    dadosForm.valor.value = "";

    GetDB();
  }

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

      <form ref={ref} onSubmit={handleSubmit}>
        <Input
          text="DATA"
          placeholder="data"
          type="date"
          id="dataNew"
          name="dataNew"
          className={style.input}
        />
        <Input
          text="MOVIMENTAÇÃO"
          placeholder="Entrada ou Saida"
          type="text"
          id="movimentacao"
          name="movimentacao"
          className={style.input}
        />

        <Input
          text="DESCRIÇÃO"
          placeholder="Descrição"
          type="text"
          id="descricao"
          name="descricao"
          className={style.input}
        />
        <Input
          text="VALOR"
          placeholder="valor"
          type="number"
          id="valor"
          name="valor"
          className={style.input}
        />

        <button typeof="submit">Salvar</button>
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
                data.movimentacao === "entrada"
                  ? { background: "#008000" }
                  : { background: "#800303fb" }
              }
            >
              <td>{data.dataNew}</td>
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
