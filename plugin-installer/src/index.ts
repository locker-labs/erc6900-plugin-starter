import * as dotenv from "dotenv";
import { getAccountAddress, getModularAccountClient } from "./client";
import { counterPluginActions } from "./plugin-gens/counter/plugin";
import { getCount, installCounterPlugin, uninstallCounterPlugin } from "./plugin-actions";
dotenv.config();

export async function main() {
    const args = process.argv.slice(2);
    const modularAccount = await getModularAccountClient()
    const extendedAccount = modularAccount.extend(counterPluginActions);

    switch (args[0]) {
        case "get-address":
            const address = await getAccountAddress();
            console.log("Account address:", address);
            break;

        case "install-plugin":
            await installCounterPlugin(extendedAccount);
            break;

        case "uninstall-plugin":
            await uninstallCounterPlugin(extendedAccount);
            break;

        case "get-count":
            const count = await getCount(extendedAccount);
            console.log("Count:", count);
            break;

        default:
            console.log(
                "Invalid command. Use one of: 'get-address', 'install-plugin', 'uninstall-plugin', 'get-count'."
            );
            console.log("Example: 'npm run execute get-address'");
            break;
    }

    return;
}


main();