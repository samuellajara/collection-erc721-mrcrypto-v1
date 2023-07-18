import Navbar from '@/components/Navbar'
import Mint from '@/components/Mint'
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
        <Mint />
      </main>
    </>
  )
}
