import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [text, setText] = useState('');
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(400);
    const [image, setImage] = useState(null);
    const [banner, setBanner] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('text', text);
        formData.append('width', width);
        formData.append('height', height);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:3000/api/create-banner', formData, {
                responseType: 'blob',
            });
            const bannerUrl = URL.createObjectURL(response.data);
            setBanner(bannerUrl);
        } catch (error) {
            console.error('Ошибка при создании баннера:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                username,
                password,
            });
            alert(response.data);
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            if (error.response) {
                console.error('Ответ сервера:', error.response.data);
            }
        }
    };

    return (
        <div className="app">
          <div className='reg'>
            <h1>Регистрация</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Имя пользователя:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
          </div>
          <div className='banner'>
            <h1>Создание рекламного баннера</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Текст:</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div>
                    <label>Ширина:</label>
                    <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
                </div>
                <div>
                    <label>Высота:</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div>
                    <label>Изображение:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <button type="submit">Создать баннер</button>
            </form>
          </div>
            {banner && (
                <div>
                    <h2>Ваш баннер:</h2>
                    <img src={banner} alt="Рекламный баннер" />
                </div>
            )}

        </div>
    );
}

export default App;
