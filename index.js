import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign", (req, res) => {
  const token = jwt.sign(
    {
      username: req.body.username,
      password: req.body.password,
    },
    process.env.PRIVATE_KEY,
    {
      expiresIn: "7d",
    }
  );

  return res.json({
    result: "done",
    token: token,
  });
});

app.post("/verify", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.PRIVATE_KEY);
    return res.json({
      data: data,
    });
  } catch (error) {
    return res.json({
      result: "invalid_token",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
