import http from "http";

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end();
  }
});

server.listen(8080, () => {
  console.log("Server running on localhos:8080")
});
