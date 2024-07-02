import { useEffect, useMemo, useState } from "react";
import "./index.css";

const MenuItem = ({ item, onToggle }) => {
  return (
    <div>
      <button className="menu-item" onClick={() => onToggle(item)}>
        {item.description}
      </button>
      {item.isOpen && item.subMenu && (
        <div className="submenu">
          {item.subMenu.map((subItem) => (
            <MenuItem key={subItem.id} item={subItem} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

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
    if (!_menuItem?.length) {
      const dataWithIsOpen = addIsOpen(menuItem);
      setMenuItem(dataWithIsOpen);
    }
  }, [initializedMenuItems]);

  function handleSubMenu(item) {
    if (!!item?.subMenu) {
      updateIsOpen(_menuItem, item.id);
    } else {
      alert("Item sem submenu");
    }
  }

  return (
    <div className="container">
      <div className="menu-dropdown">
        {_menuItem?.map((item) => (
          <MenuItem key={item.id} item={item} onToggle={handleSubMenu} />
        ))}
      </div>
    </div>
  );
}
