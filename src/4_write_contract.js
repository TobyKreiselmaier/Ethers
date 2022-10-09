const { ethers } = require('ethers')

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)

const account1 = ''
const account2 = ''

const privateKey1 = '' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount) returns (bool)'
]

const address = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB' // LINK on Goerli
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
  const balance = await contract.balanceOf(account1)

  console.log(`\nReading from ${address}\n`)
  console.log(`Balance of sender: ${balance}\n`)

  const contractWithWallet = contract.connect(wallet)

  const tx = await contractWithWallet.transfer(account2, balance)
  await tx.wait()

  console.log(tx)

  const balanceOfSender = await contract.balanceOf(account1)
  const balanceOfRecipient = await contract.balanceOf(account2)

  console.log(`\nBalance of sender: ${balanceOfSender}`)
  console.log(`Balance of recipient: ${balanceOfRecipient}\n`)
}

main()
