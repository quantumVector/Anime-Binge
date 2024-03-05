import React, { MutableRefObject, useState } from 'react';
import styles from './styles.module.scss';
import { Icon } from '@/shared/ui/icons/icon';
import { storageModel } from '../../model';
import { Item } from '../../model/model';


interface StorageItemProps {
    type: 'local' | 'session';
    id: number;
    content: string;
    items: Item;
    broadcastChannel: MutableRefObject<BroadcastChannel>;
}

export const StorageItem = ({ type, id, content: initialContent, items, broadcastChannel }: StorageItemProps) => {
    const [content, setContent] = useState(initialContent);
    const [isEditing, setIsEditing] = useState(false);

    const deleteItem = () => {
        const updatedItems = items.filter(item => item.id !== id);

        if (type === 'local') {
            storageModel.updateLocalItems(updatedItems);
        }

        if (type === 'session') {
            storageModel.updateSessionItems(updatedItems);
            broadcastChannel.current.postMessage({ sessionItems: updatedItems });
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

        if (type === 'local') {
            storageModel.updateLocalItems(updatedItems);
        }

        if (type === 'session') {
            storageModel.updateSessionItems(updatedItems);
            broadcastChannel.current.postMessage({ sessionItems: updatedItems });
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
