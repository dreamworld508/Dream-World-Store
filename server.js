const http = require("http");
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose(); // Import SQLite3

// Create or connect to SQLite database
const db = new sqlite3.Database("orders.db");

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phoneNumber TEXT,
    department TEXT,
    customization TEXT,
    cardTitle TEXT,
    numberOfItems INTEGER,
    totalPrice TEXT
)`);

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  let filePath = "." + req.url; // (original)
  if (filePath === "./") {
    filePath = "./index.html";
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;
  }

  if (req.method === "POST" && req.url === "/insertOrder") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const orderData = JSON.parse(body);
      insertOrder(orderData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Order inserted successfully" }));
    });
  } else {
    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === "ENOENT") {
          res.writeHead(404);
          res.end("404 Not Found");
        } else {
          res.writeHead(500);
          res.end("Internal Server Error: " + error.code);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Function to insert data into SQLite database
function insertOrder(orderData) {
  db.run(
    `INSERT INTO orders (name, phoneNumber, department, customization, cardTitle, numberOfItems, totalPrice)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      orderData.name,
      orderData.phoneNumber,
      orderData.department,
      orderData.customization,
      orderData.cardTitle,
      orderData.numberOfItems,
      orderData.totalPrice,
    ],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`A new order has been inserted with rowid ${this.lastID}`);
    }
  );
}
