import { Request, Response } from "express";
import { BookService } from "../service/BookService";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async searchBooks(req: Request, res: Response): Promise<void> {
    const query: string = req.query.q as string;

    try {
      const books = await this.bookService.searchBooks(query);
      res.status(200).json(books);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).send("Erro ao buscar livros");
    }
  }

  async saveFavoriteBook(req: Request, res: Response): Promise<void> {
    const { title, description, imageUrl } = req.body;

    try {
      await this.bookService.saveFavoriteBook({ title, description, imageUrl });
      res.status(201).send("Livro adicionado ao favoritos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar livro como favorito:", error);
      res.status(500).send("Livro já foi adicionado como favorito!");
    }
  }

  async getAllFavoriteBooks(req: Request, res: Response): Promise<void> {
    try {
      const favoriteBooks = await this.bookService.getAllFavoriteBooks();
      res.status(200).json(favoriteBooks);
    } catch (error) {
      console.error("Erro ao buscar todos os livros favoritos:", error);
      res.status(500).send("Erro ao buscar todos os livros favoritos");
    }
  }

  async deleteFavoriteBook(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.bookService.deleteFavoriteBook(id);
      res.status(200).send("Removido com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar livro favorito:", error);
      throw new Error("Erro ao deletar livro favorito");
    }
  }
}
