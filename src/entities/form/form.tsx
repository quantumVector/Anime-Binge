'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { FieldsForm, SelectOption } from '@/shared/lib/types';
import { SingleValue } from 'react-select';
import { Input } from '@/shared/ui/atoms';
import { Select } from '@/shared/ui/atoms/select';

const options: SelectOption[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

export const Form = () => {
    const {
        register,
        formState: { errors, isValid },
        reset,
        handleSubmit,
        control,
    } = useForm<FieldsForm>({
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<FieldsForm> = (data) => {
        console.log(data);
        reset();
    }

    const handleChange = (option: SingleValue<SelectOption>) => {
        if (option) {
            console.log(option.value)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name='select'
                render={({ field }) => (
                    <Select options={options} field={field} handleChange={handleChange} />
                )}
            />

            <Select options={options} handleChange={handleChange} />

            <Input
                {...register('firstName', {
                    required: "Поле обязательно к заполнению",
                    minLength: {
                        value: 5,
                        message: 'Минимум 5 символов',
                    }
                })}
                placeholder='Имя'
                error={errors?.firstName?.message as string}
            />

            <Input
                {...register('lastName', {
                    required: "Поле обязательно к заполнению",
                    minLength: {
                        value: 5,
                        message: 'Минимум 5 символов',
                    }
                })}
                placeholder='Фамилия'
                error={errors?.lastName?.message as string}
            />

            <Input
                {...register('email', {
                    required: "Поле обязательно к заполнению",
                    pattern: {
                        message: 'Введите корректный email',
                        value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                    }
                })}
                placeholder='email'
                error={errors?.email?.message as string}
            />

            <input type='submit' disabled={!isValid} />
        </form>
    );
};
