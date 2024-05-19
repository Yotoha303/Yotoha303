const { ethers } = require("ethers");

// 合约 ABI，可以从编译后的合约中获得
const contractABI = [
    // 这里填入合约的 ABI
    "function transfer(address recipient, uint amount) public returns (bool)",
    "function approve(address spender, uint amount) public returns (bool)",
    "function transferFrom(address sender, address recipient, uint amount) public returns (bool)",
    "function balanceOf(address account) external view returns (uint)",
    "function allowance(address owner, address spender) external view returns (uint)"
];

// 合约地址，根据部署时获得的合约地址填写
const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

// 与以太坊网络建立连接
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // 这里填入你的以太坊节点地址

// 创建合约实例
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// 示例函数：获取指定账户的代币余额
async function getBalance(account) {
    const balance = await contract.balanceOf(account);
    console.log(`Balance of ${account}: ${ethers.utils.formatUnits(balance, "ether")} tokens`);
}

// 示例函数：转账代币
async function transferTokens(recipient, amount) {
    // 获取当前用户的钱包
    const signer = provider.getSigner();

    // 调用合约的转账方法
    const tx = await contract.connect(signer).transfer(recipient, amount);

    // 等待交易被打包并写入区块链
    await tx.wait();

    console.log(`Transfer successful: ${amount} tokens sent to ${recipient}`);
}

// 示例函数：授权代币转账
async function approveTransfer(spender, amount) {
    // 获取当前用户的钱包
    const signer = provider.getSigner();

    // 调用合约的授权方法
    const tx = await contract.connect(signer).approve(spender, amount);

    // 等待交易被打包并写入区块链
    await tx.wait();

    console.log(`Approval successful: ${amount} tokens approved for ${spender}`);
}

// 示例函数：从一个账户向另一个账户转移代币（需要先进行授权）
async function transferFrom(sender, recipient, amount) {
    // 获取当前用户的钱包
    const signer = provider.getSigner();

    // 调用合约的转账方法
    const tx = await contract.connect(signer).transferFrom(sender, recipient, amount);

    // 等待交易被打包并写入区块链
    await tx.wait();

    console.log(`Transfer from ${sender} to ${recipient} successful: ${amount} tokens transferred`);
}

module.exports = {
    getBalance,
    transferTokens,
    approveTransfer,
    transferFrom
};
