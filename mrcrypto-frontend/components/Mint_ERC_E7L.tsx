import { useState, useEffect } from "react";

import E7L_BigDream from '@/components/E7L_BigDream'
import E7L_EscapeSocialism from '@/components/E7L_EscapeSocialism'
import E7L_SellDrugs from '@/components/E7L_SellDrugs'

const Mint = () => {


  return (
    <section className="flex flex-row">
      <E7L_BigDream /> 
      <E7L_EscapeSocialism />
      <E7L_SellDrugs />
    </section>
  );
};

export default Mint;
