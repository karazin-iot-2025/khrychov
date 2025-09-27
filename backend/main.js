const http = require("http");
const url = require("url");
const { getBodyData } = require("./utils/getBody");

let __power = false;

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
  console.log(pathname);
  console.log(request.method);
  // /conditioners/{id}
  if (pathname.startsWith("/conditioners/")) {
    const id = pathname.split("/")[2];
    if (request.method === "GET") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ power: __power }));
    } else if (request.method === "PATCH") {
      const body = await getBodyData(request);
      const { power } = JSON.parse(body);
      __power = power;
      response.writeHead(204);
      response.end();
    }
  } else {
    response.writeHead(200, { "content-type": "text/plain" });
    response.end("<h1>Hello World!</h1>");
  }
});

server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
