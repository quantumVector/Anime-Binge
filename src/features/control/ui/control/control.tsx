import React, { Dispatch, SetStateAction } from 'react';
import { Icon } from '@/shared/ui/icons/icon';
import styles from './styles.module.scss';
import { formModel } from '@/features/form/model';
import { notesModel } from '@/widgets/notes/model';
import { useUnit } from 'effector-react';
import { controlModel } from '../../model';
import clsx from 'clsx';

export const Control = () => {
    const [
        displayForm,
        formVisibility,
        activeNote,
        formDataStore,
        submitButtonStatus,
        activateMultipleSelectMod,
        multipleSelectMod,
    ] = useUnit([
        formModel.displayForm,
        formModel.$formVisibility,
        notesModel.$activeNote,
        formModel.$formDataStore,
        controlModel.$submitButtonStatus,
        notesModel.activateMultipleSelectMod,
        notesModel.$multipleSelectMod
    ]);

    const onDisplayForm = () => {
        notesModel.selectNote(null);
        displayForm(true);
    };

    const onEditeNote = () => {
        displayForm(true);
    };

    const onSubmitForm = () => {
        if (submitButtonStatus) {
            formModel.submitForm({
                noteData: formDataStore,
                operation: activeNote ? 'update' : 'add',
            });
        }
    };

    const onRemoveNote = () => {
        if (activeNote) {
            notesModel.removeNote(activeNote);
        }
    };

    const onClickBack = () => {
        displayForm(false);
    };

    const onClickMultipleSelectMod = () => {
        activateMultipleSelectMod(!multipleSelectMod);
    }

    return (
        <div className={styles.control}>
            {!formVisibility && (
                <>
                    <div className={styles.control__btn} onClick={onDisplayForm}>
                        <Icon className={styles.control__icon} id='plus' />
                    </div>
                    {activeNote && (
                        <>
                            <div className={styles.control__btn} onClick={onEditeNote}>
                                <Icon className={styles.control__icon} id='pencil' />
                            </div>
                            <div className={styles.control__btn} onClick={onRemoveNote}>
                                <Icon className={styles.control__icon} id='trash-bin' />
                            </div>
                        </>
                    )}
                    <div className={styles.control__btn}>
                        <Icon className={styles.control__icon} id='bookmark' />
                    </div>
                    <div className={styles.control__btn} onClick={onClickMultipleSelectMod}>
                        <Icon className={styles.control__icon} id='select' />
                    </div>
                </>
            )}
            {formVisibility && (
                <>
                    <div className={styles.control__btn} onClick={onClickBack}>
                        <Icon className={styles.control__icon} id='arrow-back' />
                    </div>
                    <div
                        className={clsx(styles.control__btn, !submitButtonStatus && styles.control__disable)}
                        onClick={onSubmitForm}
                    >
                        <Icon className={styles.control__icon} id='disk' />
                    </div>
                </>
            )}
        </div>
    )
}
