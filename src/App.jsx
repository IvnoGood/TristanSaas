import { useState, useEffect } from 'react';
import "./style.css";

function App() {
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [codeResult, setCodeResult] = useState([]);

  function hexToRgb(hex) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function SetNewItem() {
    setItems([...items, { id: nextId, x: 0, y: 0, color: '#000000', shape: 'Rectangle', width: 25, height: 25, layer: nextId }]);
    setNextId(nextId + 1);
    GetOutput();
  }

  function updateItem(id, field, value) {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    GetOutput();
  }

  function GetOutput() {
    const output = items.map(item => {
      let rgb = hexToRgb(item.color).match(/\d+/g);
      let r = rgb[0], g = rgb[1], b = rgb[2];

      return `${item.shape}, ${item.x + 1}, ${item.y}, ${item.width}, ${item.height}, ${r * 255}, ${g * 255}, ${b * 255}`;
    });

    setCodeResult(output);
  }

  useEffect(() => {
    GetOutput();
  }, []);

  return (
    <>
      {/*       <header>
        <img src="https://placehold.jp/250x50.png" alt="Logo" />
      </header> */}
      <main>
        <div className='listItems'>
          <h3 className='text-center text-bold mb-5'>Items list</h3>
          <button onClick={SetNewItem} className='cursor-pointer bg-lime-500 p-1 text'>+</button>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <div className='item'>
                  <p>Item n°{item.id}:&nbsp;</p>

                  <label>Choose an object:&nbsp;</label>
                  <select value={item.shape} onChange={(e) => updateItem(item.id, 'shape', e.target.value)}>
                    <option value="Rectangle">Rectangle</option>
                    <option value="Circle">Circle</option>
                  </select>

                  <label>Xpos: </label>
                  <input type="number" value={item.x} className='XYpos' onChange={(e) => updateItem(item.id, 'x', Number(e.target.value))} />

                  <label>Ypos: </label>
                  <input type="number" value={item.y} className='XYpos' onChange={(e) => updateItem(item.id, 'y', Number(e.target.value))} />

                  <label>Current color {item.color}: </label>
                  <input type="color" value={item.color} onChange={(e) => updateItem(item.id, 'color', e.target.value)} />

                  <label>Width: </label>
                  <input type="number" value={item.width} className='XYpos' onChange={(e) => updateItem(item.id, 'width', Number(e.target.value))} />

                  <label>Height: </label>
                  <input type="number" value={item.height} className='XYpos' onChange={(e) => updateItem(item.id, 'height', Number(e.target.value))} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div id='frame'>
          {items.map(item => (
            <div key={item.id} className={item.shape} style={{ position: 'absolute', top: item.y, left: item.x, backgroundColor: item.color, height: item.height, width: item.width }}></div>
          ))}
        </div>
      </main>
      <footer>
        <div id='result'>
          <code>
            {codeResult.join("\n")}
          </code>
        </div>
      </footer>
    </>
  );
}

export default App;
