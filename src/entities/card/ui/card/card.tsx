import { Tag } from '@/shared/ui/tag/ui';
import { Typo } from '@/shared/ui/typo';
import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { MainNotesTypes } from '@/shared/lib/types';

interface CardProps extends MainNotesTypes.Note {
    onClick: () => void;
    active: boolean;
    waiting: boolean;
    selected?: MainNotesTypes.Note;
}

export const Card = ({
    id,
    title,
    desc,
    tags,
    onClick,
    active,
    waiting,
    selected,
}: CardProps) => {
    return (
        <div
            className={clsx(styles.card,
                active && styles.card__active,
                waiting && styles.card__waiting,
                selected && styles.card__selected,
            )}
            onClick={onClick}
        >
            <Typo as='h2' design='header-s' raw={title} className={styles.card__title} />
            <Typo as='p' design='text-s' raw={desc} className={styles.card__desc} />
            <div className={styles.card__tags}>
                {tags.map((item) => (
                    <Tag key={item.id} id={item.id} text={item.text} />
                ))}
            </div>
        </div>
    )
}