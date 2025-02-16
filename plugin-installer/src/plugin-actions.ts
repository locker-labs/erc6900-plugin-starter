import { PLUGIN_ADDRESS } from "./constants";

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
        args: [PLUGIN_ADDRESS],
    });
    console.log("Counter Plugin uninstalled:", res.hash);
    return res;
}

async function getCount(extendedAccount: any): Promise<number> {
    if (!await isCounterPluginInstalled(extendedAccount)) {
        throw new Error("Counter plugin not installed");
    }

    // Call the count mapping getter function with the account's address
    const count = await extendedAccount.provider.call({
        to: PLUGIN_ADDRESS,
        data: `0x${
            // count function selector
            "c2ee4188" +
            // pad the address to 32 bytes
            extendedAccount.address.slice(2).padStart(64, "0")
            }`
    });

    // Convert the hex string result to a number
    return parseInt(count, 16);
}

export {
    installCounterPlugin,
    getCount,
    uninstallCounterPlugin,
};
