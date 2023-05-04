export function toast(msg: string, time: number = 3000, delay: number = 0) {
  if (msg === "") return;
  const id = "custom-toast";
  const toastEl = document.createElement("span");
  toastEl.id = id;
  toastEl.style.cssText = `
      padding: 0.5rem;
      position: absolute;
      top: calc(var(--header-height) + 5rem);
      left: 50%;
      transform: translate(-50%);
      background-color: #4A4A4A;
      border: 0.2rem #4A4A4A solid;
      color: white;
      font-size: 1.5rem;
      z-index: 999;
      border-radius: 0.3rem;
      opacity: 0;
      transition: opacity 0.3s;
    `;
  toastEl.innerText = msg;
  document.body.append(toastEl);
  setTimeout(() => {
    toastEl.style.opacity = "1";
    setTimeout(() => {
      toastEl.style.opacity = "0";
      setTimeout(() => {
        toastEl.remove();
      }, 500);
    }, time);
  }, delay);
}
