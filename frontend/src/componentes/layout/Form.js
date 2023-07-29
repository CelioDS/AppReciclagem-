import { useState, useRef, useEffect } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import Input from "../layout/Input";

import style from "./Form.module.css";

export default function Form({ GetDB, EditCadastro, setEditCadastro }) {
  const ref = useRef();
  const [isSubmit, setIsSubmit] = useState(false);

  const [typeQuantidade, setTypeQuantidade] = useState("");

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Estado para controlar o valor do campo de data

  useEffect(() => {
    if (EditCadastro) {
      const dadosForm = ref.current;

      dadosForm.movimentacao.value = EditCadastro.movimentacao;
      dadosForm.quantidade.value = EditCadastro.quantidade;
      dadosForm.descricao.value = EditCadastro.descricao;
      dadosForm.valor.value = EditCadastro.valor;
    }
  }, [EditCadastro]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmit) return; // Impede o envio duplicado enquanto a requisição anterior ainda não foi concluída

    setIsSubmit(true); // Inicia o envio do formulário

    const dadosForm = ref.current;

    if (
      !dadosForm.dataNew.value ||
      !dadosForm.movimentacao.value ||
      !dadosForm.descricao.value ||
      !dadosForm.valor.value
    ) {
      setIsSubmit(false); // Reabilita o botão após o envio do formulário
      return toast.warn("Preencha todos os campos!!!");
    }
    if (EditCadastro) {
      await axios
        .put(process.env.REACT_APP_DB_API + EditCadastro.id, {
          movimentacao: dadosForm.movimentacao.value,
          descricao: dadosForm.descricao.value,
          quantidade: dadosForm.quantidade.value,
          valor: dadosForm.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      const dataParts = dadosForm.dataNew.value.split("-");
      const dataInvertida = dataParts.reverse().join("-");
      await axios
        .post(process.env.REACT_APP_DB_API, {
          dataNew: ` ${dataInvertida}`,
          movimentacao: dadosForm.movimentacao.value,
          descricao: dadosForm.descricao.value,
          quantidade: dadosForm.quantidade.value,
          valor: dadosForm.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    dadosForm.dataNew.value = "";
    dadosForm.movimentacao.value = "";
    dadosForm.quantidade.value = "";
    dadosForm.descricao.value = "";
    dadosForm.valor.value = "";

    GetDB();
    setEditCadastro(null);
    setIsSubmit(false); // Reabilita o botão após o envio do formulário
  }
  function handleNumber(e) {
    const inputValue = e.target.value;
    const floatValue = parseFloat(inputValue);
    if (isNaN(floatValue) || floatValue < 0) {
      e.target.value = ""; // Limpa o valor do input se não for um número de ponto flutuante válido ou se for negativo
    }
  }
  function handleValida(e) {
    const dadosForm = ref.current;
    const inputValue = e.target.value;

    if (
      dadosForm.descricao.value === "funcionarios" ||
      dadosForm.descricao.value === "gastosEmpresa"
    ) {
      setTypeQuantidade("especifique");
    } else {
      setTypeQuantidade("");
    }

    if (inputValue === "Caixa") {
      dadosForm.quantidade.value = 0;
      dadosForm.quantidade.disabled = true; // Desabilitar o campo de entrada
    } else {
      dadosForm.quantidade.value = "";
      dadosForm.quantidade.disabled = false;
    }
  }

  return (
    <form ref={ref} onSubmit={handleSubmit} className={style.form}>
      <div style={{ display: "none" }}>
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
      </div>

      <div className={style.selectInput} onChange={handleValida}>
        <label>MOVIMENTAÇÂO</label>
        <select id="movimentacao" onChange={handleValida}>
          <option value="">Selecione</option>
          <option value="Entrada">Entrada</option>
          <option value="Saida">Saida</option>
          <option value="Caixa">Caixa</option>
        </select>
      </div>

      <Input
        text="DESCRIÇÃO"
        placeholder="Digite a Descrição aqui"
        type="text"
        id="descricao"
        name="descricao"
        className={style.input}
      />

      {typeQuantidade === "especifique" ? (
        <Input
          text="ESPECIFIQUE"
          placeholder="Digite o motivo "
          type="text"
          id="quantidade"
          name="quantidade"
          className={style.input}
        />
      ) : (
        <Input
          text="QUANTIDADE(KG)"
          placeholder="Digite o peso KG"
          type="text"
          id="quantidade"
          name="quantidade"
          min="0"
          onChange={handleNumber}
          className={style.input}
        />
      )}

      <Input
        text="VALOR(R$)"
        placeholder="Digite o Valor aqui"
        type="text"
        id="valor"
        name="valor"
        min="0"
        onChange={handleNumber}
        className={style.input}
      />
      <div>
        <button disabled={isSubmit} type="submit">
          {isSubmit ? "SALVANDO..." : "SALVAR"}
        </button>
      </div>
    </form>
  );
}
