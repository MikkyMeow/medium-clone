import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useFetch from './../../hooks/useFetch';

const UserProfile = ({ location, match }) => {
  const slug = match.params.slug;
  const isFavorites = location.pathname.includes('favorites');
  const apiUrl = `/profiles/${slug}`;
  const [{response}, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (!response) return null

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={response.profile.image} alt="" className="user-img"/>
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink className='nav-link' to={`/profiles/${response.profile.username}`} exact>My posts</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className='nav-link' to={`/profiles/${response.profile.username}/favorites`}>Favorites posts</NavLink>
                </li>
              </ul>
            </div>
            <div>User Articles</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;