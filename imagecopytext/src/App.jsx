// App.jsx
import React, { useState } from "react";
import Tesseract from "tesseract.js";

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [lingua, setLingua] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const extractText = () => {
    if (!image) return;

    setLoading(true);
    Tesseract.recognize(image, lingua, {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
        console.log(lingua);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">OCR com Tesseract.js</h1>
      <select value={lingua} onChange={(e) => setLingua(e.target.value)}>
        <option value="">Selecione uma lingua</option>
        <option value="eng">Inglês</option>
        <option value="por">Português</option>
        <option value="fra">Francês</option>
        <option value="spa">Espanhol</option>
      </select>

      <input
        type="file"
        accept="image/png, image/jpeg"
        className="mb-4"
        onChange={handleImageUpload}
      />

      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt="Imagem a ser processada"
            className="max-w-xs max-h-xs border border-gray-300"
          />
        </div>
      )}

      <button
        onClick={extractText}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Extraindo texto..." : "Extrair Texto"}
      </button>

      {text && (
        <textarea
          className="w-full mt-4 p-2 border border-gray-300 rounded h-64"
          value={text}
          readOnly
        />
      )}
    </div>
  );
}

export default App;
