import detectEthereumProvider from "@metamask/detect-provider"
import { eventHub } from "../main";
import Web3 from "web3";

export default async () => {

    let web3

    const provider = await detectEthereumProvider()

    if (provider) {

        provider.on('accountsChanged', (accounts) => {
            if (accounts.length > 0)
                eventHub.$emit('changeAccount', accounts[0])
            else
                eventHub.$emit('disconnect')
        })

        try {
            await provider.enable()

            web3 = new Web3(provider)
        }
        catch (error) {
            console.log(error.code);
        }
    }

    return { web3 }
}