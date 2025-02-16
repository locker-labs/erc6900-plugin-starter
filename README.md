## Quickstart



```bash
cp plugin-installer/.env.example plugin-installer/.env
# Edit the .env file with your private key and alchemy api key

pnpm install
pnpm build
pnpm get-address

# Send some ETH to the address so it can pay for gas
pnpm install-plugin
```

# Project layout

- PNPM monorepo
- `contracts/` - solidity CounterPlugin contract
- `plugin-installer/` - Install CounterPlugin with Alchemy SDK

Adding to an existing project:

