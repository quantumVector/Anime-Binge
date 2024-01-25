import { Input } from '@/shared/ui/input';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { Textarea } from '@/shared/ui/textarea';
import { formModel } from '../../model';
import { MainNotesTypes } from '@/shared/lib/types';
import { controlModel } from '@/features/control/model';
import { useUnit } from 'effector-react';
import { notesModel } from '@/widgets/notes/model';

export const NoteForm = () => {
    const [activeNote, status, loader] = useUnit([
        notesModel.$activeNote,
        formModel.$status,
        formModel.$loader,
    ]);

    const {
        register,
        formState: { errors, isValid },
        control,
        watch,
    } = useForm({
        mode: 'onBlur',
    });

    const watchedFields = watch();

    useEffect(() => {
        controlModel.updateSubmitButtonStatus(isValid);
        formModel.updateFormData(watchedFields as MainNotesTypes.Note);
    }, [watchedFields]);

    // useEffect(() => {
    //     console.log('status', status)
    //     if (status === 'done' || status === 'fail') {
    //         console.log('status 2', status)
    //     }
    // }, [status]);

    return (
        <>
            {loader && (
                <h1>Loading...</h1>
            )}
            {!loader && (
                <form className={styles.form}>
                    <input
                        type="hidden"
                        {...register('id', { value: activeNote ? activeNote.id : new Date().getTime() })}
                    />

                    <Input
                        {...register('title', {
                            required: "Поле обязательно к заполнению",
                        })}
                        placeholder='Заголовок'
                        defaultValue={activeNote ? activeNote.title : ''}
                        error={errors?.title?.message as string}
                    />

                    <Input
                        {...register('desc')}
                        placeholder='Описание'
                        defaultValue={activeNote ? activeNote.desc : ''}
                        error={errors?.desc?.message as string}
                    />

                    <Controller
                        name='text'
                        control={control}
                        defaultValue={activeNote ? activeNote.text : ''}
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
            )}
        </>
    )
};