const { ethers } = require('ethers')

const INFURA_ID = 'c2f69015a46346a3a1beb31b48cdac2b'
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)

const account1 = '0x75961Ece5e5164D014F516F81b94337010b84F1C'
const account2 = '0x8D0627d5DF55Afaf06476a53634ef90dbdFE1B68'

const privateKey1 = '0x96371452a0febcd710247607113c2805f7bd9256f166cec0219d6f6721f83a6b' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
  const senderBalanceBefore = await provider.getBalance(account1)
  const recipientBalanceBefore = await provider.getBalance(account2)

  console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
  console.log(`Recipient balance before: ${ethers.utils.formatEther(recipientBalanceBefore)}\n`)

  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther('0.025')
  })

  await tx.wait()
  console.log(tx)

  const senderBalanceAfter = await provider.getBalance(account1)
  const recipientBalanceAfter = await provider.getBalance(account2)

  console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
  console.log(`Recipient balance after: ${ethers.utils.formatEther(recipientBalanceAfter)}\n`)
}

main()
