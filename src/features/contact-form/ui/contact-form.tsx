import React from 'react';
import styles from './styles.module.scss';
import { useForm } from 'effector-forms';
import { Phone, model } from '../model/model';
import { useUnit } from 'effector-react';
import clsx from 'clsx';
import { EventCallable } from 'effector';

export const ContactForm = () => {
    const { fields, submit, eachValid } = useForm(model.loginForm);
    const pending = useUnit(model.loginFx.pending);

    const onSubmit = (e: any) => {
        e.preventDefault();
        submit();
    };

    const handlePhoneChange = (index: number, fieldName: string, value: string) => {
        const updatedPhones = [...fields.phones.value];
        updatedPhones[index] = {
            ...updatedPhones[index],
            [fieldName]: value,
        };
        (model.loginForm.fields.phones.onChange as EventCallable<Phone[]>)(updatedPhones);
    };

    const handleAddPhone = () => {
        (model.loginForm.fields.phones.onChange as EventCallable<Phone[]>)([
            ...fields.phones.value,
            { number: '', numberType: 'main' }
        ]);
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <label>
                <span>Имя:</span>
                <input
                    type="text"
                    value={fields.name.value}
                    disabled={pending}
                    onBlur={() => fields.name.onBlur()}
                    onChange={(e) => fields.name.onChange(e.target.value)}
                />
                <span className={styles.form__error}>
                    {fields.name.errorText({
                        "required": "Имя обязательное поле",
                        "minLength": "Имя должно состоять минимум из 2 символов",
                        "maxLength": "Имя не должно быть длинее 50 символов"
                    })}
                </span>
            </label>

            <label>
                <span>Email:</span>
                <input
                    type="text"
                    value={fields.email.value}
                    disabled={pending}
                    onBlur={() => fields.email.onBlur()}
                    onChange={(e) => fields.email.onChange(e.target.value)}
                />
                <span className={styles.form__error}>
                    {fields.email.errorText()}
                </span>
            </label>

            <label className={styles.phones}>
                Телефоны:
                {fields.phones.value.map((phone, index) => (
                    <div key={index} className={styles.phones__phone}>
                        <input
                            type="text"
                            value={phone.number}
                            onChange={(e) => handlePhoneChange(index, 'number', e.target.value)}
                        />
                        <span className={clsx(styles.form__error, styles.form__phoneError)}>
                            {fields.phones.errorText({
                                "phoneRequired": "Вы не ввели номер телефона",
                            })}
                        </span>
                        <select
                            name="numberType"
                            value={phone.numberType}
                            onChange={(e) => handlePhoneChange(index, 'numberType', e.target.value)}
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

                <button
                    className={clsx('test', (!eachValid || pending) && styles.buttons__disabled)}
                    disabled={!eachValid || pending}
                    type="submit"
                >
                    Отправить
                </button>
            </div>
        </form>
    );
};
