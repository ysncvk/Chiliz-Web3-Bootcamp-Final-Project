import Layout from "@/layout/Layout";
import { getNFTContract } from "@/util/getContracts";
import {useAddress, useMintNFT, useUpdatePlatformFees} from "@thirdweb-dev/react";
import CardLink from "@/components/CardLink";
import React, {useState} from "react";
import {Platformdata} from "@/types/platformdata";



export default function LoyaltyCard() {
    const [fee, setFee] = useState(0);
    const { nft_contract } = getNFTContract();

    const {
        mutate: updatePlatformFees,
        isLoading,
        error,
    } = useUpdatePlatformFees(nft_contract);

    const address = useAddress();

    const handleFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFee(Number(event.target.value));
    };


    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            updatePlatformFees( { fee_recipient: address, platform_fee_basis_points: fee} )
        } catch (e) {
            console.log("Error Minting", e);
        }
    };

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    Set The Platform fee
                </h1>

                <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                    <h1 className="text-2xl font-semibold my-4 text-center">
                        Set the new Fee
                    </h1>
                    <form className="formPlatform" onSubmit={handleSubmit}>
                        <div className="inputArea">
                            <label className="font-bold text-xl">Fee:</label>
                            <input
                                className="inputPlatform"
                                placeholder="New Fee"
                                type="number"
                                value={fee}
                                onChange={handleFeeChange}
                            />
                        </div>
                        <button
                            className="mt-6 bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                            type="submit"
                        >
                            Update Fee
                        </button>
                    </form>

                    {isLoading && (
                        <div className="text-center mt-4">
                            Updating Fee ...
                        </div>
                    )}
                    {(error as unknown as boolean) && (
                        <div className="text-center mt-4">
                            Update Error
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
