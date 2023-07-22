import { db } from "../db.js";

export const getDB = (_, res) => {
  const query = "SELECT * FROM dados";

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.status(200).json(data);
  });
};

