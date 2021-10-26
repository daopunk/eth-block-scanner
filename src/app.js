const axios = require('axios').default;

const URL = 'https://api.etherscan.io/api';
const key = xxx;

async function getBlockNum() {
  try {
    const response = await axios.get(
      `${URL}?module=block&action=getblocknobytime&timestamp=${Math.floor(Date.now()/1000)}&closest=before&apikey=${key}`
    );

    const blockNum = response.data.result;

    return blockNum;
  } catch (error) {
    console.error(error.result);
  }
}

async function getBlockInfo(blockNum) {
  try {
    const response = await axios.get(
      `${URL}?module=block&action=getblockreward&blockno=${blockNum}&apikey=${key}`
    );

    return response.data.result;
  } catch (error) {
    console.error(error.result);
  }
}

document.getElementById('get-block').onclick=async () => {
  const bn = await getBlockNum();
  const res = await getBlockInfo(bn);
  console.log(`BlockNumber: ${bn} \n BlockInfo: ${res}`);

  document.getElementById('block-id').innerHTML = bn;
  document.getElementById('miner-id').innerHTML = res.blockMiner;
  document.getElementById('reward-id').innerHTML = res.blockReward;
};
