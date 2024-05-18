import { Router } from "express";
import { BookController } from "../controller/BookController";
class BookRoutes {
  private router: Router;
  private bookController: BookController;

  constructor() {
    this.router = Router();
    this.bookController = new BookController();
  }

  getRoutes(): Router {
    this.router.get(
      "/search",
      this.bookController.searchBooks.bind(this.bookController)
    );

    this.router.post(
      "/favorite",
      this.bookController.saveFavoriteBook.bind(this.bookController)
    );

    this.router.get(
      "/favorite",
      this.bookController.getAllFavoriteBooks.bind(this.bookController) 
    )

    this.router.delete(
      "/favorite/:id",
      this.bookController.deleteFavoriteBook.bind(this.bookController)
    )
    return this.router;
  }
}

export { BookRoutes };
