import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import style from './App.module.css';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsShow, setModalIsShow] = useState(false);
  const [currentPictureURL, setCurrentPictureURL] = useState(null);

  const onImageClick = evt => {
    setModalIsShow(true);
    setCurrentPictureURL(evt);
  };

  const onModalClick = () => {
    setModalIsShow(false);
  };

  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onSubmitMoveDataToApp = evt => {
    console.log('SUBMIT');
    setSearchQuery(evt);
    setPage(1);
    setPictures([]);
  };

  useEffect(() => {
    window.addEventListener('keydown', evt => {
      if (evt.code === 'Escape') {
        setModalIsShow(false);
      }
    });
  }, [modalIsShow]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    console.log('UPDATE');
    const key = '22104578-b37830bb47769ec8fcc7503cc';
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(res => setPictures(prevState => [...prevState, ...res.hits]))
      .finally(() => setLoading(false));
  }, [page, searchQuery]);

  return (
    <div className={style.App}>
      <SearchBar moveData={onSubmitMoveDataToApp} />

      <ImageGallery
        onImageClick={onImageClick}
        onClickLoadMore={onClickLoadMore}
        picturesArray={pictures}
      />

      {pictures.length > 1 && Number.isInteger(pictures.length / 12) && (
        <Button onClick={onClickLoadMore} />
      )}
      <Loader isLoading={loading} />
      {modalIsShow && (
        <Modal
          currentPictureURL={currentPictureURL}
          onModalClick={onModalClick}
        />
      )}
    </div>
  );
}
