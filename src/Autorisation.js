import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Autorisation() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/autorisation', {
                username,
                password,
            });

            if (response.data.message === 'Авторизация успешна') {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', username);
                navigate('/create-banner'); // Перенаправляем на страницу создания баннера
            } else {
                setError('Неверный логин или пароль');
            }
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            setError('Такого пользователя нет');
        }
    };

    return (
        <div className="login">
            <h1>Авторизация</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Autorisation;