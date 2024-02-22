import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { StorageItemMirror } from '../storage-item-mirror';

type Item = {
    id: number;
    content: string;
}[];

export const SessionStorageMirror = () => {
    const [mirrorItems, setMirrorItems] = useState<Item>([]);

    useEffect(() => {
        const storedItems = JSON.parse(sessionStorage.getItem('sessionItems') || '[]');

        setMirrorItems(storedItems);

        const handleBroadcastMessage = (event: MessageEvent) => {
            const { sessionItems } = event.data;
            
            setMirrorItems(sessionItems);
        };
    
        const broadcastChannel = new BroadcastChannel('sessionItemsChannel');
        
        broadcastChannel.addEventListener('message', handleBroadcastMessage);
    
        return () => {
            broadcastChannel.removeEventListener('message', handleBroadcastMessage);
            broadcastChannel.close();
        };
    }, []);

    return (
        <div className={styles.storage}>
            <h1 className={styles.storage__title}>Session Storage Mirror</h1>
            <div className={styles.storage__items}>
                {mirrorItems.map((item) => (
                    <StorageItemMirror key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}
