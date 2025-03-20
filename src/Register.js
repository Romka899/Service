import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css"

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                username,
                password,
            });
            alert(response.data);
            navigate('/create-banner'); 
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            if (error.response) {
                console.error('Ответ сервера:', error.response.data);
            }
        }
    };


    const handleLoginRedirect = () => {
        navigate('/autorisation'); 
    };

    return (
        <div className="reg">
            <h1>Регистрация</h1>
            <form onSubmit={handleRegister}>
                <div className='Login'>
                    <label>Login</label>
                    <input className='inp1' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='Password'>
                    <label>Password</label>
                    <input className='inp2' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='Zareg'>
                    <button type="submit">
                        Зарегистрироваться
                    </button>
                </div>
                <div className = 'Autor'>
                    <button onClick={handleLoginRedirect} style={{ marginTop: '20px' }}>
                        Авторизация
                    </button>
                </div>
            </form>

        </div>
    );
}

export default Register;