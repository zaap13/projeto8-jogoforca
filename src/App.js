import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import words from "./words";
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
`;

const GameBox = styled.div`
  width: 600px;
  height: 400px;

  display: flex;
  justify-content: space-between;
  align-items: center;

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

const RightBox = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const WordBox = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const Letter = styled.li`
  width: 30px;
  height: 30px;
  color: green;
  font-size: 30px;
  text-align: center;
  border-bottom: 2px solid black;
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

  :disabled {
    background-color: gray;
    cursor: default;
    &:hover {
      color: gray;
    }
  }
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
  justify-content: space-around;
  font-size: 18px;
  color: gray;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default function App() {
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

  const [word, setWord] = useState("");

  const [fails, setFails] = useState(0);
  const [rights, setRights] = useState(0);
  const [forca, setForca] = useState(forca0);

  useEffect(() => {
    if (fails === 1) {
      setForca(forca1);
    } else if (fails === 2) {
      setForca(forca2);
    } else if (fails === 3) {
      setForca(forca3);
    } else if (fails === 4) {
      setForca(forca4);
    } else if (fails === 5) {
      setForca(forca5);
    } else if (fails === 6) {
      setForca(forca6);
      console.log("PERDEU");
    } else {
      console.log("n era pra ta funcionando O.O");
    }
  }, [fails]);

  useEffect(() => {
    if (rights === word.length) {
      console.log("VENCEU AQUI OH");
    }
  }, [rights, word]);

  const keyOnClick = (key) => {
    if (word.includes(key)) {
      setRights(rights + 1);

      console.log(
        "ADD função que mapeia letra por letra e a revela contando 1 acerto pra cada"
      );
    } else {
      console.log(word);
      setFails(fails + 1);

      console.log(
        "ADD função que conta erros, muda a imagem da forca e se erros = 6 encerra o jogo."
      );
    }
    console.log(rights);
    console.log(fails);
  };

  const [gameDisabled, setgameDisabled] = useState(true);

  const startOnClick = () => {
    setFails(0);
    setRights(0);
    setgameDisabled(false);

    // AQUI PRECISA PASSAR A word (AMEM) / IMPRIMIR OS UNDERLINES /
    setWord("banana");
    word.split("").forEach((l) => {
      console.log(l);
    });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <GameBox>
          <Forca src={forca} alt="Imagem" />
          <RightBox>
            <Button onClick={startOnClick}>START</Button>
            <WordBox>
              <Letter>{rights}</Letter>
              <Letter>{fails}</Letter>
              <Letter></Letter>
              <Letter></Letter>
              <Letter></Letter>
              <Letter></Letter>
            </WordBox>
          </RightBox>
        </GameBox>
        <Keyboard>
          {alfabeto.map((l, index) => (
            <Key
              key={index}
              disabled={gameDisabled}
              onClick={() => keyOnClick(l)}
            >
              {l.toUpperCase()}
            </Key>
          ))}
        </Keyboard>
        <Input>
          Já sei a word! <input type="text" /> <Button>Chutar</Button>
        </Input>
      </Container>
    </>
  );
}
