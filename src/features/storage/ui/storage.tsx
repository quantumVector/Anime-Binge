import React from 'react';
import styles from './styles.module.scss';
import { StorageMaker } from './storage-maker';
import { StorageMirror } from './storage-mirror';

interface StorageProps {
    type: 'page-1' | 'page-2';
}

export const Storage = ({ type }: StorageProps) => {
    return (
        <div className={styles.storage}>
            {type === 'page-1' && (
                <>
                    <StorageMaker storage='local' />
                    <StorageMaker storage='session' />
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
