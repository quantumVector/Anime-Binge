import { MainNotesTypes } from "./main-notes";

export namespace MainPageTypes {
    export interface MainPage {
        blocks: MainNotesTypes.MainNotes[];
    }
}