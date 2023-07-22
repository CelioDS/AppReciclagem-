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
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Estado para controlar o valor do campo de data

  function filterByCurrentMonth(dataArray) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Os meses em JavaScript são indexados em zero (janeiro é 0), por isso adicionamos 1 ao mês atual.

    return dataArray.filter((data) => {
      const dataParts = data.dataNew.split("-");
      const dataMonth = parseInt(dataParts[1]);

      return dataMonth === currentMonth;
    });
  }

  async function GetDB() {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_API);
      const filteredData = filterByCurrentMonth(res.data.reverse());
      setArrayDB(filteredData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    setHora(`${hour}:${minutes}:${seconds}`); // Atualiza o estado com o horário atual
  }, []); // O segundo argumento vazio indica que este efeito será executado apenas uma vez na montagem do componente

  useEffect(() => {
    GetDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setArrayDB]);

  useEffect(() => {
    setCaixa(0);
    setEntrada(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "entrada") {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );
    setSaida(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "saida") {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );
  }, [arrayDB]);

  async function handleSubmit(e) {
    e.preventDefault();

    const dadosForm = ref.current;

    if (
      !dadosForm.dataNew.value ||
      !dadosForm.movimentacao.value ||
      !dadosForm.descricao.value ||
      !dadosForm.valor.value
    ) {
      return toast.warn("Preencha todos os campos!!!");
    } else {
      const dataParts = dadosForm.dataNew.value.split("-");
      const dataInvertida = dataParts.reverse().join("-");
      await axios
        .post(process.env.REACT_APP_DB_API, {
          dataNew: `${hora} ${dataInvertida}`,
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
          value={currentDate} // Usar o estado currentDate como valor do campo de data
          onChange={(e) => setCurrentDate(e.target.value)} // Atualizar o estado currentDate quando o valor do campo mudar
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
        <Input type="submit" className={style.input} />
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
          {arrayDB.map((dado, id) => (
            <tr
              key={id}
              style={
                dado.movimentacao === "entrada"
                  ? { background: "#008000" }
                  : { background: "#800303fb" }
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
    </main>
  );
}
