import { useState, useEffect } from "react";
import { useWeb3Store } from "@/stores/web3Store";
import contractData from "../constants/constant_MambaBlack.json";
import contractDataERC721 from "../constants/constant_MrCrypto.json";
import { ethers } from "ethers";

const Mint = () => {
  const { provider } = useWeb3Store();
  const [erc721Id, setErc721Id] = useState("");
  const [e7lTokenId, setE7lTokenId] = useState("");

  const nftcontractSigner = new ethers.Contract(
    contractData.address,
    contractData.abi,
    provider?.getSigner()
  );

  async function getMint() {
    if (!nftcontractSigner) return;
    if (!provider) return;

    try {
      await nftcontractSigner.mint();
    } catch (error) {
      console.log(error);
    }
  }

  async function linkToken() {
    try {
      await nftcontractSigner.linkToken(
        e7lTokenId,
        erc721Id,
        contractDataERC721.address
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!provider) return;
  }, [provider]);

  return (
    <section className="rounded-lg border-2 border-white">
      <section className="flex justify-center">
        <div className="mb-3 p-2 sm:w-[70%] lg:max-w-[70%]">
          <h2 className="text-center pb-2 font-bold">Mamba Black E7L</h2>
          <img src="mamba_black.jpg" alt="" />
        </div>
      </section>

      <section className="m-0-auto flex justify-center">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded "
          onClick={getMint}
        >
          MINT
        </button>
      </section>

      <section className="flex justify-center">
        <div className="mt-5 mb-3 p-2 sm:w-[70%] lg:max-w-[70%]">
          <h2 className="text-center pb-2 font-bold"> Link Tokens</h2>

          <div className="flex flex-col items-center space-y-4">
            <input
              type="number"
              placeholder="Mr.Crypto ID"
              className="text-black border-2 border-gray-300  rounded-lg p-1 text-sm w-full"
              value={erc721Id}
              onChange={(e) => setErc721Id(e.target.value)}
            />
            <input
              type="number"
              placeholder="E7L Token ID"
              className="text-black border-2 border-gray-300  rounded-lg p-1 text-sm w-full"
              value={e7lTokenId}
              onChange={(e) => setE7lTokenId(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="flex justify-center">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold mb-5 py-2 px-4 rounded"
          onClick={linkToken}
        >
          LINK
        </button>
      </section>
    </section>
  );
};

export default Mint;
