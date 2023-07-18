import React, { FC } from "react";
import { shortenAddress } from "@/utils/address";
import { useWeb3Store } from "@/stores/web3Store";

interface Props {
  connectWallet: () => Promise<void>;
}

const Navbar: FC<Props> = ({ connectWallet }) => {
  const { address } = useWeb3Store();
  return (
    <nav className="flex items-center justify-between p-5">
      <div>
        <img
          className="sm:max-w-[200px]"
          src="mrc-logo.png"
          alt="logo mr crypto"
        />
      </div>

      <div className="ml-3">
        {address !== "" ? (
          <p>{shortenAddress(address)}</p>
        ) : (
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
