import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import {
  forca0,
  forca1,
  forca2,
  forca3,
  forca4,
  forca5,
  forca6,
} from "./images";

const GlobalStyle = createGlobalStyle`
    ${reset}
    
    *{
    box-sizing: border-box;
}  

`;

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");
  font-family: "Roboto", sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  width: 100%;
  background-image: url("https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80");
  background-color: red;
`;

const GameBox = styled.div`
  width: 600px;
  height: 400px;

  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Forca = styled.img`
  width: 300px;
  padding: 10px;
`;

const Button = styled.button`
  height: 40px;
  margin: 40px;

  background-color: #4caf50; /* Green */
  border: none;
  border-radius: 8px;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  cursor: pointer;
  background-color: green;
`;

const Keyboard = styled.div`
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Key = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  color: gray;
  font-size: 30px;

  cursor: pointer;

  background-color: black;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

const Input = styled.div`
  width: 600px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  color: gray;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <GameBox>
          <Forca src={forca6} alt="Imagem" />
          <Button>TEXTO AQUI OH</Button>
        </GameBox>
        <Keyboard>
          {alfabeto.map((l) => (
            <Key>{l.toUpperCase()}</Key>
          ))}
        </Keyboard>
        <Input>
          Já sei a palavra! <input type="text" /> <Button>Chutar</Button>
        </Input>
      </Container>
    </>
  );
}
