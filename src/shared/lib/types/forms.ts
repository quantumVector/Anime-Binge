import { MainNotesTypes } from "./main";

export type FieldsForm = {
    select: string;
    firstName: string;
    lastName: string;
    email: string;
}

export type SelectOption = {
    value: string;
    label: string;
}

export type FormData = {
    noteData: MainNotesTypes.Note;
    operation: 'add' | 'remove' | 'update';
}