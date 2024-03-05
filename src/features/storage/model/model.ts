import { createEvent, createStore, sample } from "effector";
import { persist as persistLocal } from "effector-storage/local";
import { persist as persistSession } from 'effector-storage/broadcast';
import { reset } from 'patronum';

export type Item = {
    id: number;
    content: string;
    count: number;
}[];

const updateLocalItems = createEvent<Item>();
const updateSessionItems = createEvent<Item>();
const resetLocal = createEvent();
const resetSession = createEvent();

const $localCount = createStore<number>(1);
const $sessionCount = createStore<number>(1);
const $localItems = createStore<Item>([]);
const $sessionItems = createStore<Item>([]);

persistLocal({
    store: $localItems,
    key: 'localItems',
});

sample({
    clock: updateLocalItems,
    target: $localItems,
});

sample({
    clock: updateLocalItems,
    fn: (clock) => clock[clock.length - 1].count + 1,
    target: $localCount,
});

reset({
    clock: resetLocal,
    target: [$localCount, $localItems],
});

persistSession({
    store: $sessionItems,
    key: 'sessionItems',
});

sample({
    clock: updateSessionItems,
    target: $sessionItems,
});

sample({
    clock: updateSessionItems,
    fn: (clock) => clock[clock.length - 1].count + 1,
    target: $sessionCount,
});

reset({
    clock: resetSession,
    target: [$sessionCount, $sessionItems],
});


export const model = {
    updateLocalItems,
    updateSessionItems,
    resetLocal,
    resetSession,
    $localCount,
    $sessionCount,
    $localItems,
    $sessionItems,
};