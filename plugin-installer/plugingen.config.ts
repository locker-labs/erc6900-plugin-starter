import { defineConfig } from "@account-kit/plugingen";
import { CounterPluginGenConfig } from "./src/plugin-defs/counter/config";
import dotenv from "dotenv";
import { CHAIN } from "@/constants";

dotenv.config();
console.log("RPC_URL: ", process.env.RPC_URL);

export default defineConfig([
    {
        outDir: "./src/plugin-gens",
        chain: CHAIN,
        rpcUrl: process.env.RPC_URL as string,
        plugins: [CounterPluginGenConfig],
    }
]);
