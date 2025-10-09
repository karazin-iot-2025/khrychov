let __power = false;

const BASE_URL = "http://localhost:8000";

async function on() {
  return await fetch(`${BASE_URL}/conditioners/1`, {
    method: "PATCH",
    body: JSON.stringify({ power: true }),
  });
}

async function off() {
  return await fetch(`${BASE_URL}/conditioners/1`, {
    method: "PATCH",
    body: JSON.stringify({ power: false }),
  });
}

async function getPower() {
  const resp = await fetch(`${BASE_URL}/conditioners/1`);
  return resp.json();
}

async function setTargetTemp(targetTemp) {
  return await fetch(`${BASE_URL}/conditioners/1`, {
    method: "PATCH",
    body: JSON.stringify({ targetTemp }),
  });
}

async function getStatus() {
  const resp = await fetch(`${BASE_URL}/conditioners/1`);
  return resp.json();
}
