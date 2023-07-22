import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "*C&liothug01*",
  database: "sucatas",
});
