import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { StorageItem } from '../stotage-item';

type Item = {
    id: number;
    content: string;
}[];

export const LocalStorageWrapper = () => {
    const [localItems, setLocalItems] = useState<Item>([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('localItems') || '[]');
        const countItems = localStorage.getItem('localCountItems');

        setLocalItems(storedItems);

        if (!countItems) {
            localStorage.setItem('localCountItems', '0');
        }
    }, []);

    const addLocalItem = () => {
        const count = +localStorage.getItem('localCountItems')! + 1;
        const item = [
            ...localItems,
            {
                id: new Date().getTime(),
                content: `item ${count}`,
            }
        ];

        setLocalItems(item);

        localStorage.setItem('localItems', JSON.stringify(item));
        localStorage.setItem('localCountItems', `${count}`);
    }

    const resetLocalStorge = () => {
        setLocalItems([]);

        localStorage.removeItem("localItems");
        localStorage.removeItem("localCountItems");
    }

    return (
        <div className={styles.storage}>
            <h1 className={styles.storage__title}>Local Storage</h1>
            <div className={styles.storage__items}>
                {localItems && localItems.map((item) => (
                    <StorageItem
                        key={item.id}
                        type='local'
                        {...item}
                        items={localItems}
                        setter={setLocalItems}
                    />
                ))}
            </div>
            <div className={styles.storage__plus} onClick={addLocalItem}>+</div>
            <div className={styles.storage__reset} onClick={resetLocalStorge}>reset all</div>
        </div>
    )
}
