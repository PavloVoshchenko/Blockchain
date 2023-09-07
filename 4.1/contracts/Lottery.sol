// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable{
    address[] private participants;
    uint256 private  ticketPrice = 0.5 ether;
    uint private count = 0;
    event Log(address winner, uint256 amount);
    event Log(uint256 balance, uint256 totalBalance);

    function enter() external payable {
        require(msg.sender != owner(), "Owner cannot be participate");
        require(msg.value >= ticketPrice, "Ticket price >= 0.5 ether");
  //      require(!isParticipant(msg.sender), "You are already a participant");
        count += isParticipant(msg.sender) ? 0 : 1;
        participants.push(msg.sender);
        emit Log(msg.value, address(this).balance);
    }


    function selectWinner() external onlyOwner {
        require(participants.length >= 3 && count>=3, "Need 3 or more participants");
        uint256 winnerIndex = generateRandomNumber() % participants.length;
        address winner = participants[winnerIndex];
        uint256 prizeAmount = address(this).balance;

        // Transfer contract balance to the winner
        payable(winner).transfer(prizeAmount);
        emit Log(winner, prizeAmount);
        // Clear participants
        delete participants;
    }

    function isParticipant(address _address) internal view returns (bool) {
        for (uint256 i = 0; i < participants.length; i++) {
            if (participants[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function generateRandomNumber() internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, participants)));
    }

    function getParticipants() external view returns (address[] memory) {
    return participants;
    }
}
