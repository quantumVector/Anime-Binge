import React from 'react';
import styles from './styles.module.scss';
import { StorageWrapper } from './storage-wrapper';
import { StorageMirror } from './storage-mirror';

interface StorageProps {
    type: 'page-1' | 'page-2';
}

export const Storage = ({ type }: StorageProps) => {
    return (
        <div className={styles.storage}>
            {type === 'page-1' && (
                <>
                    <StorageWrapper storage='local' />
                    <StorageWrapper storage='session' />
                </>
            )}
            {type === 'page-2' && (
                <>
                    <StorageMirror storage='local' />
                    <StorageMirror storage='session' />
                </>
            )}
        </div>
    )
}
