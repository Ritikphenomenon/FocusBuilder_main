import styled from "styled-components";
import { useEffect, useState } from "react";


const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 28;
const WALL_HEIGHT = 520;
const WALL_WIDTH = 800;
const GRAVITY = 5;
const OBJ_WIDTH = 50;
const OBJ_SPEED = 9;
const OBJ_GAP = 180;

function BirdGame() {
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirdpos] = useState(150);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let birdInterval;
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
      birdInterval = setInterval(() => {
        setBirdpos((birdpos) => birdpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(birdInterval);
  }, [isStart, birdpos]);

  useEffect(() => {
    let objInterval;
    if (isStart && objPos >= -OBJ_WIDTH) {
      objInterval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED);
      }, 24);

      return () => clearInterval(objInterval);
    } else {
      setObjPos(WALL_WIDTH);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
      if (isStart) setScore((score) => score + 1);
    }
  }, [isStart, objPos]);

  useEffect(() => {
    const topObj = birdpos >= 0 && birdpos < objHeight;
    const bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >= WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;

    if (objPos >= OBJ_WIDTH && objPos <= OBJ_WIDTH + 80 && (topObj || bottomObj)) {
      setIsStart(false);
      setBirdpos(150);
      setScore(0);
    }
  }, [isStart, birdpos, objHeight, objPos]);

  const handleClick = () => {
    if (!isStart) setIsStart(true);
    else if (birdpos < BIRD_HEIGHT) setBirdpos(0);
    else setBirdpos((birdpos) => birdpos - 30);
  };

  return (
    <Home onClick={handleClick} className="mb-4">
      <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
        <ScoreShow>Score: {score}</ScoreShow>
        {!isStart && <Startboard>Click To Start</Startboard>}
        {/* Top Pillar */}
        <Obj height={objHeight} width={OBJ_WIDTH} left={objPos} top={0} deg={180} />
        {/* Bird */}
        <Bird height={BIRD_HEIGHT} width={BIRD_WIDTH} top={birdpos} left={100} />
        {/* Bottom Pillar */}
        <Obj
          height={WALL_HEIGHT - OBJ_GAP - objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={objHeight + OBJ_GAP}
          deg={0}
        />
      </Background>
    </Home>
  );
}

export default BirdGame;

const Home = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  background-image: url("/background-day.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const Bird = styled.div`
  position: absolute;
  background-image: url("/yellowbird-upflap.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: absolute;
  background-image: url("/pipe-green.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  padding: 6px;
  width: 100px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`;

const ScoreShow = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 24px;
  padding: 4px;
  border-radius: 10px;
  width: 150px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
