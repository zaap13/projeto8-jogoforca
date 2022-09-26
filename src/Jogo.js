import styled from "styled-components";

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
`;

const Letter = styled.li`
  width: 30px;
  height: 30px;
  color: ${(props) => (props.game ? props.end : "black")};
  font-size: 30px;
  text-align: center;
  border-bottom: 2px solid black;
`;

export default function Jogo({
  forca,
  startOnClick,
  word,
  gameDisabled,
  wordColor,
  reveal,
}) {
  return (
    <GameBox>
      <Forca data-identifier="game-image" src={forca} alt="Imagem" />
      <RightBox>
        <Button data-identifier="choose-word" onClick={startOnClick}>
          START
        </Button>
        <WordBox data-identifier="word">
          {word.split("").map((i, index) => (
            <Letter key={index} game={gameDisabled} end={wordColor}>
              {reveal[index]}
            </Letter>
          ))}
        </WordBox>
      </RightBox>
    </GameBox>
  );
}
