pragma solidity >=0.4.21 <0.6.0;

contract AssetTransfer {
    // uint256
    uint256 payerAmount;
    uint256 payeeAmount;

    function init(uint256 amount) public {
        payerAmount = amount;
    }

    function send(uint256 amount) public {
        require(payerAmount >= amount, "Payer amount underflow amount");
        require(
            payeeAmount + amount >= payeeAmount,
            "Payee amount overflow amount"
        );
        payerAmount -= amount;
        payeeAmount += amount;
    }

    function getPayeeAmount() public view returns (uint256) {
        return payeeAmount;
    }

    function getPayerAmount() public view returns (uint256) {
        return payerAmount;
    }
}
