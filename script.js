let qrCode;
let logoEnabled = true;
let currentLogoSize = 0.3;
let uploadedImageURL = null;
const defaultLogoURL = "logometro.PNG"; // Replace with your own logo if needed


function generateQRCode() {
  const qrContainer = document.getElementById("qrcode");
  const text = document.getElementById("qrText").value;

    // Clear previous QR
    qrContainer.innerHTML = "";

  const finalLogo = logoEnabled ? (uploadedImageURL || defaultLogoURL) : "";

  // Create the QR code with customization options
  qrCode = new QRCodeStyling({
    width: 500,
    height: 500,
    data: text,
    image: finalLogo,
    imageOptions: {
      crossOrigin: "anonymous",
      imageSize: currentLogoSize,
      margin: 0
    },
    dotsOptions: {
      color: "#000000", // Black dots
      type: "square", // Shape of dots (can be square, rounded, or extra-rounded)
    },
    backgroundOptions: {
      color: "#ffffff", // Background color of the QR code
    },
    cornersSquareOptions: {
      type: "square", // Shape of the corners of the QR code
    },
    cornersDotOptions: {
      type: "square", // Style of the dots at the corners
      color: "#000000", // Dot color
    },
    margin: 10, // This creates spacing around the QR code (not a visual border)
  });

  qrCode.append(qrContainer);
}

function toggleLogo() {
  logoEnabled = !logoEnabled;

  // Update button text
  const toggleButton = document.getElementById("toggleLogoBtn");
  toggleButton.textContent = logoEnabled ? "Toggle Logo ON" : "Toggle Logo OFF";

  generateQRCode();  // Re-generate QR with new image setting
}

function updateLogoSize() {
  const sizeInput = document.getElementById("logoSize");
  currentLogoSize = parseFloat(sizeInput.value);
  document.getElementById("logoSizeValue").innerText = currentLogoSize;
  generateQRCode(); // re-render QR with new logo size
}

function downloadQRCode() {
  if (qrCode) {
    // Download the QR Code as an image
    qrCode.download({
      name: "qr-code", // Name of the file to be downloaded
      extension: "png", // Image format (png, jpeg, etc.)
    });
  }
}

// ✅ NEW: Handle image upload
function handleImageUpload() {
  const fileInput = document.getElementById("imageUpload");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImageURL = e.target.result; // base64 image data
      generateQRCode(); // update QR with new logo
    };
    reader.readAsDataURL(file); // convert image file to data URL
  }
}
