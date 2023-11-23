import './BookForm.css';
import { setError } from '../../redux/slices/errorSlice';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { addBook } from '../../redux/books/actionCreators';
import { books } from '../../data/book';
// import { createBookWithID } from '../../utils/createBookWithID';
import { createBookWithID } from '../../utilits/createBookWithID';
import { addBook } from '../../redux/slices/booksSlice';
import {
  fetchBook,
  selectIsLoadingViaAPI,
} from '../../redux/slices/booksSlice';
import { FaSpinner } from 'react-icons/fa';
import { useAppDispatch } from '../../hooks/hooks';
import { useAppSelector } from '../../hooks/hooks';

export const BookForm = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');

  const dispatch = useAppDispatch();
  const isLoadingViaAPA = useAppSelector(selectIsLoadingViaAPI);

  function handleAddRandomBookViaAPI() {
    dispatch(fetchBook('http://localhost:4000/random-book-delay'));
  }

  function handleAddRandomBook() {
    let randomIndex = Math.floor(Math.random() * books.length);
    let ramdomBook = books[randomIndex];
    let randomBookWithId = createBookWithID(ramdomBook, 'random');
    dispatch(addBook(randomBookWithId));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title && author) {
      const book = createBookWithID({ title: title, author: author }, 'manual');
      console.log(addBook(book));
      dispatch(addBook(book));

      setAuthor('');
      setTitle('');
    } else {
      dispatch(setError('You must fill title and author'));
    }
  }
  return (
    <div className="app-block book-form">
      <h1>BookForm</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          {' '}
          Add random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPA}
        >
          {isLoadingViaAPA ? (
            <>
              <span>Loading book...</span>
              <FaSpinner className="spinner"></FaSpinner>
            </>
          ) : (
            'Add Random via API'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
