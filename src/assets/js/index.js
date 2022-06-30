import DigitalBallot from '../../abis/DigitalBallot.json'

let networkAccount = null
let contract = null
let web3Info = null
const send_btn = document.getElementById('send')
const amount_init = document.getElementById('amount_init')
const payer_amount = document.getElementById('payer_amount')
const payee_amount = document.getElementById('payee_amount')


const loadBlockchainData = async (web3Info) => {
  if (web3Info) {
    const accounts = await web3Info.eth.getAccounts()
    if (accounts.length > 0) {

      networkAccount = accounts[0]
      const networkId = await web3Info.eth.net.getId()
      const networkData = DigitalBallot.networks[networkId]
      if (networkData) {
        const abi = DigitalBallot.abi
        const address = networkData.address
        contract = new web3Info.eth.Contract(abi, address)
        const payeeAmount = await contract.methods.getPayeeAmount().call()
        const payerAmount = await contract.methods.getPayerAmount().call()
        payer_amount.innerText = payerAmount
        payee_amount.innerText = payeeAmount
        return
      }
    }
  }
  alert('web3Info is not valid')

}


send_btn.addEventListener('click', async () => {
  try {

    let amount = document.getElementById('amount_send').value
    console.log(amount)
    if (amount) {
      amount = parseInt(amount)
      contract.methods.send(amount).send({ from: networkAccount }, function (receipt) {
        console.log(receipt)
        loadBlockchainData(web3Info)
      }).catch((error) => {
        console.log(error)
      })
    } else {
      alert('name is null')
    }
  } catch (error) {
    console.error(error)
  }
})


window.onload = async function () {
  let web3 = null
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }

  if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
  } else {
    window.alert('Please use metamask')
    return null
  }

  web3Info = web3
  await loadBlockchainData(web3)
  const amount = amount_init.value
  contract.methods.init(amount).send({ from: networkAccount }, function (receipt) {
    loadBlockchainData(web3)
  })
}

