pragma solidity >=0.4.21 <0.6.0;

contract DigitalBallot {
    uint256 startTime;
    uint256 endTime;
    mapping(address => bool) parties;
    mapping(address => bool) voted;
    mapping(address => bool) flags;
    address[] authorizedParties;

    event BallotOpened(uint256 startTime, uint256 endTime);

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        require(owner == msg.sender, "You are not owner");
        _;
    }

    function openBallot(uint256 _start, uint256 _end) public OnlyOwner {
        startTime = _start;
        endTime = _end;

        emit BallotOpened(startTime, endTime);
    }

    function addParty(address _party) public OnlyOwner {
        require(!parties[_party], "party already exists");
        parties[_party] = true;
        authorizedParties.push(_party);
    }

    function vote(bool flag) public {
        address voter = msg.sender;
        require(block.timestamp >= startTime && block.timestamp <= endTime, "");
        require(parties[voter] || owner == voter, "not authorized");
        require(!voted[voter], "already voted");
        flags[voter] = flag;
    }

    function fetchParties() public view returns (address[] memory) {
        return authorizedParties;
    }

    function isVoted() public view returns (bool) {
        address _party = msg.sender;
        require(parties[_party] || owner == _party, "not authorized");
        return flags[_party];
    }
}
