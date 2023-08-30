// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    //event when a memo is created
    event NewMemo(
        address  indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    //Memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //List of all memos received
    Memo[] memos;

    //address of contract deployer
    address payable owner;

    //Deploy logic. The constructor only runs once, when the contract is deployed
    constructor() {
        owner = payable(msg.sender);

    }

    /**
     * @dev buy a coffee for contract owner
     * @param _name name of the coffee buyer
     * @param _message a nive message from the coffee buyer
     */

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "can't buy coffee with 0 eth");
        
        //add a memo to storage
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        //emit a log event when new memo is added
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );

    }

    /**
     * @dev send the entire balance stored on contract to the owner's wallet
     */

    function withdrawTips() public {
        require(owner.send(address(this).balance));

    }

    /**
     * @dev retrieve all the memos received and stored on blockchain
     */

    function getMemos() public  view returns(Memo[] memory) {
        return memos;

    }


}
