// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CounterPlugin} from "../src/CounterPlugin.sol";

contract CounterPluginScript is Script {
    CounterPlugin public counterPlugin;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        counterPlugin = new CounterPlugin();

        vm.stopBroadcast();
    }
}
