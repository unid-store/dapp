import { build } from "ucan-storage/ucan-storage";
import { KeyPair } from "ucan-storage/keypair";
import { NextResponse } from "next/server";

const pk = process.env.NFT_STORAGE_UCAN_PK;
const apiKey = process.env.NFT_STORAGE_API_KEY;
const endpoint = process.env.NFT_STORAGE_API_ENDPOINT;

async function registerDID(did: string) {
  const registerRes = await fetch(`${endpoint}/user/did`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      did,
    }),
  });
  if (!registerRes.ok) {
    throw Error("Failed to register DID");
  }
}

const fetchRootUCAN = async () =>
  await fetch(`${endpoint}/ucan/token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((res) => res.json())
    .then(({ ok, value }) => {
      if (!ok) throw new Error(`Failed to fetch root ucan token`);
      return value;
    });

const signRequestUCAN = async (
  kp: KeyPair,
  serviceDID: string,
  rootUCAN: string
) =>
  await build({
    issuer: kp,
    audience: serviceDID,
    lifetimeInSeconds: 500000,
    capabilities: [
      {
        with: `storage://${kp.did()}`,
        can: "upload/IMPORT",
      },
    ],
    proofs: [rootUCAN],
  });

const fetchProviderDID = async () =>
  await fetch(`${endpoint}/did`)
    .then((res) => res.json())
    .then(({ ok, value }) => {
      if (!ok) throw new Error(`Failed to fetch nft.storage provider DID`);
      return value;
    });

export async function POST() {
  // Step 0: check env variables set up
  if (!pk) throw new Error("No nft.storage private key env var on server!");
  if (!apiKey) throw new Error("No nft.storage api key env var on server!");
  if (!endpoint) throw new Error("No nft.storage endpoint env var on server!");

  try {
    // Step 1: get key pair from env private key
    const kp = await KeyPair.fromExportedKey(pk);
    const did = kp.did();

    // Step 2: fetch nft.storage service DID
    const serviceDID = await fetchProviderDID();

    // Step 2: register unid.store did
    await registerDID(did);

    // Step 3: fetch root ucan
    const rootUCAN = await fetchRootUCAN();

    // Sign a new request UCAN
    const ucan = await signRequestUCAN(kp, serviceDID, rootUCAN);

    return NextResponse.json({ ucan, did });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
