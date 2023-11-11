import Layout from "@/layout/Layout";
import { getNFTContract } from "@/util/getContracts";
import {useAddress, useOwnedNFTs, usePlatformFees} from "@thirdweb-dev/react";
import CardLink from "@/components/CardLink";
import React from "react";



export default function LoyaltyCard() {
    const { nft_contract } = getNFTContract();
    const address = useAddress();

    const { data: platformFees, isLoading, error } = usePlatformFees(nft_contract);
    console.log(platformFees)

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    Platform Fees
                </h1>

                {!address && (
                    <div>
                        <div className="text-center">
                            You need to connect your wallet first!
                        </div>
                    </div>
                )}

                {address && isLoading ? (
                    <div className="text-center">Loading Platfrom Fees.</div>
                ) : (
                    <div className="platform">

                        <div>Platform fee: {platformFees?.platform_fee_basis_points}</div>
                        <div> Recipient: {platformFees?.platform_fee_recipient}</div>
                        <CardLink
                            href="/platformSet"
                            title="Platform Settings"
                            description="Set your platform fee"
                        />

                    </div>



                )}
            </div>
        </Layout>
    );
}
