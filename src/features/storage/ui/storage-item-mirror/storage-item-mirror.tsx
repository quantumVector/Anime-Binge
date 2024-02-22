import React from 'react';
import styles from './styles.module.scss';

interface StorageItemMirrorProps {
    content: string;
}

export const StorageItemMirror = ({ content }: StorageItemMirrorProps) => {
    return (
        <div className={styles.storageItem}>
            <span>{content}</span>
        </div>
    )
}
