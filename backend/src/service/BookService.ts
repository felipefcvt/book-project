import { BookInterface } from "../interface/book";
import { BookRepository } from "../repository/BookRepository";
export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async searchBooks(query: string): Promise<BookInterface[]> {
    const booksData = await this.bookRepository.fetchBooksFromGoogleBooksAPI(
      query
    );
    return this.extractBookData(booksData);
  }

  private extractBookData(booksData: any): BookInterface[] {
    return booksData.items.map((item: any) => {
      const volumeInfo = item.volumeInfo;
      return {
        title: volumeInfo.title,
        description: volumeInfo.description || "Descrição não disponível",
        imageUrl: volumeInfo.imageLinks
          ? volumeInfo.imageLinks.thumbnail
          : "Imagem não disponível",
      };
    });
  }

  async saveFavoriteBook({
    title,
    description,
    imageUrl,
  }: BookInterface): Promise<void> {
    const existingBook = await this.bookRepository.getFavoriteBookByTitle(title);

    if (existingBook) {
      throw new Error('Livro já foi adicionado como favorito');
    }

    await this.bookRepository.saveFavoriteBook({
      title,
      description,
      imageUrl,
    });
  }

  async getAllFavoriteBooks(): Promise<any[]> {
    return await this.bookRepository.getAllFavoriteBooks();
  }

  async deleteFavoriteBook(id: string) {
    await this.bookRepository.deleteFavoriteBook(id);
  }
}
