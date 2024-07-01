import MenuComponent from "./menuComponent";
import "./App.css";
import { useState } from "react";

const MENU_ITEM = [
  {
    id: 1,
    description: "Nome do botão",
    subMenu: [
      {
        id: 2,
        subMenu: [
          { id: 3, description: "Enviar por email" },
          { id: 4, description: "Enviar por WhatsApp" },
        ],
      },
    ],
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container">
      <button onClick={() => setIsOpen(!isOpen)}>botao</button>
      {isOpen && <MenuComponent menuItem={MENU_ITEM} />}
    </div>
  );
}

export default App;
