function generateQR() {
    const qrContainer = document.querySelector("#qr-image");
    const error = document.querySelector("#qr-image .error");
    const image = document.querySelector("#img");
    const downloadButton = document.querySelector("#download-button");
    const qrText = document.querySelector("#text").value.trim();

    qrContainer.style.display = "block";
    error.textContent = "";
    downloadButton.style.display = "none";

    if (qrText.length === 0) {
        error.textContent = "Please enter text";
        image.style.display = "none";
        return;
    }

    image.style.display = "block";
    image.onload = () => {
        downloadButton.style.display = "block";
    };
    image.onerror = () => {
        error.textContent = "Unable to generate QR code. Please try again.";
        downloadButton.style.display = "none";
    };
    image.src = "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=" + encodeURIComponent(qrText);
}

async function downloadQR() {
    const image = document.querySelector("#img");
    const error = document.querySelector("#qr-image .error");
    const downloadButton = document.querySelector("#download-button");

    downloadButton.disabled = true;
    error.textContent = "";

    try {
        const response = await fetch(image.src);
        if (!response.ok) {
            throw new Error("QR code download failed");
        }

        const imageBlob = await response.blob();
        const downloadUrl = URL.createObjectURL(imageBlob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "qr-code.png";
        link.click();
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    } catch {
        error.textContent = "Unable to download QR code. Please try again.";
    } finally {
        downloadButton.disabled = false;
    }
}