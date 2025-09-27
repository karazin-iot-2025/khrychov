let __power = false;

const BASE_URL = "http://localhost:8000";

async function togglePower() {
  const resp = await new Promise((resolve, reject) => {
    setTimeout(() => resolve(!__power), 2000);
  });
  __power = resp;
  return resp;
}

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
