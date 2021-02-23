import React from 'react';
import useFetch from './../hooks/useFetch';
import classNames from 'classnames';

const AddToFavorites = ({ isFavorited, favoritesCount,  articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{response}, doFetch] = useFetch(apiUrl);
  const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount;
  const isFavoritesWithResponese = response ? response.article.favorited : isFavorited
  const buttonClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavoritesWithResponese,
    'btn-outline-primary': !isFavoritesWithResponese,
  })

  const handleLike = event => {
    event.preventDefault();
    doFetch({
      method: isFavoritesWithResponese ? 'delete' : 'post'
    })
  }
  
  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className='ion-heart'></i>
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  )
}

export default AddToFavorites;