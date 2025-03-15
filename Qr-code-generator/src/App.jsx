import { useState } from 'react';
import './App.css';

function App() {
    const [qrText, setQrText] = useState("");
    const [hasError, setHasError] = useState(false);
    const [imgClassName, setImgClassName] = useState("");
    const [qrSrc, setQrSrc] = useState("");

    const generateQr = () => {
        if (qrText.length > 0) {
            setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText)}`);
            setImgClassName("show-img");
            setHasError(false);
        } else {
            setHasError(true);
            setTimeout(() => {
                setHasError(false);
            }, 1000);
        }
    };

    return (
        <>
            <div className="container">
                <p>Enter your text or URL</p>
                <input
                    type="text"
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    placeholder="Text or URL"
                    className={hasError ? "error" : ""}
                />

                <div id="imgBox" className={imgClassName}>
                    <img src={qrSrc} alt="QR Code" />
                </div>

                <button onClick={generateQr}>Generate QR Code</button>
                {hasError && <p id="errorMsg">Please enter some text first</p>}
            </div>
        </>
    );
}

export default App;