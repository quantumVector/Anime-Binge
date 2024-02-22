import React from 'react';
import styles from './styles.module.scss';
import { LocalStorageWrapper } from './local-storage-wrapper';
import { SessionStorageWrapper } from './session-storage-wrapper';
import { LocalStorageMirror } from './local-storage-mirror';
import { SessionStorageMirror } from './session-storage-mirror';

interface StorageProps {
    type: 'page-1' | 'page-2';
}

export const Storage = ({ type }: StorageProps) => {
    return (
        <div className={styles.storage}>
            {type === 'page-1' && (
                <>
                    <LocalStorageWrapper />
                    <SessionStorageWrapper />
                </>
            )}
            {type === 'page-2' && (
                <>
                    <LocalStorageMirror />
                    <SessionStorageMirror />
                </>
            )}
        </div>
    )
}
