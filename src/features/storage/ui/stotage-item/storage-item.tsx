import React, { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import styles from './styles.module.scss';
import { Icon } from '@/shared/ui/icons/icon';

type Item = {
    id: number;
    content: string;
}[];

interface StorageItemProps {
    type: 'local' | 'session';
    id: number;
    content: string;
    items: Item;
    setter: Dispatch<SetStateAction<Item>>;
    broadcastChannel?: MutableRefObject<BroadcastChannel>;
}

export const StorageItem = ({ type, id, content: initialContent, items, setter, broadcastChannel }: StorageItemProps) => {
    const [content, setContent] = useState(initialContent);
    const [isEditing, setIsEditing] = useState(false);

    const deleteItem = () => {
        const updatedItems = items.filter(item => item.id !== id);

        setter(updatedItems);

        if (type === 'local') {
            localStorage.setItem('localItems', JSON.stringify(updatedItems));
        }

        if (type === 'session') {
            sessionStorage.setItem('sessionItems', JSON.stringify(updatedItems));

            if (broadcastChannel) {
                broadcastChannel.current.postMessage({ sessionItems: updatedItems });
            }
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    const handleSaveClick = () => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, content } : item
        );

        setter(updatedItems);

        if (type === 'local') {
            localStorage.setItem('localItems', JSON.stringify(updatedItems));
        }

        if (type === 'session') {
            sessionStorage.setItem('sessionItems', JSON.stringify(updatedItems));

            if (broadcastChannel) {
                broadcastChannel.current.postMessage({ sessionItems: updatedItems });
            }
        }

        setIsEditing(false);
    }

    return (
        <div className={styles.storageItem}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={content}
                        onChange={handleInputChange}
                        autoFocus
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <span>{content}</span>
                    <div className={styles.storageItem__btnWrap}>
                        <div className={styles.storageItem__btn} onClick={handleEditClick}>
                            <Icon className={styles.storageItem__icon} id='pencil' />
                        </div>
                        <div className={styles.storageItem__btn} onClick={deleteItem}>
                            <Icon className={styles.storageItem__icon} id='trash-bin' />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
