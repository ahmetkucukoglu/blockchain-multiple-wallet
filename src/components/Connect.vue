<template>
  <div class="position-relative mt-3" style="height: 200px">
    <div
      id="provider"
      class="position-absolute top-0 start-0"
      v-if="this.$store.state.provider"
    >
      <p class="fw-light mb-0 lh-1">Connected with</p>
      <p class="fw-bold">{{ this.$store.state.provider }}</p>
    </div>

    <div id="balance" class="position-absolute top-0 end-0">
      <span
        v-if="this.$store.state.accountAddress"
        class="border border-1 rounded-pill p-1"
      >
        <span
          ><i class="bi bi-circle-fill text-success"></i>
          {{ accountBalance }} ETH</span
        >
      </span>

      <span
        v-if="!this.$store.state.accountAddress"
        class="border border-1 rounded-pill p-1"
      >
        <span><i class="bi bi-circle-fill text-danger"></i> Disconnected</span>
      </span>
    </div>

    <div
      id="connect"
      class="position-absolute top-50 start-50 translate-middle"
    >
      <div class="mt-2" v-if="!this.$store.state.accountAddress">
        <button
          class="btn btn-sm btn-outline-primary me-2"
          @click="connectWithWalletConnect"
        >
          <img src="../assets/walletconnect.svg" width="25" />
          Connect with WalletConnect
        </button>

        <button
          class="btn btn-sm btn-outline-warning"
          @click="connectWithMetaMask"
        >
          <img src="../assets/metamask.svg" width="19" />
          Connect with MetaMask
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventHub } from "../main";
import WalletConnect from "../wallets/WalletConnect";
import MetaMaskConnect from "../wallets/MetaMaskConnect";

export default {
  name: "Connect",
  props: {},
  data() {
    return {
      accountBalance: 0,
      web3: null,
    };
  },
  methods: {
    async connectWithWalletConnect() {
      const { web3 } = await WalletConnect();

      if (!web3) return;

      this.web3 = web3;

      await this.updateBalance();

      this.$store.commit("setProvider", "WalletConnect");
    },
    async connectWithMetaMask() {
      const { web3 } = await MetaMaskConnect();

      this.web3 = web3;

      await this.updateBalance();
      this.$store.commit("setProvider", "MetaMask");
    },
    async updateBalance() {
      let currentBalance = await this.web3.eth.getBalance(
        this.$store.state.accountAddress
      );
      this.accountBalance = this.web3.utils.fromWei(currentBalance, "ether");
    },
  },
  async created() {
    if (this.$store.state.accountAddress) {
      await this.connectWithMetaMask();
    }

    eventHub.$on("changeAccount", async (account) => {
      this.$store.commit("setAccountAddress", account);

      if (this.web3) await this.updateBalance();
    });

    eventHub.$on("disconnect", async () => {
      this.$store.commit("setAccountAddress", null);
      this.$store.commit("setProvider", null);
    });
  },
};
</script>

<style scoped>
</style>
