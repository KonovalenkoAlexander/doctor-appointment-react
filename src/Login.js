import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Додано Link
import axios from 'axios';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/api/login', { login, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('name', res.data.name);

        if (res.data.role === 'doctor') {
          navigate('/admin');
        } else {
          navigate('/cabinet');
        }
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Помилка входу');
      });
  };

  return (
    <div className="container" style={{ marginTop: '100px', maxWidth: '400px' }}>
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Вхід у систему</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Логін:</label>
              <input type="text" className="form-control" value={login} onChange={e => setLogin(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Пароль:</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Увійти</button>
          </form>
          {error && <div className="alert alert-danger" style={{ marginTop: '15px' }}>{error}</div>}
          
          {/* НОВИЙ БЛОК: Посилання на реєстрацію */}
          <div className="text-center" style={{ marginTop: '15px' }}>
            Немає акаунту? <Link to="/register">Зареєструватися</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;