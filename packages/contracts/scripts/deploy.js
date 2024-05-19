const { ethers } = require("ethers");

async function main() {
    // 链接到以太坊网络
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // 这里填入你的以太坊节点地址

    // 获取当前用户的钱包
    const signer = provider.getSigner();

    // 编译合约 ABI，这里假设你已经编译了你的合约并将 ABI 保存在了一个变量中
    const contractABI = [
        // 这里填入合约的 ABI
        "function transfer(address recipient, uint amount) public returns (bool)",
        "function approve(address spender, uint amount) public returns (bool)",
        "function transferFrom(address sender, address recipient, uint amount) public returns (bool)",
        "function balanceOf(address account) external view returns (uint)",
        "function allowance(address owner, address spender) external view returns (uint)"
    ];

    // 部署合约的字节码，这里假设你已经有了合约的字节码，并将其保存在了一个变量中
    const contractBytecode = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"; // 这里填入合约的字节码

    // 创建合约工厂
    const ContractFactory = new ethers.ContractFactory(contractABI, contractBytecode, signer);

    // 部署合约
    const contract = await ContractFactory.deploy("Yotoha", "HMB"); // 这里填入合约的名称和符号

    // 等待合约被部署到区块链上
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
