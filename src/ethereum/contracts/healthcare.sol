// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

contract HealthCare{

    address payable admin; //this is the address of the hospital admin

    struct Details{
        uint256 patientId; //Stores patient Id
        string patientName; //Stores patient Name
        string gender;  //Stores patient gender
        uint32 height;  //Stores patient height
        uint32 weight;  //Stores patient weight
        string disease;  //Stores the problem or disease faced by patient
        uint256 bill;  //Stores the bill of the patient
        bool billPending;  //Stores if the bill is paid or not. (true -> bill paid)
        bool dischargePending; //Stores if the patient is discharged or not. (true -> discharged)
    }//this struct defines the details of the patients


    mapping (uint256 => Details) patientDetails;
    mapping (uint256 => bool) public patientIsValid;

    constructor(){ //Stores the owner of the contract as admin when deploying
        admin = payable (msg.sender);
    }

    //Collects the details of the patient and adds to the record
    function storeDetails(uint256 patientId, string memory patientName, string memory gender, uint32 height, uint32 weight, string memory disease, uint256 bill, bool billPending, bool dischargePending) public{
        require(admin == payable(msg.sender),"Can be called only by admin");

        Details memory detail = Details({
            patientId: patientId,
            patientName: patientName,
            gender:gender,
            height:height,
            weight:weight,
            disease:disease,
            bill:bill,
            billPending:billPending,
            dischargePending:dischargePending
        });

        patientDetails[patientId] = detail;
        patientIsValid[patientId]= true;
    }

    //Returns the records of the patient by collecting their id
    function viewRecords(uint256 patientId) view public returns(Details memory){
        require(patientIsValid[patientId],"Invalid patient address");
        return patientDetails[patientId];
    }

    //Transfers the amount paid by patient to the admin
    function transferAmount(uint256 patientId) payable public returns(bool ){
        require(patientIsValid[patientId],"Invalid patient Id");
        require(msg.value>= patientDetails[patientId].bill,"Insufficient amount sent");

        (bool success,)=admin.call{value: msg.value}("");
        patientDetails[patientId].billPending = true;
        
        return success;
    }
}