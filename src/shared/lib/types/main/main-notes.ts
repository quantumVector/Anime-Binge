import { BlockMainType } from "./common";

export namespace MainNotesTypes {
  export interface MainNotes {
    id: number;
    type: BlockMainType.Notes;
    data: Note[];
  }

  export interface Note {
    id: number;
    title: string;
    desc?: string;
    tags: Tag[];
    text?: string;
  }

  export interface Tag {
    id: number;
    text: string;
  }
}