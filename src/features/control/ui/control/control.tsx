import React, { Dispatch, SetStateAction } from 'react';
import { Icon } from '@/shared/ui/icons/icon';
import styles from './styles.module.scss';
import { formModel } from '@/features/form/model';
import { notesModel } from '@/widgets/notes/model';

interface ControlProps {
    form: boolean;
    setForm: Dispatch<SetStateAction<boolean>>;
}

export const Control = ({ form, setForm }: ControlProps) => {
    return (
        <div className={styles.control}>
            {!form && (
                <>
                    <div className={styles.control__btn} onClick={() => {
                        setForm(true);
                        notesModel.selectNote(null);
                    }}>
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
            {form && (
                <div className={styles.control__btn} onClick={() => formModel.submitForm(true)}>
                    <Icon className={styles.control__icon} id='disk' />
                </div>
            )}
        </div>
    )
}
