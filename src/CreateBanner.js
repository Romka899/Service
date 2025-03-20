import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CreateBanner.css"

function CreateBanner() {
    const [text, setText] = useState('');
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(400);
    const [image, setImage] = useState(null);
    const [bannerUrl, setBannerUrl] = useState(null); 
    const [rulesUrl, setRulesUrl] = useState(null);
    const [textX, setTextX] = useState(width/2); 
    const [textY, setTextY] = useState(height/2); 
    const navigate = useNavigate();

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
        formData.append('textX', textX); 
        formData.append('textY', textY); 

        try {
            const response = await axios.post('http://localhost:3000/api/create-banner', formData, {
                responseType: 'blob',
            });
            const bannerUrl = URL.createObjectURL(response.data);
            setBannerUrl(bannerUrl);
        } catch (error) {
            console.error('Ошибка при создании баннера:', error);
        }
    };

    const handleLoginRedirect = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        navigate('/'); 
    };

    const handleSaveBanner = async () => {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('width', width);
        formData.append('height', height);
        formData.append('image', image);
        formData.append('textX', textX);
        formData.append('textY', textY);

        try {
            const response = await axios.post('http://localhost:3000/api/save-banner', formData);
            alert('Баннер успешно сохранен!');
            setRulesUrl(response.data.rulesUrl); 
        } catch (error) {
            console.error('Ошибка при сохранении баннера:', error);
        }
    };


    return (
        <div className="banner">
            <h1>Создание рекламного баннера</h1>
            <form onSubmit={handleSubmit}>
                <div className='inp3'>
                    <label className='lab'>Текст:</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={1}
                        placeholder="Введите текст..."
                    />
                </div>
                <div className='inp3'>
                    <label>Координата X текста:</label>
                    <input type="number" value={textX} onChange={(e) => setTextX(e.target.value)} />
                </div>
                <div className='inp3'>
                    <label>Координата Y текста:</label>
                    <input type="number" value={textY} onChange={(e) => setTextY(e.target.value)} />
                </div>
                <div className='inp3'>
                    <label className='lab'>Ширина:</label>
                    <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
                </div>
                <div className='inp3'>
                    <label className='lab'>Высота:</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div>
                    <label>Изображение:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <button type="submit">Создать баннер</button>
            </form>
            {bannerUrl && (
                <div className='createbanner'>
                    <h2>Ваш баннер:</h2>
                    <img src={bannerUrl} alt="Рекламный баннер" />
                    <button onClick={handleSaveBanner} style={{ marginTop: '10px' }}>
                        Загрузить баннер
                    </button>
                </div>
            )}
            {rulesUrl && (
                <div className='createbanner'>
                    <h2>Ссылка на JSON-файл:</h2>
                    <p>
                        <a href={rulesUrl} target="_blank" rel="noopener noreferrer">
                            {rulesUrl}
                        </a>
                    </p>
                </div>
            )}
            <button onClick={handleLoginRedirect} style={{ marginTop: '20px' }}>
                Выйти
            </button>
        </div>
    );
}

export default CreateBanner;