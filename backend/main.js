const http = require("http");
const url = require("url");
const { getBodyData } = require("./utils/getBody");
const { WebSocketServer } = require("ws");

let __power = false;
let __targetTemp = 20;
let __currentTemp = 21;
const delta = 0.1;

function simulation() {
  if (Math.abs(__targetTemp - __currentTemp) > 0.1) {
    __currentTemp += delta * Math.sign(__targetTemp - __currentTemp);
    __currentTemp = +__currentTemp.toFixed(1);
  }
}

const server = http.createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  const { pathname } = url.parse(request.url);

  // /conditioners/{id}
  if (pathname.startsWith("/conditioners/")) {
    const id = pathname.split("/")[2];
    if (request.method === "GET") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(
        JSON.stringify({
          power: __power,
          targetTemp: __targetTemp,
          currentTemp: __currentTemp,
        })
      );
    } else if (request.method === "PATCH") {
      const body = await getBodyData(request);
      const { power, targetTemp } = JSON.parse(body);
      if (power !== undefined) {
        __power = power;
      }
      if (targetTemp !== undefined) {
        __targetTemp = targetTemp;
      }
      response.writeHead(204);
      response.end();
    }
  } else {
    response.writeHead(404, "Not found");
    response.end();
  }
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});

server.listen(8000, () => {
  setInterval(() => {
    simulation();
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          power: __power,
          targetTemp: __targetTemp,
          currentTemp: __currentTemp,
        })
      );
    });
  }, 1000);
  console.log("Server is running on http://localhost:8000");
});
