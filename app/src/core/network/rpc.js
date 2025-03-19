import { Config } from "../../../config.js";

export class RPC {
  static CHAINID = Config.network == "ARB" ? 421614 : 11155420;
  static RPCURL = Config.network == "ARB" ? Config.ARBRPCURL : Config.OPRPCURL;
  static EXPLORER =
    Config.network == "ARB"
      ? "https://sepolia.arbiscan.io/"
      : "https://sepolia-optimistic.etherscan.io/";
  static SYMBOL = Config.network == "ARB" ? "ETH ARB" : "ETH OP";
}
