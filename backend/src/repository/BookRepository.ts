import * as https from "https";
import { prisma } from "../database/prisma";
import { BookInterface } from "../interface/book";
export class BookRepository {
  async fetchBooksFromGoogleBooksAPI(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: https.RequestOptions = {
        hostname: "www.googleapis.com",
        port: 443,
        path: `/books/v1/volumes?q=${encodeURIComponent(query)}`,
        method: "GET",
      };

      const req = https.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const booksData = JSON.parse(data);
            resolve(booksData);
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on("error", (error) => {
        reject(error);
      });

      req.end();
    });
  }

  async saveFavoriteBook({
    title,
    description,
    imageUrl,
  }: BookInterface): Promise<void> {
    try {
      await prisma.favoriteBook.create({
        data: {
          title,
          description,
          imageUrl,
        },
      });
    } catch (error) {
      console.error("Erro ao salvar livro favorito:", error);
      throw new Error("Erro ao salvar livro favorito");
    }
  }

  async getFavoriteBookByTitle(title: string): Promise<boolean> {
    try {
      const existingBook = await prisma.favoriteBook.findFirst({
        where: {
          title,
        },
      });

      return !!existingBook;
    } catch (error) {
      console.error("Erro ao buscar livro favorito por título:", error);
      throw new Error("Erro ao buscar livro favorito por título");
    }
  }

  async getAllFavoriteBooks(): Promise<any[]> {
    try {
      return await prisma.favoriteBook.findMany();
    } catch (error) {
      console.error("Erro ao buscar todos os livros favoritos:", error);
      throw new Error("Erro ao buscar todos os livros favoritos");
    }
  }

  async deleteFavoriteBook(id: string) {
    await prisma.favoriteBook.delete({
      where: {
        id,
      },
    });
  }
}
