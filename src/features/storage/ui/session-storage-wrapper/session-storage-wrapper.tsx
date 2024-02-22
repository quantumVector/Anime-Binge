import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { StorageItem } from '../stotage-item';

type Item = {
    id: number;
    content: string;
}[];

export const SessionStorageWrapper = () => {
    const [sessionItems, setSessionItems] = useState<Item>([]);
    const broadcastChannelRef = useRef(new BroadcastChannel('sessionItemsChannel'));

    useEffect(() => {
        const storedItems = JSON.parse(sessionStorage.getItem('sessionItems') || '[]');
        const countItems = sessionStorage.getItem('sessionCountItems');

        setSessionItems(storedItems);

        if (!countItems) {
            sessionStorage.setItem('sessionCountItems', '0');
        }
    }, []);

    const addSessionItem = () => {
        const count = +sessionStorage.getItem('sessionCountItems')! + 1;
        const item = [
            ...sessionItems,
            {
                id: new Date().getTime(),
                content: `item ${count}`,
            }
        ];

        setSessionItems(item);

        sessionStorage.setItem('sessionItems', JSON.stringify(item));
        sessionStorage.setItem('sessionCountItems', `${count}`);
        broadcastChannelRef.current.postMessage({ sessionItems: item });
    }

    const resetSessionStorge = () => {
        setSessionItems([]);

        sessionStorage.removeItem("sessionItems");
        sessionStorage.removeItem("sessionCountItems");
        broadcastChannelRef.current.postMessage({ sessionItems: [] });
    }

    return (
        <div className={styles.storage}>
            <h1 className={styles.storage__title}>Session Storage</h1>
            <div className={styles.storage__items}>
                {sessionItems && sessionItems.map((item) => (
                    <StorageItem
                        key={item.id}
                        type='session'
                        {...item}
                        items={sessionItems}
                        setter={setSessionItems}
                        broadcastChannel={broadcastChannelRef}
                    />
                ))}
            </div>
            <div className={styles.storage__plus} onClick={addSessionItem}>+</div>
            <div className={styles.storage__reset} onClick={resetSessionStorge}>reset all</div>
        </div>
    )
}
