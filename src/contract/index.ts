
import ABI from './Tweether.json';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || "0x0";
const CONTRACT_NETWORK_ID = 5;
const CONTRACT_NETWORK_NAME = "goerli";

export { ABI, CONTRACT_ADDRESS, CONTRACT_NETWORK_ID, CONTRACT_NETWORK_NAME }