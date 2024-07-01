import { useMemo, useState } from "react";
import "./index.css";

export default function MenuComponent({ menuItem = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [_menuItem, setMenuItem] = useState([]);

  function addIsOpen(data) {
    const addIsOpenRecursively = (items) => {
      const itemsWithIsOpen = items.map((item) => {
        if (item.subMenu) {
          return {
            ...item,
            isOpen: false,
            subMenu: addIsOpenRecursively(item.subMenu),
          };
        }
        return { ...item };
      });
      return itemsWithIsOpen;
    };

    return addIsOpenRecursively(data);
  }

  function updateIsOpen(data, id) {
    const updateIsOpenRecursively = (items) => {
      const updateIsData = items.map((item) => {
        if (item.id === id) {
          return { ...item, isOpen: !item.isOpen };
        }
        if (!!item.subMenu) {
          return { ...item, subMenu: updateIsOpenRecursively(item.subMenu) };
        }

        return item;
      });

      return updateIsData;
    };
    const teste = updateIsOpenRecursively(data);
    console.log("teste ➡️", JSON.stringify(teste, null, 2));
    setMenuItem(updateIsOpenRecursively(data));
  }

  useMemo(() => {
    const dataWithIsOpen = addIsOpen(menuItem);
    setMenuItem(dataWithIsOpen);
  }, [menuItem]);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleSubMenu(item) {
    if (!!item?.subMenu) {
      setMenuItem(updateIsOpen(_menuItem, item.id));
      return;
    }

    return alert("Item sem submenu");
  }

  return (
    <div className="container">
      <button onClick={toggleMenu} className="menu-button">
        Nome do botão
      </button>
      {isOpen && (
        <div className="menu-dropdown">
          {_menuItem?.map((item) => (
            <button
              className="menu-item"
              key={item.id}
              onClick={() => handleSubMenu(item)}
            >
              {item.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
