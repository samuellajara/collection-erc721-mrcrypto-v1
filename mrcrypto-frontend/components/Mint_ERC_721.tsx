import { useState, useEffect } from "react";
import { useWeb3Store } from "@/stores/web3Store";
import contractData from "../constants/MrCrypto.json";
import { ethers } from "ethers";

const Mint = () => {
  const { provider } = useWeb3Store();
  const [count, setCount] = useState(1);
  const [supply, setSupply] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [paused, setPaused] = useState(false);

  const nftcontractSigner = new ethers.Contract(
    contractData.address,
    contractData.abi,
    provider?.getSigner()
  );

  const nftcontract = nftcontractSigner.connect(nftcontractSigner.provider);

  async function getMint() {
    if (!nftcontractSigner) return;
    if (paused == true) {
      console.log("Smart Contract is paused");
      return; // true is paused, falso is not paused
    }

    if (typeof price === "undefined") {
      console.log("Price is not defined yet");
      return;
    }

    if (!provider) return;
    /*ççconst signer = provider.getSigner();
    const isWhitelisted = await checkWhitelist(signer);
    if (!isWhitelisted) {
      console.log("User is not whitelisted");
      return;
    }*/

    try {
      const totalPrice = count * price;
      const totalMint = ethers.utils.parseEther(String(totalPrice));
      await nftcontractSigner.mint(count, { value: totalMint });
    } catch (error) {
      console.log(error);
    }
  }

  async function getData() {
    if (!nftcontract) return;

    try {
      const supply = await nftcontract.MAX_SUPPLY();
      const price = await nftcontract.COST_PER_NFT();
      const paused = await nftcontract.paused();
      setSupply(supply);
      setPrice(Number(price / 10 ** 18));
      setPaused(paused);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkWhitelist(signer: ethers.Signer) {
    const signerAddress = await signer.getAddress();
    const isWhitelisted = await nftcontract.isWhitelisted(signerAddress);
    return isWhitelisted;
  }

  const increment = () => {
    if (count >= 4) return;
    setCount(count + 1);
  };

  const decrement = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };

  useEffect(() => {
    if (!provider) return;
    getData();
  }, [provider]);

  return (
    <section>
      <section className="flex justify-center">
        <div className="mt-5 ml-5 mr-5 mb-5 p-2 rounded-lg border-2 border-white sm:w-[50%] lg:max-w-[50%]">
          <h2 className="text-center pb-2 font-bold"> Mr.Crypto ERC-721 </h2>
          <img src="MrCrypto-8141.png" alt="MrCrypto" />

          <div className="flex items-center justify-between p-1 mt-2">
            <p>Available Supply: </p>
            <p>{supply}</p>
          </div>

          <div className="flex items-center justify-between p-1 mt-2">
            <p>Select Quantity: </p>

            <div className="flex items-center justify-center">
              <button
                className="text-2xl bg-orange-400 pl-3 pr-3 rounded-sm"
                onClick={decrement}
              >
                {" "}
                -{" "}
              </button>
              <p className="text-2xl text-black pl-2 pr-2 bg-orange-200">
                {count}
              </p>
              <button
                className="text-2xl bg-orange-400 pl-3 pr-3 rounded-sm"
                onClick={increment}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-1 mt-2">
            <p>Total Price:</p>
            <p>{price ? price * count : "calculating..."} MATIC </p>
          </div>
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
