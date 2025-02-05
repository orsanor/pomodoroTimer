import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRedo,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${(props) => (props.isBreak ? "#efa7bc" : "#f7797f")};
  transition: background-color 0.5s ease;
  border-radius: 15px;
  margin: 2rem auto;
  max-width: 400px;
`;

const ProgressContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 2rem auto;
`;

const ProgressCircle = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 8;
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: ${(props) => (props.isBreak ? "#4CAF50" : "#f44336")};
  stroke-width: 8;
  stroke-linecap: round;
  transition: all 1s linear;
`;

const TimeDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  margin: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  background-color: white;
  color: ${(props) => (props.isBreak ? "#4CAF50" : "#f44336")};
`;

const Title = styled.h1`
  color: white;
  margin: 0 0 2rem 0;
  font-size: 2.5rem;
  transition: color 0.5s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const WORK_TIME = 25;
  const BREAK_TIME = 5;

  const calculateProgress = useCallback(() => {
    const totalSeconds = (isBreak ? BREAK_TIME : WORK_TIME) * 60;
    const remainingSeconds = minutes * 60 + seconds;
    return 1 - remainingSeconds / totalSeconds;
  }, [minutes, seconds, isBreak]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            const newIsBreak = !isBreak;
            setIsBreak(newIsBreak);
            setMinutes(newIsBreak ? BREAK_TIME : WORK_TIME);
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(WORK_TIME);
    setSeconds(0);
  };

  const proxTimer = () => {
    setIsActive(false);
    // Alterna entre trabalho e descanso
    setIsBreak((prev) => {
      const newMode = !prev;
      setMinutes(newMode ? BREAK_TIME : WORK_TIME);
      return newMode;
    });
    setSeconds(0);
  };

  return (
    <Container isBreak={isBreak}>
      <Title isBreak={isBreak}>{isBreak ? "Break!" : "Focus!"}</Title>

      <ProgressContainer>
        <ProgressCircle viewBox="0 0 200 200">
          <CircleBackground cx="100" cy="100" r="90" />
          <CircleProgress
            isBreak={isBreak}
            cx="100"
            cy="100"
            r="90"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - calculateProgress())}`}
          />
        </ProgressCircle>
        <TimeDisplay>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </TimeDisplay>
      </ProgressContainer>

      <Button onClick={toggleTimer} isBreak={isBreak}>
        <FontAwesomeIcon icon={isActive ? faPause : faPlay} />
      </Button>
      <Button onClick={resetTimer} isBreak={isBreak}>
        <FontAwesomeIcon icon={faRedo} />
      </Button>

      <Button onClick={proxTimer} isBreak={isBreak}>
        <FontAwesomeIcon icon={faArrowRightToBracket} />
      </Button>
    </Container>
  );
};

export default PomodoroTimer;
