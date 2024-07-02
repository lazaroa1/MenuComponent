import { useEffect, useMemo, useState } from "react";
import "./index.css";

const MenuItem = ({ item, onToggle, hasSubMenuWithSubMenu }) => {
  const hasSubMenu = item.subMenu && !!item.subMenu.length;
  const isSideMenu = hasSubMenu && hasSubMenuWithSubMenu(item.subMenu);

  return (
    <div className="menu-item-container">
      <button className="menu-item" onClick={() => onToggle(item)}>
        {item.description}
        {hasSubMenu && <span className="arrow">{item.isOpen ? "▲" : "▼"}</span>}
      </button>
      {item.isOpen && item.subMenu && (
        <div
          className={`submenu ${isSideMenu ? "submenu-side" : "submenu-below"}`}
        >
          {item.subMenu.map((subItem) => (
            <MenuItem
              key={subItem.id}
              item={subItem}
              onToggle={onToggle}
              hasSubMenuWithSubMenu={hasSubMenuWithSubMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function MenuComponent({ menuItem = [] }) {
  const [_menuItem, setMenuItem] = useState([]);

  function addIsOpen(data) {
    const itemsWithIsOpen = data.map((item) => {
      if (item.subMenu) {
        return {
          ...item,
          isOpen: false,
          subMenu: addIsOpen(item.subMenu),
        };
      }
      return { ...item };
    });
    return itemsWithIsOpen;
  }

  function updateIsOpen(data, id) {
    const updateIsData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isOpen: !item.isOpen,
          subMenu: !item.isOpen ? closeAllSubMenus(item.subMenu) : item.subMenu,
        };
      }
      if (item.isOpen && item?.subMenu) {
        return {
          ...item,
          // isOpen: false,
          subMenu: updateIsOpen(item.subMenu, id),
        };
      }
      /*
      if (!!item.subMenu) {
        return { ...item, subMenu: updateIsOpen(item.subMenu, id) };
      }
      */
      return item;
    });
    return updateIsData;
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
      toggleIsOpen(item.id);
    } else {
      alert("Item sem submenu");
    }
  }

  function hasSubMenuWithSubMenu(subMenu) {
    return subMenu.some((item) => item.subMenu && item.subMenu.length > 0);
  }

  function toggleIsOpen(id) {
    setMenuItem((prevState) => updateIsOpen(prevState, id));
  }

  function closeAllSubMenus(items) {
    return items?.map((item) => ({
      ...item,
      isOpen: false,
      subMenu: closeAllSubMenus(item.subMenu),
    }));
  }

  function hasSubMenuWithSubMenu(subMenu) {
    return subMenu.some((item) => item.subMenu && item.subMenu.length > 0);
  }

  return (
    <div className="menu-container">
      {_menuItem?.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onToggle={handleSubMenu}
          hasSubMenuWithSubMenu={hasSubMenuWithSubMenu}
        />
      ))}
    </div>
  );
}
