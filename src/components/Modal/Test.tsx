import { Fireworks } from 'fireworks-js/dist/react';

export const Test = () => {
  const options = {
    speed: 3
  }

  const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: '#0000',
    zIndex: -1,
  }

  return (
    <>
      <Fireworks options={options} style={style as React.CSSProperties} />
      <div>
        asdfasdf
      </div>
    </>
  )
}