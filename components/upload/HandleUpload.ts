import { Dispatch, SetStateAction } from "react";
import { NFTStorage } from "nft.storage";

export const upload = async (
  files: File[],
  setProgress: Dispatch<SetStateAction<number>>,
  setStarted: Dispatch<SetStateAction<boolean>>
) => {
  const { car, cid: cidObj } = await NFTStorage.encodeDirectory(files);
  const cid = cidObj.toString();

  const exists = await NFTStorage.check(
    { endpoint: new URL("https://api.nft.storage/") },
    cid
  ).catch(() => false);

  if (!exists) {
    const { ucan, did } = await fetch("/auth/nft.storage", {
      method: "POST",
    }).then((res) => res.json());

    const nftstorage = new NFTStorage({ token: ucan, did });

    await nftstorage.storeCar(car, {
      maxChunkSize: 6553600 / 2, // reduce chunk size for better progress feedback
      onStoredChunk: (size) => {
        setStarted(true);
        setProgress((prev) => prev + size);
      },
    });
    return { cid, exists: false };
  } else {
    return { cid, exists: true };
  }
};
