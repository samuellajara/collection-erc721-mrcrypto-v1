import { useEffect } from "react";
import { useWeb3Store } from "@/stores/web3Store";
import contractData from "../constants/constantSLD.json";
import { ethers } from "ethers";

const Mint = () => {
  const { provider } = useWeb3Store();
  let supply = 0;

  const nftcontractSigner = new ethers.Contract(
    contractData.address,
    contractData.abi,
    provider?.getSigner()
  );

  async function getMint() {
    if (!nftcontractSigner) return;
    if (!provider) return;
    supply ++;

    try {
      await nftcontractSigner.mint(supply);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!provider) return;
  }, [provider]);

  return (
    <section>
      <section className="m-0-auto flex justify-center">
        <div className="mt-5 ml-5 mr-5 mb-5 bg-gray-900 p-2 rounded-sm border-2 border-gray-100  sm:w-[70%] lg:max-w-[30%]">
          <h2 className="text-center pb-2 text-2xl">Mint your E7L</h2>
          <img src="sell-drugs.png" alt="" />

          
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
    </section>
  );
};

export default Mint;
