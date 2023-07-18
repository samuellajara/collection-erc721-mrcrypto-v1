import { useWeb3Store } from "@/stores/web3Store"

const Error = () => {

  const errorMessage = useWeb3Store((state) => state.errorMessage)
  
  if(errorMessage === "") return(<> </>)

  
  return (
  
      <div className="bg-red-600 p-5">
        <p className="text-white text-3xl">{errorMessage}</p>
      </div> 

  );
 
}

export default Error