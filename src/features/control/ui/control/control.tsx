import React, { Dispatch, SetStateAction } from 'react';
import { Icon } from '@/shared/ui/icons/icon';
import styles from './styles.module.scss';
import { formModel } from '@/features/form/model';
import { notesModel } from '@/widgets/notes/model';
import { useUnit } from 'effector-react';

export const Control = () => {
    const [displayForm, formVisibility] = useUnit([
        formModel.displayForm,
        formModel.$formVisibility,
    ]);

    const onDisplayForm = () => {
        notesModel.selectNote(null);
        displayForm(true);
    }

    const onSubmitForm = () => {
        formModel.submitForm(true);
    }

    return (
        <div className={styles.control}>
            {!formVisibility && (
                <>
                    <div className={styles.control__btn} onClick={onDisplayForm}>
                        <Icon className={styles.control__icon} id='plus' />
                    </div>
                    <div className={styles.control__btn}>
                        <Icon className={styles.control__icon} id='trash-bin' />
                    </div>
                    <div className={styles.control__btn}>
                        <Icon className={styles.control__icon} id='bookmark' />
                    </div>
                </>
            )}
            {formVisibility && (
                <div className={styles.control__btn} onClick={onSubmitForm}>
                    <Icon className={styles.control__icon} id='disk' />
                </div>
            )}
        </div>
    )
}
