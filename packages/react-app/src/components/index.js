import styled from "styled-components";

export const Body = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  margin-top: 40px;
`;

export const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: #282c34;
  cursor: pointer;
  font-size: 16px;
  margin: 0px 20px;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;

  border-style: solid;
  border-color: red;
`;

export const Container = styled.div`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  height: calc(100vh);
`;

export const Header = styled.header`
  align-items: center;
  // background-color: #282c34;
  background-color: #FFFFFF;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  min-height: 50px;
  border-style: solid;
  border-color: #E6E3EA;
`;

export const Footer = styled.footer`
  background-color: grey;
  width: 100%;
  height: 10rem;
  // margin-top: 3rem;
`

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 8px;
`;

export const LeftDiv = styled.div`
  position: absolute;
  left: 3rem;

  a{
    color: black;
    text-decoration:none;
    margin-right: 3.2rem;

    &:hover{
      color: blue;
      border-bottom-style: soild;
      // background-color:red;
    }
  }

  a:last-child:hover {
    color:black;
    background-color: inherit;
  }
`