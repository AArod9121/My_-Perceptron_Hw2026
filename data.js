const trainingData = [];
const trainingLabels = [];

// Base patterns (5x5)
const baseL = [
  1,0,0,0,0,
  1,0,0,0,0,
  1,0,0,0,0,
  1,0,0,0,0,
  1,1,1,1,1
];

const baseT = [
  1,1,1,1,1,
  0,0,1,0,0,
  0,0,1,0,0,
  0,0,1,0,0,
  0,0,1,0,0
];

// Function to slightly modify patterns
function addNoise(pattern) {
  let newPattern = [...pattern];

  // randomly flip 1–3 pixels
  let flips = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < flips; i++) {
    let idx = Math.floor(Math.random() * newPattern.length);
    newPattern[idx] = newPattern[idx] === 1 ? 0 : 1;
  }

  return newPattern;
}

// Generate 50 L samples
for (let i = 0; i < 50; i++) {
  trainingData.push(addNoise(baseL));
  trainingLabels.push(-1); // L
}

// Generate 50 T samples
for (let i = 0; i < 50; i++) {
  trainingData.push(addNoise(baseT));
  trainingLabels.push(1); // T
}