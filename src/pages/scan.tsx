import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

function Scan() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<string[]>([]);

  // Mulai Kamera dalam Mode Portrait
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { aspectRatio: 3 / 4, facingMode: "environment" }, // Mode Portrait
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Ambil Foto dengan Rasio A4
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        // Set ukuran canvas sesuai rasio A4 (210 x 297)
        canvas.width = 1050; // 210mm * 5 (resolusi tinggi)
        canvas.height = 1485; // 297mm * 5

        // Ambil gambar dari video
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImages([...images, canvas.toDataURL("image/png")]);
      }
    }
  };

  // Hapus gambar
  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Simpan ke PDF dengan Ukuran A4
  const saveAsPDF = () => {
    const pdf = new jsPDF("portrait", "mm", "a4");
    images.forEach((image, index) => {
      if (index > 0) pdf.addPage();
      pdf.addImage(image, "PNG", 0, 0, 210, 297);
    });
    pdf.save("scanned.pdf");
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">📷 Kamera Scanner</h2>

      {/* Video Preview */}
      <div className="video-container">
        <video ref={videoRef} autoPlay className="video-preview" />
      </div>

      {/* Canvas (Hidden) */}
      <canvas ref={canvasRef} className="d-none" />

      {/* Buttons */}
      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={startCamera}>
          Mulai Kamera
        </button>
        <button className="btn btn-success me-2" onClick={capturePhoto}>
          Ambil Foto
        </button>
        <button
          className="btn btn-danger"
          onClick={saveAsPDF}
          disabled={images.length === 0}
        >
          Simpan ke PDF
        </button>
      </div>

      {/* Tampilkan Gambar yang Sudah Diambil */}
      <div className="row mt-4">
        {images.map((img, index) => (
          <div key={index} className="col-6 col-md-4 position-relative">
            <img src={img} alt={`Captured ${index}`} className="captured-img" />
            <button className="delete-btn" onClick={() => deleteImage(index)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scan;
