const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');

const contractABI = [/* ... ABI du contrat ... */];
const contractAddress = '/* Adresse du contrat déployé ... */';

const donationContract = new web3.eth.Contract(contractABI, contractAddress);

async function donate(amount, fromAddress) {
  await donationContract.methods.donate().send({
    from: fromAddress,
    value: web3.utils.toWei(amount, 'ether'),
  });
}

async function getDonation(donorAddress) {
  const donation = await donationContract.methods.getDonation(donorAddress).call();
  console.log(`Donation of ${donorAddress}: ${web3.utils.fromWei(donation, 'ether')} ETH`);
}

async function withdraw(fromAddress) {
  await donationContract.methods.withdraw().send({ from: fromAddress });
}

// Exemple d'utilisation
(async () => {
  const accounts = await web3.eth.getAccounts();
  await donate('1', accounts[0]);
  await getDonation(accounts[0]);
  await withdraw(accounts[0]);
})();
