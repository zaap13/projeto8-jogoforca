import styled from "styled-components";

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

export default function Letras({
  keyButton,
  keyOnClick,
  gameDisabled,
  wordColor,
}) {
  return (
    <Keyboard>
      {keyButton.map((item, index) => (
        <Key
          data-identifier="letter"
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
  );
}
