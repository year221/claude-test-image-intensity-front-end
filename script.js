// API Configuration
const API_BASE_URL = 'http://localhost:3000';
const CALCULATE_ENDPOINT = '/calculate-intensity';

// DOM Elements
const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const result = document.getElementById('result');
const error = document.getElementById('error');
const intensityValue = document.getElementById('intensityValue');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
imageInput.addEventListener('change', handleFileSelect);
uploadArea.addEventListener('click', () => imageInput.click());
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('drop', handleDrop);
uploadArea.addEventListener('dragleave', handleDragLeave);

/**
 * Handle file selection
 */
async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        await processFile(file);
    }
}

/**
 * Handle drag over
 */
function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

/**
 * Handle drag leave
 */
function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

/**
 * Handle drop
 */
async function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        imageInput.files = files;
        await processFile(file);
    }
}

/**
 * Process uploaded file
 */
async function processFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please select a valid image file.');
        return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showError('File size must be less than 10MB.');
        return;
    }

    try {
        showLoading();
        const resultData = await uploadImageAndCalculateIntensity(file);
        showResult(resultData.average_intensity);
    } catch (err) {
        showError(err.message);
    }
}

/**
 * Upload image and calculate intensity via API
 */
async function uploadImageAndCalculateIntensity(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}${CALCULATE_ENDPOINT}`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.average_intensity === undefined) {
        throw new Error('Invalid response from API');
    }

    return data;
}

/**
 * Show loading state
 */
function showLoading() {
    uploadArea.classList.add('loading');
    uploadArea.querySelector('.upload-content span').textContent = 'Calculating';
    result.style.display = 'none';
    error.style.display = 'none';
}

/**
 * Show calculation results
 */
function showResult(intensity) {
    uploadArea.classList.remove('loading');
    uploadArea.classList.add('has-image');
    uploadArea.querySelector('.upload-content span').textContent = 'Drop another image';
    
    intensityValue.textContent = Math.round(intensity);
    result.style.display = 'block';
    error.style.display = 'none';
}

/**
 * Show error message
 */
function showError(message) {
    uploadArea.classList.remove('loading');
    uploadArea.querySelector('.upload-content span').textContent = 'Drop image or click to upload';
    
    errorMessage.textContent = message;
    error.style.display = 'block';
    result.style.display = 'none';
}

/**
 * Handle API connection errors
 */
window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && event.reason.message && event.reason.message.includes('fetch')) {
        showError('Cannot connect to API server');
        event.preventDefault();
    }
});