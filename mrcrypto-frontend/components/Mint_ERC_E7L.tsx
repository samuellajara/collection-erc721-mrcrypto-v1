import { useState, useEffect } from "react";

import E7L_BigDream from "@/components/E7L_DreamBig";
import E7L_EscapeSocialism from "@/components/E7L_EscapeSocialism";
import E7L_SellDrugs from "@/components/E7L_MambaBlack";

const Mint = () => {
  return (
    <section className="flex flex-row mr-10 mt-10">
      <div className="mr-5">
        <E7L_BigDream />{" "}
      </div>
      <div className="mr-5">
        <E7L_EscapeSocialism />
      </div>
      <div className="mr-5">
        <E7L_SellDrugs />
      </div>
    </section>
  );
};

export default Mint;
