import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("NFT CONTRACT", function () {
  async function deployNFTFixture() {
    const [owner, admin, user] = await ethers.getSigners();

    const NAME = "MrCrypto";
    const SYMBOL = "MRC";

    const MockERC20 = await ethers.getContractFactory("mockERC20");
    const mockERC20 = await MockERC20.deploy(
      "TokenMRC",
      "TMRC",
      ethers.parseEther("1000")
    );

    const MRCRYPTO = await ethers.getContractFactory("MrCrypto");
    const mrc = await MRCRYPTO.deploy(NAME, SYMBOL, mockERC20);

    return { owner, admin, user, mrc, mockERC20 };
  }

  describe("Mint NFT", function () {
    it.skip("Mint an NFT on whitelist", async () => {
      const { admin, user, mrc } = await deployNFTFixture();
      // Add an administrator
      await mrc.addAdmin(admin.address);
      // The admin adds the user to the WhiteList
      await mrc.connect(admin).addToWhitelist(user.address);
      await mrc.connect(admin).addToWhitelist(admin.address);
      // Un-pause the contract
      await mrc.connect(admin).flipPause();
      // Check that the user is in the whitelist
      assert((await mrc.isWhitelisted(user.address)) == true);
      // Call the contract to mint
      await mrc.connect(user).mint(1, { value: ethers.parseEther("0.001") });
    });

    it("Mint an NFT on tesnet", async () => {
      const { user, mrc } = await deployNFTFixture();
      // Call the contract to mint
      await mrc.connect(user).mint(1, { value: ethers.parseEther("0.000001") });
    });

    it("Mint an NFT with mockToken", async () => {
      const { user, mrc, mockERC20 } = await deployNFTFixture();

      // Asignar tokens al usuario (este paso es probablemente innecesario si el usuario es el propietario del contrato mockERC20
      // y ya se le asignaron tokens en el despliegue)
      // Asegurémonos de que el usuario tiene tokens para gastar
      await mockERC20.transfer(user.address, ethers.parseEther("1"));

      // Aprobar al contrato NFT para gastar tokens en nombre del usuario
      await mockERC20
        .connect(user)
        .approve(mrc.getAddress(), ethers.parseEther("1"));

      // Intentar mintear utilizando mock tokens
      await mrc.connect(user).mintWithMockToken(1);
    });
    it.skip("URI is returned correctly", async () => {
      const { mrc, admin } = await deployNFTFixture();
      // Add an administrator
      await mrc.addAdmin(admin.address);
      // Not revealed uri
      assert((await mrc.connect(admin).tokenURI(1)) === "Not revelated");
      // Revealed uri
      await mrc.connect(admin).reveal();
      assert(
        (await mrc.tokenURI(1)) === "https://apinft.racksmafia.com/api/1.json"
      );
    });

    it.skip("Mint multiple NFTs", async () => {
      const { admin, user, mrc } = await deployNFTFixture();
      await mrc.addAdmin(admin.address);
      await mrc.connect(admin).addToWhitelist(user.address);
      await mrc.connect(admin).flipPause();
      await mrc.connect(user).mint(4, { value: ethers.parseEther("0.004") });
      await mrc.connect(user).mint(4, { value: ethers.parseEther("0.004") });
      assert((await mrc.ownerOf(2)) === user.address);
      assert((await mrc.ownerOf(4)) === user.address);
    });

    it("Revert to onlyAdmin roles", async () => {
      const { mrc, user, admin } = await deployNFTFixture();
      await expect(mrc.connect(admin).addToWhitelist(user.address)).to.be
        .reverted;
    });

    it.skip("Withdraw", async () => {
      const { mrc, user, admin, owner } = await deployNFTFixture();
      await mrc.addAdmin(admin.address);
      await mrc.connect(admin).addToWhitelist(user.address);
      await mrc.connect(admin).flipPause();
      await mrc.connect(user).mint(3, { value: ethers.parseEther("0.003") });
      assert((await mrc.ownerOf(3)) === user.address);

      const AMOUNT = ethers.parseEther("0.002");
      assert(await mrc.connect(owner).withdraw(AMOUNT));
      await expect(mrc.connect(owner).withdraw(AMOUNT)).to.be.reverted;
    });
  });
});
