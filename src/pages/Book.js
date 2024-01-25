import anime from 'animejs/lib/anime.es.js'; // Import anime.js
import React, { useEffect, useState } from 'react';
import '../styles/Book.css';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const fetchChildrensBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:children&maxResults=20`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch children\'s books');
        }

        const data = await response.json();
        setBooks(data.items || []);
        setTotalBooks(data.totalItems || 0);
      } catch (error) {
        console.error('Error fetching children\'s books:', error);
      }
    };

    fetchChildrensBooks();

    // Animation using anime.js when component mounts
    const animation = anime.timeline({ loop: true })
      .add({
        targets: '.book-container',
        opacity: [0, 1],
        translateY: ['-20px', '0px'],
        easing: 'easeInOutQuad',
        duration: 1000,
      })
      .add({
        targets: '.book-image',
        opacity: [0, 1],
        translateY: ['-20px', '0px'],
        easing: 'easeInOutQuad',
        duration: 1000,
      }, '-=500'); // Start this animation 500ms before the previous one ends
      setTimeout(() => {
        animation.pause();
      }, 3000);

    return () => {
      animation.pause(); // Pause animation when component unmounts
    };
  }, []);

  const nextBook = () => {
    setCurrentBook(Math.min(currentBook + 1, books.length - 1));
  };

  const prevBook = () => {
    setCurrentBook(Math.max(0, currentBook - 1));
  };

  const searchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data.items || []);
      setTotalBooks(data.totalItems || 0);
      setCurrentBook(0);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const openGoogleBooks = () => {
    const bookInfo = books[currentBook].volumeInfo;
    const googleBooksLink = bookInfo.previewLink || bookInfo.infoLink;

    if (googleBooksLink) {
      window.open(googleBooksLink, '_blank');
    } else {
      console.error('No link available for the selected book.');
    }
  };

  return (
    <div className="book-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for children's books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {totalBooks > 0 && (
        <p className="total-books">Total Children's Books Available: {totalBooks}</p>
      )}

      {books.length > 0 && (
        <div className="book">
          <img
            src={books[currentBook].volumeInfo.imageLinks?.thumbnail || ''}
            alt={books[currentBook].volumeInfo.title}
            className="book-image"
          />
          <h1>{books[currentBook].volumeInfo.title}</h1>
          <p>{books[currentBook].volumeInfo.description}</p>
          <button onClick={openGoogleBooks}>Read Full Book</button>
        </div>
      )}

      <div className="page-navigation">
        <button onClick={prevBook} disabled={currentBook === 0}>
          Previous Book
        </button>
        <button onClick={nextBook} disabled={currentBook === books.length - 1}>
          Next Book
        </button>
      </div>
    </div>
  );
};

export default Book;
