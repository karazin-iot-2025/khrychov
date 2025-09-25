const http = require("http");
const url = require("url");

let __power = false;

const server = http.createServer((request, response) => {
  const { pathname } = url.parse(request.url);
  console.log(pathname);
  console.log(request.method);
  if (pathname === "/conditioner/power") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ power: __power }));
  } else if (pathname === "/conditioner/on") {
    __power = true;
    response.writeHead(204);
    response.end();
  } else {
    response.writeHead(200, { "content-type": "text/plain" });
    response.end("<h1>Hello World!</h1>");
  }
});

server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
