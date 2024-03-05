import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { StorageItem } from '../stotage-item';
import { useUnit } from 'effector-react';
import { storageModel } from '../../model';

interface StorageWrapperProps {
    storage: 'local' | 'session';
}

export const StorageWrapper = ({ storage }: StorageWrapperProps) => {
    const [isClient, setIsClient] = useState(false);
    const [
        localItems,
        localCount,
        updateLocalItems,
        resetLocal,
        sessionItems,
        sessionCount,
        updateSessionItems,
        resetSession,
    ] = useUnit([
        storageModel.$localItems,
        storageModel.$localCount,
        storageModel.updateLocalItems,
        storageModel.resetLocal,
        storageModel.$sessionItems,
        storageModel.$sessionCount,
        storageModel.updateSessionItems,
        storageModel.resetSession,
    ]);
    const broadcastChannelRef = useRef(new BroadcastChannel('sessionItemsChannel'));
    const items = storage === 'local' ? localItems : sessionItems;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const addItem = () => {
        const newItem = {
            id: new Date().getTime(),
            content: `item ${storage === 'local' ? localCount : sessionCount}`,
            count: storage === 'local' ? localCount : sessionCount,
        };

        if (storage === 'local') {
            updateLocalItems([...items, newItem]);
        } else {
            updateSessionItems([...items, newItem]);

            broadcastChannelRef.current.postMessage({ sessionItems: [...items, newItem] });
        }
    }

    const resetStorge = () => {
        if (storage === 'local') {
            resetLocal();
        } else {
            resetSession();
            broadcastChannelRef.current.postMessage({ sessionItems: [] });
        }
    }

    return (
        <div className={styles.storage}>
            <h1 className={styles.storage__title}>{`${storage} storage`}</h1>
            <div className={styles.storage__items}>
                {isClient && items.map((item) => (
                    <StorageItem
                        key={item.id}
                        type={storage}
                        {...item}
                        items={items}
                        broadcastChannel={broadcastChannelRef}
                    />
                ))}
            </div>
            <div className={styles.storage__plus} onClick={addItem}>+</div>
            <div className={styles.storage__reset} onClick={resetStorge}>reset all</div>
        </div>
    )
}
