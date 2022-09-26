import styled from "styled-components";

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

const Try = styled.button`
  height: 30px;

  background-color: #4caf50; /* Green */
  border: none;
  border-radius: 8px;
  color: white;
  padding: 5px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  cursor: pointer;
  background-color: blue;
  :disabled {
    background-color: gray;
    cursor: default;
  }
`;

export default function Chute({ setInput, input, handleTry, gameDisabled }) {
  return (
    <Footer>
      Já sei a palavra!{" "}
      <input
        data-identifier="type-guess"
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />{" "}
      <Try
        data-identifier="guess-button"
        onClick={handleTry}
        disabled={gameDisabled}
      >
        Chutar
      </Try>
    </Footer>
  );
}
