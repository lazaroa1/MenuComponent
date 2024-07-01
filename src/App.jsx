import MenuComponent from "./menuComponent";
import "./App.css";

const MENU_ITEM = [
  {
    id: 1,
    description: "Link da avaliação",
    subMenu: [
      { id: 2, description: "Enviar por email" },
      { id: 3, description: "Enviar por WhatsApp" },
    ],
  },
];

function App() {
  return (
    <div className="container">
      <MenuComponent menuItem={MENU_ITEM} />
    </div>
  );
}

export default App;
