import React, { useState } from 'react';
import styles from './styles.module.scss';

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phones: [{ number: '', numberType: 'main' }],
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (index: any, e: any) => {
        const { name, value } = e.target;
        const newPhones = [...formData.phones];
        newPhones[index] = { ...newPhones[index], [name]: value };
        setFormData({ ...formData, phones: newPhones });
    };

    const handleAddPhone = () => {
        setFormData({
            ...formData,
            phones: [...formData.phones, { number: '', numberType: 'main' }],
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Добавьте здесь код для обработки отправки формы
        console.log('Отправлено:', formData);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                Имя:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={50}
                    required
                />
            </label>
            <br />

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required
                />
            </label>
            <br />

            <label>
                Телефоны:
                {formData.phones.map((phone, index) => (
                    <div key={index}>
                        <input
                            type="tel"
                            name="number"
                            value={phone.number}
                            onChange={(e) => handlePhoneChange(index, e)}
                            required
                        />
                        <select
                            name="numberType"
                            value={phone.numberType}
                            onChange={(e) => handlePhoneChange(index, e)}
                        >
                            <option value="main">Основной</option>
                            <option value="home">Домашний</option>
                            <option value="additional">Дополнительный</option>
                        </select>
                    </div>
                ))}
            </label>
            <br />

            <button type="button" onClick={handleAddPhone}>
                Добавить телефон
            </button>
            <br />

            <button type="submit">Отправить</button>
        </form>
    );
};
