import React from 'react';
import './Filter.css';
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
  setAuthorFilter,
  selectAuthorFilter,
  toggleFaforite,
  selectFaforiteFilter,
} from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { useAppSelector } from '../../hooks/hooks';

function Filter() {
  let dispatch = useAppDispatch();
  const titleFilter = useAppSelector(selectTitleFilter);
  const authorFilter = useAppSelector(selectAuthorFilter);
  const faforiteFilter = useAppSelector(selectFaforiteFilter);
  console.log(authorFilter);
  function handleToggleCheckbox(e: React.FormEvent<HTMLInputElement>): void {
    dispatch(toggleFaforite());
  }
  function handleTitlelFilterChange(
    e: React.FormEvent<HTMLInputElement>
  ): void {
    dispatch(setTitleFilter(e.currentTarget.value));
  }

  function handleAithorFilterChange(
    e: React.FormEvent<HTMLInputElement>
  ): void {
    dispatch(setAuthorFilter(e.currentTarget.value));
  }
  function handleResetFilters() {
    dispatch(resetFilters());
  }
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="filter by type..."
            onChange={handleTitlelFilterChange}
            value={titleFilter}
          ></input>
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="filter by author..."
            onChange={handleAithorFilterChange}
            value={authorFilter}
          ></input>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              onChange={handleToggleCheckbox}
              checked={faforiteFilter}
            ></input>
            Only favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
