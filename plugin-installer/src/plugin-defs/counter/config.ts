import { CHAIN, PLUGIN_ADDRESS } from "@/constants";
import { CounterPluginAbi } from "@abi/CounterPluginAbi";
import type { PluginConfig } from "@account-kit/plugingen";

export const CounterPluginGenConfig: PluginConfig = {
    name: "CounterPlugin",
    abi: CounterPluginAbi,
    addresses: {
        [CHAIN.id]: PLUGIN_ADDRESS,
    },
    installConfig: {
        initAbiParams: [],
        dependencies: [],
    },
};