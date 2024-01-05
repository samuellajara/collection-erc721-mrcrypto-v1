import Navbar from '@/components/Navbar'
import Mint721 from '@/components/Mint_MRC'
import MintE7L from '@/components/E7Ls'
import { useEffect, useState } from 'react';
import { useWeb3Store } from "@/stores/web3Store";
import Error from "@/components/Error";

declare global {
  interface Window { ethereum: any }
}

export default function Home() {
 
  const { provider, connectWallet, chainId, setProvider } = useWeb3Store();
  const [errorMint, setErrorMint] = useState('');
 
  useEffect(() => {
    if(typeof window === "undefined") return;
    setProvider();
  }, [ chainId ]) 
  
  return (
    <>
      <main>
        <Navbar connectWallet={connectWallet} />
        <Error />
        <Mint721 />
        <MintE7L />
      </main>
    </>
  )
}
