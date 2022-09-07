//Imports dependances
const http = require("http");
const app = require("./app");

//Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

//recherche les différentes erreurs et les gère de manière appropriée
const errorServer = (error) => {
  if (error.syscall !== "listen") throw error;
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port" + port;
  switch (error.code) {
    case "NOACCESS":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + "is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Create Server
const server = http.createServer(app);

server.on("error", errorServer);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port " + port;
  console.log("Listening on " + bind);
});
//Strart Server
server.listen(port);
