export interface networkConfigItem {
    name: string;
    blockConfirmations?: number;
    minEntryFee: number;
    timeInterval: string;
    coordinatorAddress?: string;
    keyHash: string;
    subscriptionId?: number;
    requestConfirmations: number;
    callbackGasLimit: number;
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        minEntryFee: "5000000000000000",
        timeInterval: "30",
        // Gas lane for hh doesn't matter since it's being mocked anyways, just use Goerli's
        keyHash: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        requestConfirmations: 6,
        callbackGasLimit: 500000,
        // Price Feed Address, Coordinator Address, and subscriptionId not needed
    },

    1: {
        name: "mainnet",
        blockConfirmations: 6,
        minEntryFee: "5000000000000000",
        timeInterval: "30",
        coordinatorAddress: "0x271682DEB8C4E0901D1a1550aD2e64D568E69909",
        keyHash: "0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef",
        // subscriptionId: Your Mainnet SubscriptionId,
        requestConfirmations: 6,
        callbackGasLimit: 500000,
    },
    5: {
        name: "goerli",
        blockConfirmations: 6,
        minEntryFee: "5000000000000000",
        timeInterval: "30",
        coordinatorAddress: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        keyHash: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: 6426, //Add your subscription Id here
        requestConfirmations: 6,
        callbackGasLimit: 500000,
    },
};
