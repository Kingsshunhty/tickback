import express from "express";
import cors from "cors";

import registerRoutes from "./routes/register.js";
import loginRoutes from "./routes/login.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tickont-7nh7.onrender.com",
      "https://tickont-gxdd.onrender.com",
      "https://tick-ont.onrender.com",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/passkey/register", registerRoutes);
app.use("/passkey/login", loginRoutes);

app.get("/", (_, res) => {
  res.send("Passkey API Running");
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});