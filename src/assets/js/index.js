import DigitalBallot from '../../abis/DigitalBallot.json'

let networkAccount = null
let contract = null
let web3Info = null

const start_time = document.getElementById('start_time')
const end_time = document.getElementById('end_time')
const init_time_btn = document.getElementById('init_time_btn')


const new_voter_address = document.getElementById('new_voter_address')
const new_voter_add = document.getElementById('new_voter_add')

const voter_address = document.getElementById('voter_address')
const voter_address_yes = document.getElementById('voter_address_yes')
const voter_address_no = document.getElementById('voter_address_no')






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
        const parties = await contract.methods.fetchParties().call()
        console.log('[parties]', parties)
        // const payerAmount = await contract.methods.getPayerAmount().call()
        // payer_amount.innerText = payerAmount
        // payee_amount.innerText = payeeAmount
        return
      }
    }
  }
  alert('web3Info is not valid')

}


init_time_btn.addEventListener('click', async () => {
  try {

    let start = start_time.value ? new Date(start_time.value) : new Date()
    let end = end_time.value ? new Date(end_time.value) : new Date()
    start = start.getTime()
    end = end.getTime()


    contract.methods.openBallot(start, end).send({ from: networkAccount }, function (receipt) {
      console.log(receipt)
      loadBlockchainData(web3Info)
    }).catch((error) => {
      console.log(error)
    })

  } catch (error) {
    console.error(error)
  }
})

new_voter_add.addEventListener('click', async () => {
  try {

    let address = new_voter_address.value

    if (address) {
      contract.methods.addParty(address).send({ from: networkAccount }, function (receipt) {
        console.log(receipt)
        loadBlockchainData(web3Info)
      }).catch((error) => {
        console.log(error)
      })
    }
  } catch (error) {
    console.error(error)
  }
})

function voteUser(address, flag) {
  if (address) {
    contract.methods.addParty(address).send({ from: networkAccount }, function (receipt) {
      console.log(receipt)
      loadBlockchainData(web3Info)
    }).catch((error) => {
      console.log(error)
    })
  }
}

voter_address_yes.addEventListener('click', async () => {
  const address = voter_address.value
  voteUser(address, true)
})

voter_address_no.addEventListener('click', async () => {
  const address = voter_address.value
  voteUser(address, false)

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
  await loadBlockchainData(web3Info)
}

