import Navbar from '@/components/Navbar'
import Mint_ERC_721 from '@/components/Mint_ERC_721'
import Mint_ERC_E7L from '@/components/Mint_ERC_E7L'
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
        <section className='flex'>
          <div className='w-1/2 bg-red-600'><Mint_ERC_721 /></div>
          <div className='w-1/2 bg-blue-500'><Mint_ERC_E7L /></div>
        </section>
        
      </main>
    </>
  )
}
