const { ethers } = require('ethers')

const INFURA_ID = 'c2f69015a46346a3a1beb31b48cdac2b'
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const main = async () => {
  const block = await provider.getBlockNumber()

  console.log(`\nBlock Number: ${block}\n`)

  const blockInfo = await provider.getBlock(block)

  console.log(blockInfo)

  const { transactions } = await provider.getBlockWithTransactions(block)

  console.log(`\nLogging first transaction in block:\n`)
  console.log(transactions[0])
}

main()
