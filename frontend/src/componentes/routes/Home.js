import style from "./Home.module.css";

import Input from "../layout/Input";

export default function Home() {
  return (
    <main className={style.main}>
      <h1>Fluxo de caixa</h1>
      <header>
        <div>
          <h1>ENTRADA</h1>
          <span>
            <h1> R$ +1000</h1>
          </span>
        </div>
        <div>
          <h1>SAÍDA</h1>
          <span>
            <h1>R$ -2000</h1>
          </span>
        </div>
        <div>
          <h1>CAIXA</h1>
          <span>
            <h1>R$ 3000</h1>
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
          text="MOVIMENTAÇÃO:"
          placeholder="Entrada ou Saida"
          type="text"
          id="Movimentação"
          name="Movimentação"
          className={style.input}
        />

        <Input
          text="DESCRIÇÃO:"
          placeholder="Descrição"
          type="text"
          id="Descrição"
          name="Descrição"
          className={style.input}
        />
        <Input
          text="VALOR:"
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
    </main>
  );
}
