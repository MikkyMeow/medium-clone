import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from './../../hooks/useFetch';

const Auth = (props) => {
  const isLogin = props.match.path === '/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{response, isLoading, error}, doFetch] = useFetch('/users/login');

  console.log('props', isLogin)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('data', email, password);
    doFetch({
      method: 'post',
      data: {
        user: {
          email: 'qq@qq.com',
          password: '123',
        }
      }
    })
  }

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Login</h1>
            <p className='text-xs-center'>
              <Link to='register'>Need an account?</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className='form-group'>
                  <input type='email' className='form-control form-control-lg' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                </fieldset>
                <fieldset className='form-group'>
                  <input type='password' className='form-control form-control-lg' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                </fieldset>
                <button className='btn btn-lg btn-primary pull-xs-right' type='submit' disabled={isLoading}>Sign In</button>
                {props.location.pathname === '/register' && <fieldset className='form-group'>
                  <input type='email' className='form-control form-control-lg' placeholder='Email' />

                </fieldset>}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;