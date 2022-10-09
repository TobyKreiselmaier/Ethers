const { ethers } = require('ethers')

const INFURA_ID = 'c2f69015a46346a3a1beb31b48cdac2b'
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint)',

  'event Transfer(address indexed from, address indexed to, uint amount)'
]

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
  const currentBlock = await provider.getBlockNumber()
  console.log('currentBlock: ', currentBlock)

  const transferEvents = await contract.queryFilter('Transfer', currentBlock - 10, currentBlock)
  console.log(transferEvents)
}

main()