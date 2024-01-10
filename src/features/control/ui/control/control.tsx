import React, { Dispatch, SetStateAction } from 'react';
import { Icon } from '@/shared/ui/icons/icon';
import styles from './styles.module.scss';
import { formModel } from '@/features/form/model';
import { notesModel } from '@/widgets/notes/model';
import { useUnit } from 'effector-react';

export const Control = () => {
    const [displayForm, formVisibility, activeNote] = useUnit([
        formModel.displayForm,
        formModel.$formVisibility,
        notesModel.$activeNote
    ]);

    const onDisplayForm = () => {
        notesModel.selectNote(null);
        displayForm(true);
    }

    const onSubmitForm = () => {
        formModel.submitForm(true);
    }

    const onRemoveNote = () => {
        if (activeNote) {
            notesModel.removeNote(activeNote);
        }
    }

    const onClickBack = () => {
        displayForm(false);
    }

    return (
        <div className={styles.control}>
            {!formVisibility && (
                <>
                    <div className={styles.control__btn} onClick={onDisplayForm}>
                        <Icon className={styles.control__icon} id='plus' />
                    </div>
                    <div className={styles.control__btn} onClick={onRemoveNote}>
                        <Icon className={styles.control__icon} id='trash-bin' />
                    </div>
                    <div className={styles.control__btn}>
                        <Icon className={styles.control__icon} id='bookmark' />
                    </div>
                </>
            )}
            {formVisibility && (
                <>
                    <div className={styles.control__btn} onClick={onClickBack}>
                        <Icon className={styles.control__icon} id='arrow-back' />
                    </div>
                    <div className={styles.control__btn} onClick={onSubmitForm}>
                        <Icon className={styles.control__icon} id='disk' />
                    </div>
                </>
            )}
        </div>
    )
}
