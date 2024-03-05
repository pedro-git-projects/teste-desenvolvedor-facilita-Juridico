import http from "http";

const Router = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  switch (url.pathname) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello form / \n");
      break;
    case "/route1":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello form route1 / \n");
      break;
    case "/route2":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello form route2 / \n");
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found\n");
  }
};

export default Router;
