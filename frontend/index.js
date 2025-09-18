/**
 * <div class="ac-controller">
      <h1>Керування Кондиціонером</h1>

      <div class="current-temp">
        Поточна температура: <span id="currentTemp">24°C</span>
      </div>

      <div class="set-temp">
        <label for="desiredTemp">Бажана температура:</label>
        <input type="number" id="desiredTemp" min="16" max="30" value="24" />°C
      </div>

      <div class="power-control">
        <button id="togglePower">Увімкнути</button>
      </div>
    </div>
 */

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

powerControlButton.addEventListener("click", async function () {
  await togglePower();
  updatePower();
});

async function updatePower() {
  const power = await getPower();
  powerControlButton.textContent = power ? "Вимкнути" : "Увімкнути";
  setTempInput.readOnly = !power;
}

updatePower();
