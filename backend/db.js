import mysql from "mysql";

export const db = mysql.createConnection({
  host: "sql.freedb.tech",
  user: "freedb_bussinessname",
  password: "p2SNK9qUZW7!Vup",
  database: "freedb_bussiness",
});
