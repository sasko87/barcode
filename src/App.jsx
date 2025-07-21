import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import Barcode from "react-barcode";

function App() {
  const [barcodeNumber, setBarcodeNumber] = useState("");
  const [startNumber, setStartNumber] = useState(1);
  const [barcodes, setBarcodes] = useState([]);

  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}${month}${year}`;
  };

  const generateBarcodes = () => {
    const today = getTodayDate();
    const count = parseInt(barcodeNumber, 10);
    const start = parseInt(startNumber, 10);

    if (!count || count <= 0) return alert("Enter a valid number of barcodes");

    const generated = [];

    for (let i = 0; i < count; i++) {
      const number = String(start + i).padStart(3, "0");
      const barcodeValue = `${today}${number}`;

      // Duplicate each barcode 5 times
      for (let j = 0; j < 5; j++) {
        generated.push(barcodeValue);
      }
    }

    setBarcodes(generated);
  };

  const clearBarcodes = () => {
    setBarcodes([]);
  };
  return (
    <>
      <h1>Barcode Generator</h1>
      <section>
        <div className="inputs">
          <Input
            label={"Starting Number"}
            id={"startingNumber"}
            name={"startingNumber"}
            type="number"
            value={startNumber}
            onChange={(e) => {
              setStartNumber(e.target.value);
            }}
          />
          <Input
            label={"Number of Barcodes"}
            id={"numberOfBarcodes"}
            name={"numberOfBarcodes"}
            type="number"
            value={barcodeNumber}
            onChange={(e) => {
              setBarcodeNumber(e.target.value);
            }}
          />
        </div>

        <div className="buttons">
          <Button className="generate-button" onClick={generateBarcodes}>
            Generate
          </Button>
          {barcodes.length > 0 && (
            <>
              <Button className="print-button" onClick={() => window.print()}>
                Print
              </Button>
              <Button className="clear-button" onClick={clearBarcodes}>
                Clear
              </Button>
            </>
          )}
        </div>
      </section>
      <div className="barcodes">
        {barcodes.map((value, index) => (
          <div key={index} className="barcode">
            <Barcode
              value={value}
              format="CODE128"
              renderer="svg"
              width={1.1}
              height={38}
              fontSize={10}
              margin={0}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
