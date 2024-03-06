import { StoreWritable, createEvent, sample } from "effector";

interface PersistentStorageProps {
    store: StoreWritable<any>;
    key: string;
    adapter: string;
}

export const persistentStorage = ({ store, key, adapter }: PersistentStorageProps) => {
    let storage: Storage;
    const updateStore = createEvent();

    sample({
        clock: updateStore,
        target: store,
    });

    if (typeof window !== "undefined") {
        if (adapter === 'local') {
            storage = localStorage;
        }
        if (adapter === 'session') {
            storage = sessionStorage;
        }
    }

    const initStorage = () => {
        if (storage) {
            const storedItems = storage.getItem(key);

            if (!storedItems) {
                storage.setItem(key, '[]');
            } else {
                const storedItems = JSON.parse(storage.getItem(key) || '[]');
                updateStore(storedItems);
            }
        }
    };

    const setStoreWatching = () => {
        if (storage) {
            store.watch((items: any) => {
                storage.setItem(key, JSON.stringify(items));
            });
        }
    };

    const setLocalStorageSending = () => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key) {
                const items = JSON.parse(e.newValue || '[]');

                updateStore(items);
            }
        };

        if (typeof window !== "undefined") {
            window.addEventListener('storage', handleStorageChange);
        }
    }

    const setSessionStorageSending = () => {
        const handleBroadcastMessage = (event: MessageEvent) => {
            console.log('event.data', event.data);
            const { sessionItems } = event.data;

            updateStore(sessionItems);
        };

        if (typeof window !== "undefined") {
            const broadcastChannel = new BroadcastChannel(key);

            broadcastChannel.addEventListener('message', handleBroadcastMessage);
        }
    }

    initStorage();
    setStoreWatching();

    if (adapter === 'local') {
        setLocalStorageSending();
    }
    if (adapter === 'session') {
        setSessionStorageSending();
    }
};
