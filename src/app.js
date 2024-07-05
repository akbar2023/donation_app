const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "donateur",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "montant",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "DonationEffectuee",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "donateurToDonations",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "donations",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "donateur",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "montant",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "nextId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "createDonation",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_donateur",
          "type": "address"
        }
      ],
      "name": "getDonationsByDonateur",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
const contractAddress = '0x5a295EFC93c5469dcFB0e6773e433c235Da7379e';

let web3;
let donationContract;
let accounts;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            accounts = await web3.eth.getAccounts();
            donationContract = new web3.eth.Contract(contractABI, contractAddress);
            listDonations();
        } catch (error) {
            console.error("L'utilisateur a refusé l'accès au compte.");
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

async function createDonation() {
    const amountDonation = document.getElementById('amount').value;
    const amount = web3.utils.toWei(amountDonation, 'ether');
    await donationContract.methods.createDonation().send({ from: accounts[0], value: amount });
    listDonations();
}

async function listDonations() {

    const donations = await donationContract.methods.getDonationsByDonateur(accounts[0]).call();
    const donationList = document.getElementById('donations');
    donationList.innerHTML = '';
    for (let id of donations) {
        const donation = await donationContract.methods.donations(id).call();
        const li = document.createElement('li');
        li.textContent = `Donateur: ${donation.donateur}, Montant: ${donation.montant}, Timestamp: ${donation.timestamp}`;
        donationList.appendChild(li);
    }
}
