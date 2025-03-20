export class Config {
  /**
   *  Network OP <Swap from OP to ARB sepolia
   *  Network ARB <Swap from ARB to OP sepolia
   */
  static network = "ARB"; //OP or ARB
  static BRIDGEAMOUNT = "0.1";
  static OPRPCURL = "https://opt-sepolia.g.alchemy.com/v2/irCKY81naH96CYDupXi1SM9TGRrOq-Ob";
  static ARBRPCURL = "https://base-sepolia.g.alchemy.com/v2/eYGatj2rV9xfNol1Dn07CYRAmwEcNxPB";
  static GASPRICE = "0.15";

  static OPTOARBBRIDGECONTRACT = "0xb6Def636914Ae60173d9007E732684a9eEDEF26E";
  static ARBTOOPBRIDGECONTRACT = "0xCEE0372632a37Ba4d0499D1E2116eCff3A17d3C3";
  static ARBTOOPRAWDATA =
    "0x56591d596f707374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d77aa8693934b249fDccdb83AE69FCBB59D655e500000000000000000000000000000000000000000000000001630d5f890804e400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a0000";
  static OPTOARBRAWDATA =
    "0x56591d5962617374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d77aa8693934b249fDccdb83AE69FCBB59D655e500000000000000000000000000000000000000000000000001631f7308dafcf800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a0000";
}
