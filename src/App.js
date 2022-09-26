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
  background-color: #cecece;
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
  :disabled{
    background-color: gray;
  }
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
`;

const Letter = styled.li`
  width: 30px;
  height: 30px;
  color: ${(props) => (props.game ? props.end : "black")};
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

const Footer = styled.div`
  width: 600px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 22px;

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
  const keys = alfabeto.map((item, index) => {
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
    console.log(word);
    const clickedButton = keyButton.map((i) =>
      i[0] === key ? (i = [key, true]) : i
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
    if (input.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
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
        <GameBox>
          <Forca src={forca} alt="Imagem" />
          <RightBox>
            <Button onClick={startOnClick}>START</Button>
            <WordBox>
              {word.split("").map((i, index) => (
                <Letter key={index} game={gameDisabled} end={wordColor}>
                  {reveal[index]}
                </Letter>
              ))}
            </WordBox>
          </RightBox>
        </GameBox>
        <Keyboard>
          {keyButton.map((item, index) => (
            <Key
              key={index}
              letter={item[0]}
              onClick={() => keyOnClick(item[0])}
              disabled={gameDisabled ? true : item[1]}
              end={wordColor}
            >
              {item[0].toUpperCase()}
            </Key>
          ))}
        </Keyboard>
        <Footer>
          Já sei a palavra!{" "}
          <input type="text" onChange={(e) => setInput(e.target.value)} value={input} />{" "}
          <Button onClick={handleTry} disabled={gameDisabled}>Chutar</Button>
        </Footer>
      </Container>
    </>
  );
}
