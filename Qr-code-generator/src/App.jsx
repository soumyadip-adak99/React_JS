import { useState } from "react";
import "./App.css";

const App = () => {
    const [qrText, setQrText] = useState("");
    const [qrImage, setQrImage] = useState("");

    const generateQr = () => {
        if (qrText.trim().length > 0) {
            setQrImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText)}`)
        } else {
            setQrText("Error: Enter text");
            setTimeout(() => {
                setQrText("")
            }, 1000)
        }
    }

    const clearAll = () => {
        setQrText('');
        setQrImage('');
    }


    return (
        <div className="container">
            <p>Enter your text or URL</p>
            <input
                type="text"
                placeholder="Text or URL"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                className={qrText === "Error: Enter text" ? "error" : ""}
            />
            <div id="imgBox" className={qrImage ? "show-img" : ""}>
                {qrImage && <img src={qrImage} id="qrImg" alt="QR Code" />}
            </div>
            <button onClick={generateQr}>Generate QR Code</button>
            <button onClick={clearAll} style={{ background: 'red' }}>Clear</button>
        </div>
    );
}

export default App;
