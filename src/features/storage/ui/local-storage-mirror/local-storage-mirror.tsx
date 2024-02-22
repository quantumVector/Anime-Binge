import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { StorageItemMirror } from '../storage-item-mirror';

type Item = {
    id: number;
    content: string;
}[];

export const LocalStorageMirror = () => {
    const [mirrorItems, setMirrorItems] = useState<Item>([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('localItems') || '[]');

        setMirrorItems(storedItems);

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'localItems') {
                const newItems = JSON.parse(event.newValue || '[]');
                setMirrorItems(newItems);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className={styles.storage}>
            <h1 className={styles.storage__title}>Local Storage Mirror</h1>
            <div className={styles.storage__items}>
                {mirrorItems.map((item) => (
                    <StorageItemMirror key={item.id} {...item} />  
                ))}
            </div>
        </div>
    )
}
