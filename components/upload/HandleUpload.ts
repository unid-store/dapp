import { Dispatch, useEffect } from "react";
import { NFTStorage } from "nft.storage";
import { ActionType, Actions } from "./useUploadState";

export const upload = async (files: File[], dispatch: Dispatch<ActionType>) => {
  const { car, cid: cidObj } = await NFTStorage.encodeDirectory(files);
  const cid = cidObj.toString();

  dispatch({ type: Actions.ToggleUploading });
  dispatch({ type: Actions.SetFiles, payload: files });
  dispatch({ type: Actions.SetCID, payload: cid });

  const check = await NFTStorage.check(
    { endpoint: new URL("https://api.nft.storage/") },
    cid
  ).catch((error) => {
    console.error({ error });
    if (error.message === "NFT not found") {
      return undefined;
    } else {
      throw new Error(`Failed to check files: ${error.message}`);
    }
  });

  const exists = !!check;

  dispatch({ type: Actions.SetExists, payload: exists });

  if (!exists) {
    const { ucan, did } = await fetch("/auth/nft.storage", {
      method: "POST",
    }).then((res) => res.json());

    const nftstorage = new NFTStorage({ token: ucan, did });

    await nftstorage.storeCar(car, {
      maxChunkSize: 6553600 / 2, // reduce chunk size for better progress feedback
      onStoredChunk: (size) =>
        dispatch({ type: Actions.UpdateProgress, payload: size }),
    });
  }
  dispatch({ type: Actions.ToggleUploading });
};
