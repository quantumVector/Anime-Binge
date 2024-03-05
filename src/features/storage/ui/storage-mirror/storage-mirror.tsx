import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useUnit } from 'effector-react';
import { storageModel } from '../../model';

interface StorageMirrorProps {
    storage: 'local' | 'session';
}

export const StorageMirror = ({ storage }: StorageMirrorProps) => {
    const [isClient, setIsClient] = useState(false);
    const [
        localItems,
        sessionItems,
    ] = useUnit([
        storageModel.$localItems,
        storageModel.$sessionItems,
    ]);
    const items = storage === 'local' ? localItems : sessionItems;

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className={styles.storage}>
            <h1 className={styles.storage__title}>{`${storage} storage mirror`}</h1>
            <div className={styles.storage__items}>
                {isClient && items.map((item) => (
                    <div key={item.id} className={styles.storage__item}>
                        <span>{item.content}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
