let __power = false;
async function togglePower() {
  const resp = await new Promise((resolve, reject) => {
    setTimeout(() => resolve(!__power), 2000);
  });
  __power = resp;
  return resp;
}

async function getPower() {
  const resp = await new Promise((resolve, reject) => {
    setTimeout(() => resolve(__power), 2000);
  });
  return resp;
}
