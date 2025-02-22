## Quickstart



```bash
cp plugin-installer/.env.example plugin-installer/.env
# Edit the .env file with your private key and alchemy api key

# Install dependencies
pnpm install

# Build the contracts
cd contracts
forge build
# Deploy contract and note the address
forge script script/CounterPlugin.s.sol:CounterPluginScript --rpc-url RPC_URL --private-key PRIVATE_KEY --broadcast

# Build the plugin installer
cd ../plugin-installer

# -> DO THIS MANUALLY: Update src/constants.ts with the address of the deployed contract <-

# Build the plugin installer
pnpm build

# Get the address of the modular account that the plugin will be installed on
pnpm get-address

# -> DO THIS MANUALLY: end some ET\H to the address so it can pay for gas <-

# Install the plugin
pnpm install-plugin

# Increment the counter
pnpm increment

# Verify that count increased
cast call CONTRACT_ADDRESS "count(address)" SMART_ACCOUNT_ADDRESS --rpc-url RPC_URL  --private-key PRIVATE_KEY

# Uninstall the plugin
pnpm uninstall-plugin
```

## Project layout

- PNPM monorepo
- `contracts/` - solidity CounterPlugin contract
- `plugin-installer/` - Install CounterPlugin with Alchemy SDK

