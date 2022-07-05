import DigitalSignature from '../../abis/DigitalSignature.json'

let networkAccount = null
let contract = null
let web3Info = null

const upload_file_register = document.getElementById('upload_file_register')
const upload_file_register_upload = document.getElementById('upload_file_register_upload')

const upload_file_signature = document.getElementById('upload_file_signature')
const upload_file_signature_upload = document.getElementById('upload_file_signature_upload')


const loadBlockchainData = async (web3Info) => {
  if (web3Info) {
    const accounts = await web3Info.eth.getAccounts()
    if (accounts.length > 0) {

      networkAccount = accounts[0]
      const networkId = await web3Info.eth.net.getId()
      const networkData = DigitalSignature.networks[networkId]
      if (networkData) {
        const abi = DigitalSignature.abi
        const address = networkData.address
        contract = new web3Info.eth.Contract(abi, address)

        return
      }
    }
  }
  alert('web3Info is not valid')
}

if (upload_file_register) {
  upload_file_register.addEventListener('change', (e) => {
    const file = e.target.file[0]
    console.log('[file]', file)
  })
}
if (upload_file_signature) {
  upload_file_signature.addEventListener('change', (e) => {
    const file = e.target.file[0]
    console.log('[file]', file)
  })
}


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

