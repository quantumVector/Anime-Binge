import React from 'react';
import { Icon } from '@/shared/ui/icons/icon';
import styles from './styles.module.scss';

export const Control = () => {
    return (
        <div className={styles.control}>
            <div className={styles.control__btn}>
                <Icon className={styles.control__icon} id='plus' />
            </div>
            <div className={styles.control__btn}>
                <Icon className={styles.control__icon} id='trash-bin' />
            </div>
            <div className={styles.control__btn}>
                <Icon className={styles.control__icon} id='bookmark' />
            </div>
        </div>
    )
}
