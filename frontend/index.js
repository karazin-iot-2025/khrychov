function createDiv(className) {
  const container = document.createElement("div");
  container.classList.add(className);
  return container;
}

const container = createDiv("ac-controller");
document.body.appendChild(container);

const header = document.createElement("h1");
header.textContent = "Керування Кондиціонером";
container.appendChild(header);

const currentTempContainer = createDiv("current-temp");
currentTempContainer.textContent = "Поточна температура: ";
container.appendChild(currentTempContainer);

const currentTempSpan = document.createElement("span");
currentTempSpan.id = "currentTemp";
currentTempSpan.textContent = "24°C";
currentTempContainer.appendChild(currentTempSpan);

const setTempContainer = createDiv("set-temp");
const setTempLabel = document.createElement("label");
setTempLabel.textContent = "Бажана температура:";
setTempLabel.htmlFor = "desiredTemp";
const setTempInput = document.createElement("input");
setTempInput.min = 16;
setTempInput.max = 30;
setTempInput.value = 24;
setTempInput.id = "desiredTemp";
setTempInput.type = "number";
setTempInput.readOnly = true;
setTempContainer.appendChild(setTempLabel);
setTempContainer.appendChild(setTempInput);
container.appendChild(setTempContainer);

const powerControlContainer = createDiv("power-control");
const powerControlButton = document.createElement("button");
powerControlButton.textContent = "Увімкнути";
powerControlButton.id = "togglePower";
powerControlContainer.appendChild(powerControlButton);
container.appendChild(powerControlContainer);

async function updatePowerControl(power) {
  if (power) {
    powerControlButton.onclick = async function () {
      await off();
      // updateConditioner();
    };
    setTempInput.onchange = async function (event) {
      const targetTemp = +event.target.value;
      await setTargetTemp(targetTemp);
      // updateConditioner();
    };
  } else {
    powerControlButton.onclick = async function () {
      await on();
      // updateConditioner();
    };
  }

  powerControlButton.textContent = power ? "Вимкнути" : "Увімкнути";
  setTempInput.readOnly = !power;
}

async function updateConditioner(power, targetTemp, currentTemp) {
  // const { power, targetTemp, currentTemp } = await getStatus();
  updatePowerControl(power);
  setTempInput.value = targetTemp;
  currentTempSpan.textContent = `${currentTemp}°C`;
}
const wsUri = "ws://localhost:8000";
const websocket = new WebSocket(wsUri);
// websocket.addEventListener("open", () => {
//   console.log("CONNECTED");
//   pingInterval = setInterval(() => {
//     websocket.send("ping");
//   }, 1000);
// });
websocket.addEventListener("message", (e) => {
  const { power, targetTemp, currentTemp } = JSON.parse(e.data);
  console.log(e);

  updateConditioner(power, targetTemp, currentTemp);
});

// updateConditioner();
