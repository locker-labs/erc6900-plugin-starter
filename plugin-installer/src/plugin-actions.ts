import { PLUGIN_ADDRESS } from "./constants";

async function isCounterPluginInstalled(
    extendedAccount: any
): Promise<boolean> {
    const installedPlugins = await extendedAccount.getInstalledPlugins({});
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


export {
    installCounterPlugin,
};
