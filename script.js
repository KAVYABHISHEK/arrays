function generateRandomData(size) {
    const randomData = [];
  
    for (let i = 0; i < size; i++) {
      randomData.push(Math.floor(Math.random() * 1000)); // You can adjust the range as needed
    }
  
    return randomData;
  }
  

function runBenchmark() {
    const inputElement = document.getElementById("inputNumbers");
    const sampleSizeElement = document.getElementById("sampleSize");
    const benchmarkResultsElement = document.getElementById("benchmarkResults");
    const sortAlgorithm = document.getElementById("sortAlgorithm").value;
  
    const sampleSize = parseInt(sampleSizeElement.value, 10);
    const inputNumbers = inputElement.value.split(',').map(Number);
    const algorithms = {
      "Merge Sort": mergeSort,
      "Insertion Sort": insertionSort,
      "Quick Sort": quickSort,
    };
  
    let results = `<h2>Benchmark Results</h2><p>Sample size: ${sampleSize}</p><ul>`;
  
    for (const algorithm in algorithms) {
      let totalTime = 0;
  
      for (let i = 0; i < sampleSize; i++) {
        const testData = generateRandomData(inputNumbers.length); // Replace with your data generation function
        
        const startTime = performance.now();
        algorithms[algorithm](testData);
        const endTime = performance.now();
  
        totalTime += endTime - startTime;
      }
  
      const averageTime = totalTime / sampleSize;
      results += `<li>${algorithm}: ${averageTime.toFixed(4)} ms</li>`;
    }
  
    results += "</ul>";
    benchmarkResultsElement.innerHTML = results;
  }
  function sortNumbers() {
    const inputElement = document.getElementById("inputNumbers");
    const sortedNumbersElement = document.getElementById("sortedNumbers");
    const sortAlgorithm = document.getElementById("sortAlgorithm").value;
    
    const inputNumbers = inputElement.value.split(',').map(Number);
    let sortedNumbers;
    
    if (sortAlgorithm === "merge") {
      sortedNumbers = mergeSort(inputNumbers);
    } else if (sortAlgorithm === "insert") {
      sortedNumbers = insertionSort(inputNumbers);
    } else if (sortAlgorithm === "quick") {
      sortedNumbers = quickSort(inputNumbers);
    }
    
    sortedNumbersElement.textContent = sortedNumbers.join(', ');
  }
  
  function mergeSort(arr) {
    // Implement Merge Sort algorithm here
if (arr.length <= 1) {
  return arr; // Base case: already sorted or empty
}

const middle = Math.floor(arr.length / 2);
const left = arr.slice(0, middle);
const right = arr.slice(middle);

return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
let result = [];
let leftIndex = 0;
let rightIndex = 0;

while (leftIndex < left.length && rightIndex < right.length) {
  if (left[leftIndex] < right[rightIndex]) {
    result.push(left[leftIndex]);
    leftIndex++;
  } else {
    result.push(right[rightIndex]);
    rightIndex++;
  }
}

return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
  
  function insertionSort(arr) {
    // Implement Insertion Sort algorithm here
for (let i = 1; i < arr.length; i++) {
  let currentElement = arr[i];
  let j = i - 1;

  while (j >= 0 && arr[j] > currentElement) {
    arr[j + 1] = arr[j];
    j--;
  }

  arr[j + 1] = currentElement;
}

return arr;
}

function quickSort(arr) {
if (arr.length <= 1) {
  return arr;
}

const pivot = arr[Math.floor(arr.length / 2)];
const less = [];
const equal = [];
const greater = [];

for (let element of arr) {
  if (element < pivot) {
    less.push(element);
  } else if (element === pivot) {
    equal.push(element);
  } else {
    greater.push(element);
  }
}

return quickSort(less).concat(equal, quickSort(greater));
}