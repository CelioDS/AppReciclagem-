import style from "./Relatorios.module.css";
import Estoque from "../layout/Estoque";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../layout/Header";
import Table from "../layout/Table";

export default function Relatorios() {
  const [caixa, setCaixa] = useState([]);
  const [entrada, setEntrada] = useState([]);
  const [saida, setSaida] = useState([]);
  const [arrayDB, setArrayDB] = useState([]);

  const [ferro, setFerro] = useState([]);
  const [papelao, setPapelao] = useState([]);
  const [plastico, setPlastico] = useState([]);

  useEffect(() => {
    document.title = "Relatorios - fluxo de caixa";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function GetDB() {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_API);
      setArrayDB(res.data.reverse());
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    GetDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setArrayDB]);

  useEffect(() => {
    setCaixa(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "Caixa") {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );
    setEntrada(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "Entrada") {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );
    setSaida(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "Saida") {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );

    /* MATERIAIS */
    setPapelao(
      arrayDB.reduce((acumulador, data) => {
        if (data.descricao === "papelao" && data.movimentacao === "Entrada") {
          return acumulador + data.quantidade;
        } else {
          return acumulador;
        }
      }, 0)
    );
    setFerro(
      arrayDB.reduce((acumulador, data) => {
        if (data.descricao === "ferro" && data.movimentacao === "Entrada") {
          return data.quantidade + acumulador;
        } else {
          return acumulador;
        }
      }, 0)
    );
    setPlastico(
      arrayDB.reduce((acumulador, data) => {
        if (data.descricao === "plastico" && data.movimentacao === "Entrada") {
          return data.quantidade + acumulador;
        } else {
          return acumulador;
        }
      }, 0)
    );
  }, [arrayDB]);

  return (
    <main className={style.main}>
      <h1>Estoque de material </h1>
      <br />
      <Estoque papelao={papelao} ferro={ferro} plastico={plastico} />
      <Header entrada={entrada} saida={saida} caixa={caixa} />
      <h1>relatorio de todos os meses</h1>
      <Table arrayDB={arrayDB} />
    </main>
  );
}
