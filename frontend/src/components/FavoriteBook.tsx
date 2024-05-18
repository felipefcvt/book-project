import React from 'react';
import BookItem from './BookItem';

interface FavoriteBooksProps {
  favorites: Array<{
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  }>;
  onRemoveFavorite: (id: number) => void;
}

const FavoriteBooks: React.FC<FavoriteBooksProps> = ({ favorites, onRemoveFavorite }) => {
  return (
    <div>
      {favorites.map((book) => (
        <div key={book.id}>
          <BookItem 
            book={book} 
            onAddToFavorites={() => {}} 
          />
          <button onClick={() => onRemoveFavorite(book.id)}>Remover dos favoritos</button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteBooks;
