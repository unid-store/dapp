import { useReducer } from "react";

type State = {
  uploading: boolean;
  files: File[];
  exists: boolean;
  cid: string;
  progress: number;
  link: string;
};

export const enum Actions {
  ToggleUploading = "TOGGLE_UPLOADING",
  SetFiles = "SET_FILES",
  SetExists = "SET_EXISTS",
  SetCID = "SET_CID",
  UpdateProgress = "UPDATE_PROGRESS",
  Reset = "RESET",
}

export type ActionType =
  | { type: Actions.ToggleUploading }
  | { type: Actions.SetFiles; payload: File[] }
  | { type: Actions.SetExists; payload: boolean }
  | { type: Actions.SetCID; payload: string }
  | { type: Actions.UpdateProgress; payload: number }
  | { type: Actions.Reset };

const initialState: State = {
  uploading: false,
  files: [],
  exists: false,
  cid: "",
  progress: 0,
  link: "",
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case Actions.ToggleUploading:
      return { ...state, uploading: !state.uploading };
    case Actions.SetFiles:
      return { ...state, files: action.payload };
    case Actions.SetExists:
      return { ...state, exists: action.payload };
    case Actions.SetCID:
      return {
        ...state,
        cid: action.payload,
        link: genLink(action.payload, state.files),
      };
    case Actions.UpdateProgress:
      return { ...state, progress: state.progress + action.payload };
    case Actions.Reset:
      return initialState;
    default:
      return state;
  }
};

const genLink = (cid: string, files: File[]) =>
  `https://${cid}.ipfs.nftstorage.link/${
    files.length > 1 ? "" : files[0].name
  }`;

// @NOTE this is not shared across components! It is used in `Upload` and drills state and dispatch into child component props
export const useUploadState = () => useReducer(reducer, initialState);
