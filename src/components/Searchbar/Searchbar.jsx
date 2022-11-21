import PropTypes from 'prop-types';
import React from 'react';
import style from './Searchbar.module.css';
import { useState } from 'react';

export const SearchBar = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = evt => {
    const { value } = evt.currentTarget;
    setSearchQuery(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const normalizedQuery = searchQuery.toLowerCase().trim('');
    if (normalizedQuery === '') {
      alert('Please enter something');
      return;
    }
    props.moveData(normalizedQuery);
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.SearchFormButton}>
          <span className={style.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.SearchFormInput}
          onChange={handleInputChange}
          value={searchQuery}
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  moveData: PropTypes.func.isRequired,
};
