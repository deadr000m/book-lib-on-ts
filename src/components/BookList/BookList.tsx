import React from 'react';
// import { deleteBook } from '../../redux/books/actionCreators';
// import { toggleFaforite } from '../../redux/books/actionCreators';
import { deleteBook } from '../../redux/slices/booksSlice';
import { toggleFavorite } from '../../redux/slices/booksSlice';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { BsBookmarkCheck } from 'react-icons/bs';
import { selectBook } from '../../redux/slices/booksSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { useAppSelector } from '../../hooks/hooks';

import './BookList.css';
// import { BsBookmarkPlusFill } from 'react-icons/bs';
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectFaforiteFilter,
} from '../../redux/slices/filterSlice';

function BookList() {
  let books = useAppSelector(selectBook); //массив книг из состояния
  let titleFilter = useAppSelector(selectTitleFilter); //поле фильтра по заголовку
  const authorFilter = useAppSelector(selectAuthorFilter); //поле фильтра по автору
  const favoriteFilter = useAppSelector(selectFaforiteFilter); //фильтра по чекбокс favorite
  console.log(authorFilter);
  let dispatch = useAppDispatch();
  let filteredBooks = books.filter((book) => {
    return favoriteFilter
      ? book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
          book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
          book.isFaforite
      : book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
          book.author.toLowerCase().includes(authorFilter.toLowerCase());
  });

  function highlightMatched(text: string, filter: string) {
    if (!filter) return text;
    let regex = new RegExp(`(${filter})`, 'gi');
    let arr = text.split(regex);
    return arr.map((item) => {
      return item.toLowerCase() === filter.toLowerCase() ? (
        <span className="highlight">{item}</span>
      ) : (
        item
      );
    });
  }

  function deleteHandler(id: string) {
    dispatch(deleteBook(id));
  }

  function toggleHandler(id: string) {
    dispatch(toggleFavorite(id));
  }
  return (
    <div className="app-block book-list">
      <h2>Book list</h2>
      {books.length === 0 ? (
        <p>No booka avaible</p>
      ) : (
        <ul>
          {filteredBooks.map((item, index) => {
            return (
              <li key={item.id}>
                <div className="book-info">
                  {++index}. {highlightMatched(item.title, titleFilter)} by{' '}
                  <strong>{highlightMatched(item.author, authorFilter)}</strong>{' '}
                  ({item.source})
                </div>
                <div className="book-actions">
                  {item.isFaforite ? (
                    <BsBookmarkCheckFill
                      className="star-icon"
                      onClick={() => toggleHandler(item.id)}
                    />
                  ) : (
                    <BsBookmarkCheck
                      className="star-icon"
                      onClick={() => toggleHandler(item.id)}
                    />
                  )}

                  <button
                    onClick={() => {
                      deleteHandler(item.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default BookList;
