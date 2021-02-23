import React, { useContext, useEffect, useState } from 'react';
import useFetch from './../../hooks/useFetch';
import { Link, Redirect } from 'react-router-dom';
import Loading from './../../components/Loading';
import ErrorMessage from './../../components/ErrorMessage';
import TagList from '../../components/TagList';
import { CurrentUserContext } from './../../contexts/currentUser';

const Article = props => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{response: fetchArticleReponse, isLoading: fetchArticleIsLoading, error: fetchArticleError}, doFetch] = useFetch(apiUrl);
  const [{response: deleteArticleResponse},  doDeleteArticle] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false)

  const isAuthor = () => {
    if (!fetchArticleReponse || !currentUserState.isLoggedIn) return false;
    return fetchArticleReponse.article.author.username === currentUserState.currentUser.username
  }

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete',
    })
  }

  useEffect(() => {
    doFetch()
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) return;
    setIsSuccessfullDelete(true)
  }, [deleteArticleResponse])
  
  if(isSuccessfullDelete) {
    return <Redirect to='/' />
  }

  return (
    <div className='article-page'>
      <div className='banner'>
        {!fetchArticleIsLoading && fetchArticleReponse && (
          <div className='container'>
            <h1>{fetchArticleReponse.article.title}</h1>
            <div className='article-meta'>
              <Link to={`/profiles/${fetchArticleReponse.article.author.username}`}>
                <img src={fetchArticleReponse.article.author.image} alt='' />
              </Link>
              <div className='info'>
              <Link to={`/profiles/${fetchArticleReponse.article.author.username}`}>
                {fetchArticleReponse.article.author.username }
              </Link>
              <span className='date'>{fetchArticleReponse.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link className='btn btn-outline-secondary btn-sm' to={`/articles/${fetchArticleReponse.article.slug}/edit`}>
                    <i className='ion-edit'></i>
                    &nbsp;Edit Article
                  </Link>
                  <button className='btn btn-outline-danger btn-sm' onClick={deleteArticle}>
                    <i className='ion-trash-a'></i>
                    &nbsp;Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className='container page'>
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleReponse && (
          <div className='row article-content'>
            <div className='col-xs-12'>
              <div>
                <p>{fetchArticleReponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleReponse.article.tagList} />
            </div>
          </div>
        )}
      </div> 
    </div>
  )
} 

export default Article;