import { CHAIN, PLUGIN_ADDRESS } from "./constants";
import { CounterPluginAbi } from "../abi/CounterPluginAbi";
import { createPublicClient, http, getContract } from "viem";

async function isCounterPluginInstalled(
    extendedAccount: any
): Promise<boolean> {
    const installedPlugins = await extendedAccount.getInstalledPlugins({});
    console.log("Installed plugins:", installedPlugins);
    if (!installedPlugins.includes(PLUGIN_ADDRESS)) {
        return false;
    }
    return true;
}


async function installCounterPlugin(extendedAccount: any) {
    console.log("Installing the counter plugin...");
    if (await isCounterPluginInstalled(extendedAccount)) {
        console.log("Counter plugin already installed.");
        return null;
    }
    const res = await extendedAccount.installCounterPlugin({
        args: [],
    });
    console.log("Counter Plugin installed:", res.hash);
    return res;
}

async function uninstallCounterPlugin(extendedAccount: any) {
    console.log("Uninstalling the plugin at address:", PLUGIN_ADDRESS);

    if (!(await isCounterPluginInstalled(extendedAccount))) {
        console.log("Counter plugin not installed.");
        return null;
    }

    console.log("Uninstalling the plugin...");
    const res = await extendedAccount.uninstallPlugin({
        pluginAddress: PLUGIN_ADDRESS,
    });
    console.log("Counter Plugin uninstalled:", res.hash);
    return res;
}

async function increment(extendedAccount: any) {
    if (!await isCounterPluginInstalled(extendedAccount)) {
        throw new Error("Counter plugin not installed");
    }

    console.log("Incrementing counter...");
    const res = await extendedAccount.increment({
        args: [],
    });
    console.log("Counter incremented:", res.hash);
    return res;
}


export {
    installCounterPlugin,
    increment,
    uninstallCounterPlugin,
};
