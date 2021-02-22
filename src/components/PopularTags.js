import React, { useEffect } from 'react';
import useFetch from './../hooks/useFetch';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';

const PopularTags = () => {
  const [{response, isLoading, error}, doFetch] = useFetch('/tags');
  
  useEffect(() => {
    doFetch()
  }, [doFetch]);

  return (
    <div className='sidebar'>
      {(isLoading) && <Loading />}
      {error && <ErrorMessage />}
      {response && 
        <>
          <p>Popular Tags</p>
          <div className='tag-list'>
            {response.tags.map(tag => (
              <Link to={`/tags/${tag}`} className='tag-default tag-pill' key={tag}>{tag}</Link>
            ))}
          </div>
        </>}
    </div>
  )
}

export default PopularTags;