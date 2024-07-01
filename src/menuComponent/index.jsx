import { useEffect, useMemo, useState } from "react";
import "./index.css";

export default function MenuComponent({ menuItem = [] }) {
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

    setMenuItem(updateIsOpenRecursively(data));
  }

  const initializedMenuItems = useMemo(() => addIsOpen(menuItem), [menuItem]);

  useEffect(() => {
    if (!_menuItem.length) {
      const dataWithIsOpen = addIsOpen(menuItem);
      setMenuItem(dataWithIsOpen);
    }
  }, [_menuItem, initializedMenuItems]);

  function handleSubMenu(item) {
    if (!!item?.subMenu) {
      setMenuItem(updateIsOpen(_menuItem, item.id));
      return;
    }
    return alert("Item sem submenu");
  }

  return (
    <div className="container">
      <div className="menu-dropdown">
        {_menuItem.map((item) => (
          <div key={item.id}>
            <button className="menu-item" onClick={() => handleSubMenu(item)}>
              {item.description}
            </button>
            {item.isOpen && item.subMenu && (
              <div className="submenu">
                {item.subMenu.map((subItem) => (
                  <div key={subItem.id} className="submenu-item">
                    <button onClick={() => handleSubMenu(subItem)}>
                      {subItem.description || `Submenu ${subItem.id}`}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
