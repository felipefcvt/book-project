"use client";

import React, { Suspense, useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import api from "@/api/axios";
import NotificationModal from "@/components/NotificationModal";
import Loading from "./loading";
import styles from "../styles/global.module.css";

export default function IndexPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/books/search?q=${query}`);
      setTimeout(() => {
        setBooks(response.data);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = async (book: any) => {
    try {
      await api.post("/books/favorite", book);
      setModalMessage("Adicionado aos favoritos");
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao adicionar aos favoritos:", error);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <main className={styles.home}>
        <h1>Busque por um livro</h1>
        <div>
          <SearchBar onSearch={handleSearch} />
          {isLoading ? (
            <h2>Buscando...</h2>
          ) : (
            <BookList books={books} onAddToFavorites={handleAddToFavorites} />
          )}
          <NotificationModal
            show={showModal}
            onClose={() => setShowModal(false)}
            message={modalMessage}
          />
        </div>
      </main>
    </Suspense>
  );
}
