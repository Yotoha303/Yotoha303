import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";

import { Body, Button, Container, Header, Image, Link, LeftDiv, Footer, BodyContent } from "./components";
import logo from "./ethereumLogo.png";
import Mylogo from "./MyOnline.png";

import { addresses, abis } from "@my-app/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

function WalletButton() {
  const [rendered, setRendered] = useState("");

  const { ens } = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  return (
    <Button
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button >
  );
}

function LeftLink() {
  return (
    <LeftDiv>
      <a href="#">主页</a>
      <a href="#">交易</a>
      <a href="#">购买</a>
      <a href="#">...</a>
    </LeftDiv>
  );
}

function FooterContents() {
  return (
    <div>
      testFooter
    </div>
  )
}

function App() {
  // Read more about useDapp on https://usedapp.io/
  const { error: contractCallError, value: tokenBalance } =
    useCall({
      contract: new Contract(addresses.ceaErc20, abis.erc20),
      method: "balanceOf",
      args: ["0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"],
    }) ?? {};

  const { loading, error: subgraphQueryError, data } = useQuery(GET_TRANSFERS);

  useEffect(() => {
    if (subgraphQueryError) {
      console.error("Error while querying subgraph:", subgraphQueryError.message);
      return;
    }
    if (!loading && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, subgraphQueryError, data]);

  return (
    <Container>
      {/* <GlobalStyle/> */}
      <Header>
        <LeftLink />
        <WalletButton />
      </Header>
      <Body>
        <BodyContent>
          <Image src={Mylogo} alt="Mylogo-logo" />
          <p>Welcome to my project!</p>
          <p>I look forward to developing with you in this field</p>
        </BodyContent>
      </Body>
      <Footer>
        <FooterContents />
      </Footer>
    </Container>
  );
}

export default App;
