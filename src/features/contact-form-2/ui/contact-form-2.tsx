import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useFieldArray, useForm } from 'effector-react-form';
import { Input } from './input/input';
import { model } from '../model/model';
import { rules } from '../model/rules';
import { Select } from './select/select';

export const ContactForm = () => {
    const { controller, handleSubmit } = useForm({ form: model.form });
    const { map, push, remove } = useFieldArray({
        name: 'phones',
        fieldArray: model.fieldArray,
    });

    let phoneIndex = 0;

    useEffect(() => {
        push({
            phone: '',
            numberType: 'main',
        })
    }, []);

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Имя:"
                    controller={controller({
                        name: model.form.getName('name'),
                        validate: rules.validateName,
                    })}
                />
                <Input
                    label="Email:"
                    controller={controller({
                        name: model.form.getName('email'),
                        validate: rules.validateMail
                    })}
                />
                <label className={styles.phones}>
                    Телефоны:
                    {map(({ formItemName, index, field }) => {
                        phoneIndex = index;

                        return (
                            <div key={field.id} className={styles.phones__phone}>
                                {index > 0 && <div className={styles.line}></div>}
                                <Input
                                    controller={controller({
                                        name: `${formItemName}.phone`,
                                        validate: rules.validateRequired,
                                    })}
                                />
                                <Select
                                    controller={controller({
                                        name: `${formItemName}.numberType`,
                                    })}
                                />
                            </div>
                        )
                    })}
                </label>
                <div className={styles.buttons}>
                    <div className={styles.buttons__phone}>
                        <button
                            type="button"
                            className={styles.buttons__add}
                            onClick={() => {
                                push({
                                    phone: '',
                                    numberType: 'main',
                                })
                            }
                            }>
                            Добавить телефон
                        </button>
                        {phoneIndex > 0 && (
                            <button
                                type="button"
                                className={styles.buttons__remove}
                                onClick={() => remove(phoneIndex)}>
                                -
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                    >
                        Отправить
                    </button>
                </div>
            </form>
        </>
    );
};
