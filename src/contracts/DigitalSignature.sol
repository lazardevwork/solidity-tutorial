pragma solidity >=0.4.21 <0.6.0;

contract DigitalSignature {
    string memeHash;

    function registerDoc(string memory _memeHash) public {
        memeHash = _memeHash;
    }

    function checkDoc() public view returns (string memory) {
        return memeHash;
    }
}
