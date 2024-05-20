// SPDX-License-Identifier: MIT
// WTF Solidity by 0xAA

pragma solidity ^0.8.21;

interface IERC20 {
    //交易方法
    event Transfer(address indexed from, address indexed to, uint256 value);

    //授权交易方法
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    //返回代币总补给
    function totalSupply() external view returns (uint256);

    //返回账户中持有的代币数
    function balanceOf(address account) external view returns (uint256);

    //调用者从账户中转账到另外一个账户
    function transfer(address to, uint256 amount) external returns (bool);

    //返回账户所有者授权给另外一个账户的额度，默认为0
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    //调用者账户给传入账户的代币数
    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}
