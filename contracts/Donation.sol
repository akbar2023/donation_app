pragma solidity ^0.8.0;
 
contract Donation {

    struct DonationStruct {
        uint id;
        address donateur;
        uint montant;
        uint timestamp;
    }
 
    mapping(uint => DonationStruct) public donations;
    mapping(address => uint[]) public donateurToDonations;
    uint public nextId;
    event DonationEffectuee(uint id, address donateur, uint montant, uint timestamp);
 
    function createDonation() external payable {
        require(msg.value > 0, "Le montant de la donation doit etre superieur a zero");
        donations[nextId] = DonationStruct(nextId, msg.sender, msg.value, block.timestamp);
        donateurToDonations[msg.sender].push(nextId);
        emit DonationEffectuee(nextId, msg.sender, msg.value, block.timestamp);
        nextId++;
    }
 
    function getDonationsByDonateur(address _donateur) external view returns (uint[] memory) {
        return donateurToDonations[_donateur];
    }

}