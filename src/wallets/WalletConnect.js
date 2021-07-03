import WalletConnectProvider from "@walletconnect/web3-provider"
import { eventHub } from "../main";
import Web3 from "web3";

export default async () => {

    let web3

    const provider = new WalletConnectProvider({
        infuraId: process.env.VUE_APP_INFURA_PROJECT_ID
    });

    provider.on('accountsChanged', (accounts) => {

        eventHub.$emit('changeAccount', accounts[0])
    })

    provider.on('disconnect', () => {

        eventHub.$emit('disconnect')
    })

    await provider.enable();

    web3 = new Web3(provider)

    return { web3 }
}