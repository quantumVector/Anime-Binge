import { Input } from '@/shared/ui/input';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { Textarea } from '@/shared/ui/textarea';
import { formModel } from '../../model';
import { MainNotesTypes } from '@/shared/lib/types';

export const NoteForm = () => {
    const {
        register,
        formState: { errors },
        control,
        watch,
    } = useForm({
        mode: 'onBlur',
    });

    const watchedFields = watch();

    useEffect(() => {
        formModel.updateFormData(watchedFields as MainNotesTypes.Note);
    }, [watchedFields]);

    return (
        <form className={styles.form}>
            <input type="hidden" {...register('id', { value: new Date().getTime() })} />

            <Input
                {...register('title', {
                    required: "Поле обязательно к заполнению",
                })}
                placeholder='Заголовок'
                error={errors?.title?.message as string}
            />

            <Input
                {...register('desc')}
                placeholder='Описание'
                error={errors?.desc?.message as string}
            />

            <Controller
                name='text'
                control={control}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        placeholder='Введите текст'
                        error={errors?.['text']?.message as string}
                    />
                )}
            />

            <input type="hidden" {...register('tags', { value: [] })} />
        </form>
    )
};