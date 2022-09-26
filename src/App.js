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
import Jogo from "./Jogo";
import Letras from "./Letras";
import Chute from "./Chute";

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
  background-color: #cecece;
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
  const keys = alfabeto.map((item) => {
    return [item, false];
  });

  const [word, setWord] = useState("");
  const [fails, setFails] = useState(0);
  const [rights, setRights] = useState(0);
  const [forca, setForca] = useState(forca0);
  const [gameDisabled, setgameDisabled] = useState(true);
  const [keyButton, setKeyButton] = useState(keys);
  const [reveal, setReveal] = useState([]);
  const [wordColor, setWordColor] = useState("red");
  const [input, setInput] = useState("");

  useEffect(() => {
    if (fails === 0) {
      setForca(forca0);
    } else if (fails === 1) {
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
      setgameDisabled(true);
      setReveal(word.toUpperCase());
      setWordColor("red");
    }
  }, [fails, word]);

  useEffect(() => {
    if (rights === word.length && gameDisabled === false) {
      setgameDisabled(true);
      setWordColor("green");
    }
  }, [rights, word, gameDisabled]);

  const keyOnClick = (key) => {
    const clickedButton = keyButton.map((i) =>
      i[0] === key ? ([key, true]) : i
    );
    setKeyButton(clickedButton);
    if (
      word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(key)
    ) {
      const newReveal = [...reveal];
      let count = 0;
      word.split("").forEach((l, index) => {
        if (l.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === key) {
          count++;

          newReveal[index] = l.toUpperCase();
        }
      });
      setReveal(newReveal);
      setRights((rights) => {
        return rights + count;
      });
    } else {
      setFails((fails) => {
        return fails + 1;
      });
    }
  };

  const startOnClick = () => {
    setFails(0);
    setRights(0);
    setgameDisabled(false);
    setKeyButton(keys);
    setReveal([]);
    setWord(words[Math.floor(Math.random() * words.length)]);
  };

  const handleTry = () => {
    setgameDisabled(true);
    setReveal(word.toUpperCase());
    if (
      input.normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
      word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    ) {
      setWordColor("green");
    } else {
      setForca(forca6);
      setWordColor("red");
    }
    setInput("");
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Jogo
          forca={forca}
          startOnClick={startOnClick}
          word={word}
          gameDisabled={gameDisabled}
          wordColor={wordColor}
          reveal={reveal}
        />
        <Letras
          keyButton={keyButton}
          keyOnClick={keyOnClick}
          gameDisabled={gameDisabled}
          wordColor={wordColor}
        />
        <Chute
          setInput={setInput}
          input={input}
          handleTry={handleTry}
          gameDisabled={gameDisabled}
        />
      </Container>
    </>
  );
}
