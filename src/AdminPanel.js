import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPanel() {
  const navigate = useNavigate();
  const doctorName = localStorage.getItem('name'); // Имя врача, вошедшего в систему
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загружаем список записей именно для этого врача при открытии страницы
  useEffect(() => {
    if (!doctorName) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:5000/api/appointments/doctor/${doctorName}`)
      .then(res => {
        setAppointments(res.data.appointments);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки записей:", err);
        setLoading(false);
      });
  }, [doctorName, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="pull-right">
        <button className="btn btn-danger" onClick={handleLogout}>Вийти з системи</button>
      </div>
      
      <h2 className="text-success">Панель Лікаря: {doctorName}</h2>
      <p className="text-muted">Нижче наведено список пацієнтів, які записалися до вас на прийом.</p>
      <hr />

      {loading ? (
        <div className="text-center">Завантаження даних...</div>
      ) : (
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Список записів на прийом</h3>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Ім'я пацієнта</th>
                <th>Дата візиту</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((app, index) => (
                  <tr key={app.id}>
                    <td>{index + 1}</td>
                    <td>{app.patient_name}</td>
                    <td>{app.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">Записів поки що немає.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;