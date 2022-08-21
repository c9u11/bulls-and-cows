import { Fireworks } from "fireworks-js/dist/react";
import { getChallengeState } from "util/ChallengeState";

export const ResultBoard = () => {
  const challengeState = getChallengeState();
  const options = {
    speed: 3,
  };

  const style = {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "fixed",
    background: "#0000",
    zIndex: -1,
  };

  return (
    <>
      <Fireworks options={options} style={style as React.CSSProperties} />
      <div>
        {JSON.stringify(challengeState)}
        {String(new Date(challengeState.lastCompletedTs))}
      </div>
    </>
  );
};
