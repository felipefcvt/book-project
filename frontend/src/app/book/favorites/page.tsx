"use client";
import api from '@/api/axios';
import ConfirmModal from '@/components/ConfirmModal';
import FavoriteBooks from '@/components/FavoriteBook';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/global.module.css';

export default function FavoritesPage () {
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookToRemove, setBookToRemove] = useState<number | null>(null);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/books/favorite');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      await api.delete(`/books/favorite/${id}`);
      fetchFavorites(); 
      setShowModal(false);
      setBookToRemove(null);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const confirmRemoveFavorite = (id: number) => {
    setBookToRemove(id);
    setShowModal(true);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <section className={styles.section}>
      <h1>Favorite Books</h1>
      <FavoriteBooks favorites={favorites} onRemoveFavorite={confirmRemoveFavorite} />
      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => bookToRemove !== null && handleRemoveFavorite(bookToRemove)}
        message="Tem certeza que deseja remover este livro dos favoritos?"
      />
    </section>
  );
};