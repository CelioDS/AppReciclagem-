import { db } from "../db.js";

export const getDB = (_, res) => {
  const query = "SELECT * FROM sucatas";

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.status(200).json(data);
  });
};

export const setDB = (req, res) => {
  const query =
    "INSERT INTO sucatas(`dataNew`,`movimentacao`,`descricao`,`quantidade`,`valor`) VALUES(?)";

  const values = [
    req.body.dataNew,
    req.body.movimentacao,
    req.body.descricao,
    req.body.quantidade,
    req.body.valor,
  ];

  db.query(query, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastrado com sucesso...");
  });
};

export const updateDB = (req, res) => {
  const query =
    "UPDATE sucatas SET  `movimentacao` = ?, `descricao` = ?, `quantidade` = ?, `valor` = ? WHERE `id` = ?";
  const values = [
    req.body.movimentacao,
    req.body.descricao,
    req.body.quantidade,
    req.body.valor,
  ];
  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastrado  atualizado... ");
  });
};

export const deleteDB = (req, res) => {
  const query = "DELETE FROM sucatas WHERE `id` = ? ";

  db.query(query, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastro deletado com Sucesso...");
  });
};
