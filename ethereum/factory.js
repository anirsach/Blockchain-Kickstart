import web3 from './web3';
import CampaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x33391C95Ac4F3cd283f090a366d9F5Efd27B0DEC"
);

export default instance;