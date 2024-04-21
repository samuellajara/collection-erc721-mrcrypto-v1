import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TOKEN_NAME = "MrCrypto";
const TOKEN_SYMBOL = "MRC";

const MrCryptoModule = buildModule("MrCryptoModule", (m) => {
  const tokenName = m.getParameter("tokenName", TOKEN_NAME);
  const tokenSymbol = m.getParameter("tokenSymbol", TOKEN_SYMBOL);

  const mrCrypto = m.contract("MrCrypto", [tokenName, tokenSymbol]);

  return { mrCrypto };
});

export default MrCryptoModule;
