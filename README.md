My experiments with coding agents

# Image Intensity Calculator Frontend (Written by Claude Code)

A web frontend application that allows users to upload images and calculate their average intensity using the Rust REST API.

## Features

- 📁 Drag & drop or click to upload images
- 🖼️ Live image preview
- 📱 Responsive design for mobile and desktop
- ⚡ Real-time API integration
- 🛡️ Error handling and validation

## Prerequisites

1. **Rust API Server**: Make sure the webcalculation Rust API is running on `http://localhost:3000`
   ```bash
   cd ../webcalculation
   cargo run
   ```

2. **Web Server**: Serve the frontend files using any HTTP server

## How to Run

1. **Start the Rust API** (in another terminal):
   ```bash
   cd ../webcalculation
   cargo run
   ```

2. **Serve the frontend** using one of these methods:

   **Option A: Python HTTP Server**
   ```bash
   python3 -m http.server 8080
   ```

   **Option B: Node.js HTTP Server**
   ```bash
   npx serve .
   ```

   **Option C: Any other web server**

3. **Open in browser**: Navigate to `http://localhost:8080`

## Usage

1. Click "Choose Image File" or drag an image onto the upload area
2. Select an image file (JPG, PNG, GIF, etc.)
3. Preview the selected image
4. Click "Calculate Intensity"
5. View the results:
   - Average intensity value (0-255)
   - Visual intensity indicator
   - Contextual description

## Supported Image Formats

- JPEG/JPG
- PNG
- GIF
- WEBP
- BMP
- And most other common image formats

## File Size Limit

Maximum file size: 10MB

## API Integration

The frontend connects to the Rust API at:
- **Endpoint**: `POST http://localhost:3000/calculate-intensity`
- **Method**: Multipart form data upload
- **Field name**: `image`

## Error Handling

The application provides user-friendly error messages for:
- Invalid file types
- File size exceeded
- API connection errors
- Server errors
- Network issues

## Browser Compatibility

- Modern browsers with JavaScript enabled
- Mobile responsive design
- Works on iOS Safari, Chrome, Firefox, Edge
