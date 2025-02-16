import { LocalAccountSigner } from "@aa-sdk/core";
import { alchemy } from "@account-kit/infra";
import { createModularAccountAlchemyClient } from "@account-kit/smart-contracts";
import * as dotenv from "dotenv";
import { CHAIN } from "./constants";
dotenv.config();

const PRIV_KEY = process.env.PRIVATE_KEY!;
console.log("PRIV_KEY", PRIV_KEY)

export const getModularAccountClient = () => createModularAccountAlchemyClient({
    signer: LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIV_KEY}`),
    chain: CHAIN,
    transport: alchemy({ apiKey: process.env.ALCHEMY_API_KEY as string }),
});

export const getAccountAddress = async () => {
    const modularAccount = await getModularAccountClient();
    const address = await modularAccount.getAddress();
    return address;
};
