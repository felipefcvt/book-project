import { useState } from 'react';
import styles from '../styles/global.module.css';

interface BookItemProps {
  book: {
    title: string;
    description: string;
    imageUrl: string;
  };
  onAddToFavorites: () => void;
}

export default function BookItem ({ book, onAddToFavorites }: BookItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedDescription = book.description.length > 200 
    ? `${book.description.slice(0, 200)}...` 
    : book.description;

  function toggleDescription () {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="book-item">
      <hr />
      {book.imageUrl && (
        <img 
          style={{ width: '300px', height: '400px' }} 
          src={book.imageUrl} 
          alt={book.title} 
        />
      )}
      <h2>{book.title}</h2>
      <p>
        {isExpanded ? book.description : truncatedDescription}
        {book.description.length > 200 && (
          <span onClick={toggleDescription} className={styles['toggle-description']}>
            {isExpanded ? ' Ver menos' : ' Ver mais'}
          </span>
        )}
      </p>
      <button onClick={onAddToFavorites}>Adicionar aos favoritos</button>
    </div>
  );
};


