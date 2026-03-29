const gridSize = 5;
const grid = document.getElementById("grid");
const predictionText = document.getElementById("prediction");
const statusText = document.getElementById("status");

let weights = new Array(gridSize * gridSize).fill(0);
let bias = 0;
let trained = false;

// build grid
for (let i = 0; i < gridSize * gridSize; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => {
    cell.classList.toggle("active");
  });
  grid.appendChild(cell);
}

function getGridVector() {
  const cells = document.querySelectorAll(".cell");
  return Array.from(cells).map(cell => cell.classList.contains("active") ? 1 : 0);
}

function clearGrid() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.classList.remove("active");
  });
  predictionText.textContent = "";
}

function dotProduct(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

function sign(value) {
  return value >= 0 ? 1 : -1;
}

function trainPerceptron(X, y, epochs = 20, lr = 1) {
  weights = new Array(X[0].length).fill(0);
  bias = 0;

  for (let epoch = 0; epoch < epochs; epoch++) {
    let errors = 0;

    for (let i = 0; i < X.length; i++) {
      const activation = dotProduct(weights, X[i]) + bias;
      const prediction = sign(activation);

      if (prediction !== y[i]) {
        for (let j = 0; j < weights.length; j++) {
          weights[j] += lr * y[i] * X[i][j];
        }
        bias += lr * y[i];
        errors++;
      }
    }

    if (errors === 0) break;
  }

  trained = true;
}

function trainModel() {
  trainPerceptron(trainingData, trainingLabels, 50, 1);
  statusText.textContent = "Model trained on dataset.";
}

function predictDrawing() {
  if (!trained) {
    predictionText.textContent = "Please train the model first.";
    return;
  }

  const x = getGridVector();
  const activation = dotProduct(weights, x) + bias;
  const pred = sign(activation);

  predictionText.textContent = pred === -1 ? "Prediction: L" : "Prediction: T";
}