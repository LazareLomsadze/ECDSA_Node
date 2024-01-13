import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp.getPublicKey(privateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  function subsetAddress(address) {
    const firstPart = address.substring(0, 20); 
    return `${firstPart}`;
  }
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type an private key" value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        address: 0x{subsetAddress(address)} 
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
