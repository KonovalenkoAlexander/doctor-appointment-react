import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Відправляємо дані на наш бекенд (маршрут /api/register)
    axios.post('http://localhost:5000/api/register', { name, login, password })
      .then(res => {
        setMessage('Реєстрація успішна! Зараз вас буде перенаправлено на сторінку входу...');
        // Чекаємо 2 секунди і перекидаємо на логін
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Помилка при реєстрації');
      });
  };

  return (
    <div className="container" style={{ marginTop: '100px', maxWidth: '400px' }}>
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Реєстрація Нового Пацієнта</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>ПІБ (Повне ім'я):</label>
              <input 
                type="text" 
                className="form-control" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                placeholder="Наприклад: Іванов Іван"
              />
            </div>
            <div className="form-group">
              <label>Придумайте логін:</label>
              <input 
                type="text" 
                className="form-control" 
                value={login} 
                onChange={e => setLogin(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Придумайте пароль:</label>
              <input 
                type="password" 
                className="form-control" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-info btn-block">Створити акаунт</button>
          </form>

          {/* Виведення повідомлень про успіх або помилку */}
          {message && <div className="alert alert-success" style={{ marginTop: '15px' }}>{message}</div>}
          {error && <div className="alert alert-danger" style={{ marginTop: '15px' }}>{error}</div>}

          {/* Посилання назад на логін */}
          <div className="text-center" style={{ marginTop: '15px' }}>
            Вже є акаунт? <Link to="/login">Увійти тут</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;