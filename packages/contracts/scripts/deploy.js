const { ethers } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
const path = require('path');

async function main() {
    // 链接到以太坊网络
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // 这里填入你的以太坊节点地址

    // 获取当前用户的钱包
    // const signer = provider.getSigner();
    const signer = '0x60f72972beda942b1e662466444c22a4c8a314966fe1f02a456feeb0ed135e7f';

    // 编译合约 ABI，这里假设你已经编译了你的合约并将 ABI 保存在了一个变量中
    // const contractABI = [
    //     // 这里填入合约的 ABI

    // ]
    // 1、获取目录中所有 .abi 文件的路径
    const abiDirectory = path.resolve(__dirname, '../src/abis/abisFiles');
    const abiFiles = fs.readdirSync(abiDirectory).filter(file => path.extname(file) === '.abi');

    // 读取所有 .abi 文件的内容
    let combinedAbiContent = '';
    abiFiles.forEach(file => {
        const filePath = path.join(abiDirectory, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        combinedAbiContent += fileContent + '\n'; // 合并文件内容，并用换行符分隔
    });

    // 去掉多余的空格或换行
    combinedAbiContent = combinedAbiContent.trim();

    // 2、部署合约的字节码，这里假设你已经有了合约的字节码，并将其保存在了一个变量中
    // const contractBytecode = fs.readFileSync('C:\\Users\\Yotoha\\Desktop\\solidity\\myApp\\my-eth-app\\packages\\contracts\\src\\abis\\abisFiles\\packages_contracts_src_MyContract_ERC20_sol_ERC20.bin','utf-8'); // 这里填入合约的字节码

    // 2、获取目录中所有 .bin 文件的路径
    const binDirectory = path.resolve(__dirname, '../src/abis/abisFiles');
    const binFiles = fs.readdirSync(binDirectory).filter(file => path.extname(file) === '.bin');

    // 读取所有 .bin 文件的内容
    let combinedbinContent = '';
    binFiles.forEach(file => {
        const filePath = path.join(binDirectory, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        combinedbinContent += fileContent + '\n'; // 合并文件内容，并用换行符分隔
    });

    // 去掉多余的空格或换行
    combinedBinContent = combinedbinContent.trim();

    // 创建合约工厂
    const ContractFactory = new ethers.ContractFactory(combinedAbiContent, combinedBinContent, signer);

    // 部署合约
    const contract = await ContractFactory.deploy("Yotoha", "HMB"); // 这里填入合约的名称和符号

    // 等待合约被部署到区块链上
    // await contract.deployed();

    // console.log("Contract deployed to:", contract.address);

}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
