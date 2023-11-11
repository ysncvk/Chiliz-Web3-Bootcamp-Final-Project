
import { useContract, useTransferNFT } from "@thirdweb-dev/react";
import React, {FC} from "react";
import {getNFTContract} from "@/util/getContracts";


interface TransferNFTCardProps {
    address: string;
    onUpdateAddress: (newAddress: string) => void;
    id: string;
}
const TransferNFTCard: FC<TransferNFTCardProps>= ({ address, onUpdateAddress, id }) => {
    const { nft_contract } = getNFTContract();

    const {
        mutate: transferNFT,
        isLoading,
        error,
    } = useTransferNFT(nft_contract);

    if (error) {
        console.error("failed to transfer NFT", error);
    }

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateAddress(event.target.value);
    };

    return (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg w-5/6 shadow-md mt-4">
            <h1 className="text-2xl font-semibold mb-2 ">Transfer NFT</h1>

            <div>
                <label className="font-bold text-xl">Enter Address:</label>
                <br />
                <input
                    className=" ml-0 mt-4 bg-gray-800 w-5/6 border-2"
                    placeholder="Recipient Address"
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                />
            </div>


            <button
                className="mt-4 bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
                onClick={() => transferNFT({
                    to: address,
                    tokenId: Number(id)
                })}
            >
                Transfer
            </button>
        </div>

    );
};

export default TransferNFTCard;