import express from "express";
import { BookRoutes } from "./routes/book.routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;

const bookRoutes = new BookRoutes().getRoutes();

app.use("/api/books", bookRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
