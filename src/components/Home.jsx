import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrizeList from './PrizeList';

const Home = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const correctPassword = process.env.REACT_APP_SECRET_PASSWORD;

    if (password === correctPassword) {
      localStorage.setItem('isAuthenticated', 'true');  // Set authenticated flag
      navigate('/to-do');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className='container center section'>
      <h5 className="center">
        Olá! Bem vindos à app das tarefas da Maria, 
        para entrar é preciso uma password! 
      </h5>

      <div className="row">
        <form className="col s12" onSubmit={handleLogin}>
          <div className="row">
            <div className="input-field col s12">
              <input 
                id="password" 
                type="password" 
                className="validate"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button type="submit" className="waves-effect waves-light btn">
            Aceder
          </button>
        </form>
      </div>

      <div className="row">
        <PrizeList />
      </div>

    </div>
  );
};

export default Home;
