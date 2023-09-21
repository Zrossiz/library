import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/user/login", async (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

app.get("/api/books", async (req, res) => {
  res.status(200).json({
    message: "Get all books - success",
  });
});

app.get("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;

  if (!bookId) {
    return res.status(404).json({
      message: "Wrong name of book",
    });
  }

  res.status(200).json({
    BookId: bookId,
  });
});

app.post("/api/books", async (req, res) => {
  res.status(200).json({ success: true });
});

app.put("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;

  res.status(200).json({
    message: bookId,
  });
});

app.delete("/api/books/:id", (req, res) => {
  const bookId = req.params.id;

  res.status(200).json({
    message: bookId,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    console.log(`Server crashed by error`);
  }

  console.log(`Server started on port: ${PORT}`);
});
