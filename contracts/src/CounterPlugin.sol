// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import {BasePlugin} from "@alchemy/modular-account/src/plugins/BasePlugin.sol";
import {IPluginExecutor} from "@alchemy/modular-account/src/interfaces/IPluginExecutor.sol";
import {IPlugin} from "@alchemy/modular-account/src/interfaces/IPlugin.sol";
import {
    ManifestFunction,
    ManifestAssociatedFunctionType,
    ManifestAssociatedFunction,
    PluginManifest,
    PluginMetadata
} from "@alchemy/modular-account/src/interfaces/IPlugin.sol";
import {UserOperation} from "@alchemy/modular-account/src/interfaces/erc4337/UserOperation.sol";

/// @title Counter Plugin
/// @author Locker Team
/// @notice This plugin lets increment a count!
contract CounterPlugin is BasePlugin {
    // metadata used by the pluginMetadata() method down below
    string public constant NAME = "Locker Counter Plugin";
    string public constant VERSION = "0.0.1";
    string public constant AUTHOR = "Locker Team";

    /*
    * Note to Developer:
    * If you're using storage during validation, you need to use "associated storage".
    * ERC 7562 defines the associated storage rules for ERC 4337 accounts.
    * See: https://eips.ethereum.org/EIPS/eip-7562#validation-rules
    * 
    * Plugins need to follow this definition for bundlers to accept user ops targeting their validation functions.
    * In this case, "count" is only used in an execution function, but nonetheless, it's worth noting
    * that a mapping from the account address is considered associated storage.
    */
    mapping(address => uint256) public count;

    // ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    // ┃    Execution functions    ┃
    // ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    // this is the one thing we are attempting to do with our plugin!
    // we define increment to modify our associated storage, count
    // then in the manifest we define it as an execution function,
    // and we specify the validation function for the user op targeting this function
    function increment() external {
        count[msg.sender]++;
    }

    function userOpValidationFunction(
        uint8 functionId,
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) external override(BasePlugin) returns (uint256) {
        // Ignore the input parameters since we're always returning true
        (functionId, userOp, userOpHash);

        // Return packed validation data where:
        // - validAfter = 0 (6 bytes)
        // - validUntil = type(uint48).max (6 bytes) 
        // - authorizer = address(0) (20 bytes)
        // This indicates the operation is always valid
        uint48 validAfter = 0;
        uint48 validUntil = type(uint48).max;
        uint160 authorizer = 0;

        // Correct the ordering: uint48 validAfter | uint48 validUntil | uint160 authorizer
        return (uint256(validAfter) << 208) | (uint256(validUntil) << 160) | authorizer;
    }

    // ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    // ┃    Plugin interface functions    ┃
    // ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    /// @inheritdoc BasePlugin
    function onInstall(bytes calldata) external pure override {}

    /// @inheritdoc BasePlugin
    function onUninstall(bytes calldata) external pure override {}

    /// @inheritdoc BasePlugin
    function pluginManifest() external pure override returns (PluginManifest memory) {
        PluginManifest memory manifest;

        // Remove dependency on MultiOwner plugin since we're not using it
        manifest.dependencyInterfaceIds = new bytes4[](0);

        // Keep the execution function for increment
        manifest.executionFunctions = new bytes4[](1);
        manifest.executionFunctions[0] = this.increment.selector;

        // Create validation function that points to our own userOpValidationFunction
        ManifestFunction memory validationFunction = ManifestFunction({
            functionType: ManifestAssociatedFunctionType.SELF,
            functionId: 0,
            dependencyIndex: 0
        });

        // Link increment with our validation function
        manifest.userOpValidationFunctions = new ManifestAssociatedFunction[](1);
        manifest.userOpValidationFunctions[0] = ManifestAssociatedFunction({
            executionSelector: this.increment.selector,
            associatedFunction: validationFunction
        });

        // We do not use runtime validation, so leave these arrays empty.
        manifest.runtimeValidationFunctions = new ManifestAssociatedFunction[](0);
        manifest.preRuntimeValidationHooks = new ManifestAssociatedFunction[](0);

        // Set permissions.
        manifest.permitAnyExternalAddress = true;
        manifest.canSpendNativeToken = true;
        manifest.permittedExecutionSelectors = new bytes4[](0);

        return manifest;
    }

    /// @inheritdoc BasePlugin
    function pluginMetadata() external pure virtual override returns (PluginMetadata memory) {
        PluginMetadata memory metadata;
        metadata.name = NAME;
        metadata.version = VERSION;
        metadata.author = AUTHOR;
        return metadata;
    }
}