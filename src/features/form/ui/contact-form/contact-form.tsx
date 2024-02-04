import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phones: [{ number: '', numberType: 'main' }],
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phones: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Валидация имени
        if (formData.name.length < 2 || formData.name.length > 50) {
            newErrors.name = 'Имя должно содержать от 2 до 50 символов';
            valid = false;
        } else {
            newErrors.name = '';
        }

        // Валидация email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Некорректный формат email';
            valid = false;
        } else {
            newErrors.email = '';
        }

        // // Валидация телефона
        // if (formData.number.length === 0 || !/^\d+$/.test(formData.number)) {
        //     newErrors.number = 'Некорректный формат телефона';
        //     valid = false;
        // } else {
        //     newErrors.number = '';
        // }

        // // Валидация типа телефона
        // if (formData.numberType === '') {
        //     newErrors.numberType = 'Выберите тип телефона';
        //     valid = false;
        // } else {
        //     newErrors.numberType = '';
        // }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (validateForm()) {
            // Отправка данных формы
            console.log('Form is valid. Submitting data:', formData);
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                <span>Имя:</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <span className="error">{errors.name}</span>}
            </label>

            <label>
                <span>Email:</span>
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
            </label>

            <label className={styles.phones}>
                Телефоны:
                {formData.phones.map((phone, index) => (
                    <div key={index} className={styles.phones__phone}>
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

            <div className={styles.buttons}>
                <button type="button" onClick={handleAddPhone}>Добавить телефон</button>

                <button type="submit">Отправить</button>
            </div>
        </form>
    );
};
