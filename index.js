import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import src from "./src/index.js";
console.log(process.env.NODE_ENV)
const app = express();
app.use(cors());
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
let port = process.env.PORT || 3000;
const io = new Server(
  app.listen(port, async () => {
    console.log("RESTful API server started on: " + port);
  }),
  {
    serveClient: false,
    cors: {
      origins: "*",
    },
  }
);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("err", err);
        const error = new Error("not authorized");
        return next(error);
      }
      socket.join(decoded.id);
      console.log("socket connected");
      next();
    });
  else {
    const error = new Error("not token");
    return next(error);
  }
});

io.on("connection", (socket) => {
  console.log(`user : ${socket.id} connection`);
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use("/api/v1", src);
export default app;
