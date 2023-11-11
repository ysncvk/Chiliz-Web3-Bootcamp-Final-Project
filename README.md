# NFT Platform Fee

Add Platform fee properties in NFT Collectiosn contract in CHZ network, using Thirdweb

## Description

PlatformFee allows you to charge a percentage fee wherever there is a transfer of currency (ERC20 tokens or native tokens) in your contract.

## Configuration Process

Follow these steps to properly configure your environment for the application.

### Step 1: Environment File Setup

1. Navigate to the root directory of the project, ensuring you are at the top-level (same level as the `src` directory, not within it).
2. Create a new file and name it `.env.local`. This file will store important global settings required for the application to function correctly.

### Step 2: Environment Variables

Populate the `.env.local` file with the necessary environment variables. These are crucial for linking the application with your specific resources on Thirdweb. Below is a list of the required variables:

-   `NEXT_PUBLIC_CLIENT_ID`: Your unique client identifier from Thirdweb. You can find this by logging into your account, navigating to "Settings," then "API Keys," and selecting your key to view the clientID.
-   `NEXT_PUBLIC_NETWORK`: The specific network name on Thirdweb, e.g., "SpicyChain."
-   `NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS`: The address of your marketplace smart contract.
-   `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`: The address corresponding to your NFT smart contract.

### Step 3: Dependency Installation

Execute the following command in your terminal to install the project dependencies:

```sh
npm install
```

### Step 4: Launching the Development Server

To start the development server, run:

```sh
npm run dev
```

### Getting the Platform Fee Info

```sh
const { data: platformFees, isLoading, error } = usePlatformFees(contract);
```

### Setting the Platform Fee Info

```sh
const Component = () => {
  const { contract } = useContract("0x0000000000000000000000000000000000000000");
  const {
    mutate: updatePlatformFees,
    isLoading,
    error,
  } = useUpdatePlatformFees(contract);

  if (error) {
    console.error("failed to update platform fees", error);
  }

  return (
    <button
      disabled={isLoading}
      onClick={() => updatePlatformFees({ updatePayload: { fee_recipient: "0xA23ff842B50b102B6182ea7795eDe5697b64aa8C", platform_fee_basis_points: 5_00 } })}
    >
      Update Platform fees
    </button>
  );
};
```