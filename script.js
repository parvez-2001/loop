let currentStep = 0;
let currentIteration = 0;
let isRunning = false;
let autoMode = false;
let outputCount = 0;

const fruits = ["apple", "banana", "orange"];
const fruitEmojis = ["🍎", "🍌", "🍊"];

const steps = [
    { line: 'line1', action: 'Initialize fruits list', description: 'Create a list containing three fruits.', code: 'fruits = ["apple", "banana", "orange"]' },
    { line: 'line2', action: 'Start loop', description: 'Start iterating through fruits.', code: 'for fruit in fruits:', iteration: 0, currentFruit: 'apple' },
    { line: 'line3', action: 'Print fruit', description: 'Print "apple".', code: 'print(fruit)', output: 'apple' },
    { line: 'line2', action: 'Next iteration', description: 'Next item is "banana".', code: 'for fruit in fruits:', iteration: 1, currentFruit: 'banana' },
    { line: 'line3', action: 'Print fruit', description: 'Print "banana".', code: 'print(fruit)', output: 'banana' },
    { line: 'line2', action: 'Next iteration', description: 'Next item is "orange".', code: 'for fruit in fruits:', iteration: 2, currentFruit: 'orange' },
    { line: 'line3', action: 'Print fruit', description: 'Print "orange".', code: 'print(fruit)', output: 'orange' },
    { line: null, action: 'Loop complete', description: 'All fruits processed.', code: 'Loop finished' }
];

function updateCurrentFruit(fruit, iteration) {
    const el = document.getElementById('currentFruit');
    const emoji = fruitEmojis[iteration] || '';
    if (fruit) {
        el.innerHTML = `${emoji} ${fruit}`;
        el.classList.add('highlight');
        document.querySelectorAll('.fruit-item').forEach((item, i) => {
            item.classList.remove('current');
            if (i === iteration) {
                item.classList.add('current', 'bounce');
                setTimeout(() => item.classList.remove('bounce'), 600);
            }
        });
    } else {
        el.textContent = 'Not set';
        document.querySelectorAll('.fruit-item').forEach(item => item.classList.remove('current'));
    }
    setTimeout(() => el.classList.remove('highlight'), 500);
}

function updateIterationCount(iteration) {
    document.getElementById('iterationCount').textContent = `${iteration + 1} / 3`;
}

function highlightLine(id) {
    document.querySelectorAll('.code-line').forEach(line => line.classList.remove('active'));
    if (id) document.getElementById(id).classList.add('active');
}

function addStepInfo(step) {
    const container = document.getElementById('stepContainer');
    container.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'step-info';
    div.innerHTML = `<strong>Step ${currentStep + 1}: ${step.action}</strong><br>${step.description}`;
    container.appendChild(div);
    setTimeout(() => div.classList.add('show'), 100);
}

function addOutput(text) {
    const container = document.getElementById('outputContainer');
    if (outputCount === 0) container.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'output-line';
    div.textContent = text;
    container.appendChild(div);
    setTimeout(() => div.classList.add('show'), 100);
    outputCount++;
}

function updateStatus(message, className = '') {
    const el = document.getElementById('status');
    el.textContent = message;
    el.className = `status ${className}`;
}

function nextStep() {
    if (currentStep >= steps.length) {
        updateStatus('For loop execution completed!', 'finished');
        document.getElementById('stepBtn').disabled = true;
        return;
    }
    const step = steps[currentStep];
    highlightLine(step.line);
    addStepInfo(step);
    if (step.currentFruit !== undefined) {
        updateCurrentFruit(step.currentFruit, step.iteration);
        updateIterationCount(step.iteration);
    }
    if (step.output) addOutput(step.output);

    updateStatus(`Executing step ${currentStep + 1} of ${steps.length}`, 'running');

    currentStep++;
    if (autoMode && currentStep < steps.length) setTimeout(nextStep, 2000);
}

function startExecution() {
    autoMode = true;
    isRunning = true;
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stepBtn').disabled = true;
    updateStatus('Auto-executing...', 'running');
    nextStep();
}

function resetExecution() {
    currentStep = 0;
    currentIteration = 0;
    isRunning = false;
    autoMode = false;
    outputCount = 0;

    highlightLine(null);
    updateCurrentFruit(null);
    document.getElementById('iterationCount').textContent = '0 / 3';
    document.getElementById('stepContainer').innerHTML = `<div class="step-info show"><strong>Ready to start!</strong><br>Click \"Start\" or \"Next Step\" to begin execution.</div>`;
    document.getElementById('outputContainer').innerHTML = `<div style="color: #a0aec0; font-style: italic;">Output will appear here...</div>`;
    document.querySelectorAll('.fruit-item').forEach(item => item.classList.remove('current'));
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stepBtn').disabled = false;
    updateStatus('Ready to execute');
}

document.addEventListener('DOMContentLoaded', resetExecution);
