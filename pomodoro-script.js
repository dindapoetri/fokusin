// DOM Elements
const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const progressRing = document.querySelector('.progress-ring-circle');
const status = document.querySelector('.status');
const timerContainer = document.querySelector('.timer');
const container = document.querySelector('.container');

// Constants
const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60;  // 5 minutes in seconds
const CIRCLE_CIRCUMFERENCE = 879.64; // 2 * π * radius (140)

// Variables
let timeLeft = FOCUS_TIME;
let isRunning = false;
let isFocusTime = true;
let timer = null;

// Format time to MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update progress ring
function updateProgress(timeLeft, totalTime) {
    const progress = timeLeft / totalTime;
    const offset = CIRCLE_CIRCUMFERENCE * (1 - progress);
    progressRing.style.strokeDashoffset = offset;
}

// Update timer display
function updateDisplay() {
    timeDisplay.textContent = formatTime(timeLeft);
    updateProgress(timeLeft, isFocusTime ? FOCUS_TIME : BREAK_TIME);
}

// Toggle timer state
function toggleTimer() {
    if (isRunning) {
        pauseTimer();
        startBtn.textContent = 'Resume';
    } else {
        startTimer();
        startBtn.textContent = 'Pause';
    }
}

// Start timer
function startTimer() {
    isRunning = true;
    timerContainer.classList.add('active');
    
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            playNotification();
            switchMode();
        }
    }, 1000);
}

// Pause timer
function pauseTimer() {
    isRunning = false;
    timerContainer.classList.remove('active');
    clearInterval(timer);
}

// Reset timer
function resetTimer() {
    pauseTimer();
    isFocusTime = true;
    timeLeft = FOCUS_TIME;
    startBtn.textContent = 'Start';
    status.textContent = 'Focus Time';
    container.classList.remove('break-time');
    updateDisplay();
}

// Switch between focus and break modes
function switchMode() {
    isFocusTime = !isFocusTime;
    timeLeft = isFocusTime ? FOCUS_TIME : BREAK_TIME;
    status.textContent = isFocusTime ? 'Focus Time' : 'Break Time';
    container.classList.toggle('break-time');
    startBtn.textContent = 'Start';
    isRunning = false;
    updateDisplay();
}

// Play notification sound
function playNotification() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1ENS0rKzM8TF1vcH+Hj5aaaWNXR0A+Rkk7SVNlb3qF/v///+/q6Ofqt7y1sK+1tsC6usHPz8rP29vQ1NTPw8r8/fz//v///vr6+vz8/Pz6/fr2Bg0XISr//fz//v////vj5tvb1cpvZltSTkZCR0dLUVtlb31wcNLNd3JsZmBaVVFNS0lRT2Fsc3h+//7//////+33/P///v////v49vX19Pbw9fj39ff///z/9vv//v///v/////////////////+/v7+/f39/f39+/v7+vr6+vr6/v7+/v7+/f39/f39/Pz8+/v7+/v7////////////////////////////////////////+/v7+vr6+vr6/v7+/v7+/f39/f39/Pz8+/v7+/v7/////////////////////Pz8+/v7+vr6+/v7/Pz8/f39/v7+//////7+/v39/fz8/Pv7+/v7+/z8/P39/f7+/v///////////Pz8/Pz8/f39/v7+//////39/fv7+/v7+/z8/P39/f7+/v///////////Pz8+/v7+/v7/Pz8/f39/v7+/////v7+/f39/Pz8/Pz8/Pz8/f39/f39/v7+///////////////////////////+/v79/f39/f39/f3+/v7///////////7+/v39/f39/fz8/Pz8/P39/f7+/v///////////////////////////v7+/f39/f39/f39/v7+///////////+/v79/f39/f38/Pz8/Pz9/f3+/v7////+/v79/f39/f39/f39/f3+/v7+/v7/////////////////////+/v7+vr6+vr6/v7+/v7+/f39/f39/Pz8+/v7+/v7/////////////////////Pz8+/v7+vr6+/v7/Pz8/f39/v7+//////7+/v39/fz8/Pv7+/v7+/z8/P39/f7+/v///////////v7+/v7+///////////////////////////9/f37+/v7+/v9/f3///////////7+/v39/fz8/Pz8/Pz8/P39/f7+/v///////////////////////////v7+/f39/f39/f39/v7+///////////+/v79/f39/f38/Pz8/Pz9/f3+/v7///////////7+/v7+/v///////////////////////////v7+/v7+///////////////////////////9/f37+/v7+/v9/f3///////////7+/v39/fz8/Pz8/Pz8/P39/f7+/v///////////v7+/v7+///////////////////////////+/v7+/v7///////////////////////////39/fv7+/v7+/39/f///////////v7+/f39/Pz8/Pz8/Pz8/f39/v7+///////////+/v7+/v7///////////////////////////7+/v7+/v///////////////////////////f39+/v7+/v7/f39///////////+/v79/f38/Pz8/Pz8/Pz9/f3+/v7///////////7+/v7+/v///////////////////////////v7+/v7+///////////////////////////9/f37+/v7+/v9/f3///////////7+/v39/fz8/Pz8/Pz8/P39/f7+/v///////////v7+/v7+///////////////////////////+/v7+/v7///////////////////////////39/fv7+/v7+/39/f///////////v7+/f39/Pz8/Pz8/Pz8/f39/v7+///////////+/v7+/v7///////////////////////////7+/v7+/v///////////////////////////f39+/v7+/v7/f39///////////+/v79/f38/Pz8/Pz8/Pz9/f3+/v7///8=');
    audio.play();
}

// Event listeners
startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();
