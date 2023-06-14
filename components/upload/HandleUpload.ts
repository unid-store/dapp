import { NFTStorage } from "nft.storage";

export const upload = async (files: File[]) => {
  const { cid: filesCID } = await NFTStorage.encodeDirectory(files);
  const exists = await NFTStorage.check(
    { endpoint: new URL("https://api.nft.storage") },
    filesCID.toString()
  ).catch(() => false);

  if (!exists) {
    const { ucan, did } = await fetch("/auth/nft.storage", {
      method: "POST",
    }).then((res) => res.json());

    const nftstorage = new NFTStorage({ token: ucan, did });

    const cid = await nftstorage.storeDirectory(files);
    return { cid, exists: false };
  } else {
    return { cid: filesCID.toString(), exists: true };
  }
};
