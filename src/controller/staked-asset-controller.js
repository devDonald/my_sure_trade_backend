class StakedAssetController{
  constructor({ onNetworkStatus, onAssetStatus, onBalanceChange }) {
    this.onNetworkStatus = onNetworkStatus;
    this.onAssetStatus = onAssetStatus;
    this.onBalanceChange = onBalanceChange;
  }

  async getStakedAssetState() {
    const { chainId, provider } = this;
    const { stakingToken, stakingTokenAddress } = this.stakingContract;

    const networkStatus = await getNetworkStatus({ chainId, provider });
    this.onNetworkStatus(networkStatus);

    const assetStatus = await getAssetStatus({
      chainId,
      provider,
      stakingToken,
      stakingTokenAddress,
    });
    this.onAssetStatus(assetStatus);

    const balance = await getBalance({
      chainId,
      provider,
      stakingToken,
      stakingTokenAddress,
    });
    this.onBalanceChange(balance);
  }
}