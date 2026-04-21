import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PatientCabinet() {
  const navigate = useNavigate();
  const patientName = localStorage.getItem('name'); // Дістаємо ім'я пацієнта з пам'яті
  
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  // useEffect спрацьовує один раз при завантаженні сторінки - тягнемо список лікарів
  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then(res => {
        setDoctors(res.data.doctors);
      })
      .catch(err => console.error("Помилка завантаження лікарів:", err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !date) {
      setMessage('Будь ласка, оберіть лікаря та дату.');
      return;
    }

    // Відправляємо запис на наш Node.js сервер
    axios.post('http://localhost:5000/api/appointments', {
      patient_name: patientName,
      doctor_name: selectedDoctor,
      date: date
    })
    .then(res => {
      setMessage(`Успішно! Ви записані до лікаря: ${selectedDoctor} на ${date}.`);
      setSelectedDoctor(''); // Очищаємо поля після успіху
      setDate('');
    })
    .catch(err => {
      setMessage('Помилка при створенні запису.');
    });
  };

  return (
    <div className="container" style={{ marginTop: '50px', maxWidth: '600px' }}>
      <div className="pull-right">
        <button className="btn btn-danger" onClick={handleLogout}>Вийти з системи</button>
      </div>
      <h2 className="text-info">Особистий кабінет</h2>
      <p className="lead">Вітаємо, <strong>{patientName}</strong>!</p>
      <hr />

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Новий запис на прийом</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Оберіть лікаря:</label>
              <select 
                className="form-control" 
                value={selectedDoctor} 
                onChange={e => setSelectedDoctor(e.target.value)}
              >
                <option value="">-- Не обрано --</option>
                {/* Динамічно виводимо лікарів з бази */}
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginTop: '15px' }}>
              <label>Оберіть дату:</label>
              <input 
                type="date" 
                className="form-control" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                required
              />
            </div>

            <button type="submit" className="btn btn-success btn-block" style={{ marginTop: '20px' }}>
              Підтвердити запис
            </button>
          </form>

          {message && (
            <div className="alert alert-warning" style={{ marginTop: '20px', textAlign: 'center' }}>
              <strong>{message}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientCabinet;