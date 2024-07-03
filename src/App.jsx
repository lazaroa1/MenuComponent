import { useState } from "react";
import { MenuComponent } from "./components/menuComponent";
import "./App.css";

const MENU_ITEM = [
  {
    id: 1,
    description: "Nome do botão",
    subMenu: [
      {
        id: 2,
        description: "Link da avaliação",
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
      <button onClick={() => setIsOpen(!isOpen)}>
        Chamando o menu component
      </button>
      {isOpen && <MenuComponent menuOptions={MENU_ITEM} />}
    </div>
  );
}

export default App;
