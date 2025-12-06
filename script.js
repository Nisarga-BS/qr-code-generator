function generateQR() {
    let qrText = document.getElementById("qrText").value.trim();
    let qrImage = document.getElementById("qrImage");
    let downloadLink = document.getElementById("downloadLink");
    let downloadBtn = downloadLink.querySelector("button");

    if (qrText === "") {
        alert("Please enter text or URL to generate QR code");
        return;
    }

    let apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`;
    qrImage.src = apiUrl;

    // Show download button after QR is generated
    downloadLink.href = apiUrl;
    downloadLink.style.display = "inline-block";

    // ✅ Change button text dynamically
    downloadBtn.textContent = `Download QR for "${qrText}"`;

    // ✅ If input is a valid URL
    if (qrText.startsWith("http://") || qrText.startsWith("https://")) {
        qrImage.style.cursor = "pointer"; 
        qrImage.title = "Click to open link";  // Tooltip on hover

        qrImage.onclick = () => {
            let confirmOpen = confirm("Do you want to visit this page?\n\n" + qrText);
            if (confirmOpen) {
                window.open(qrText, "_blank"); 
            }
        };
    } else {
        // Reset if not a URL
        qrImage.style.cursor = "default";
        qrImage.title = "";
        qrImage.onclick = null;
    }
}
