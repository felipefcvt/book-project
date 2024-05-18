import React from 'react';
import BookItem from './BookItem';

interface BookListProps {
  books: Array<{
    title: string;
    description: string;
    imageUrl: string;
  }>;
  onAddToFavorites: (book: any) => void;
}

export default function BookList ({ books, onAddToFavorites }: BookListProps) {
  return (
    <div>
      {books.map((book, index) => (
        <BookItem 
          key={index} 
          book={book} 
          onAddToFavorites={() => onAddToFavorites(book)} 
        />
      ))}
    </div>
  );
};

