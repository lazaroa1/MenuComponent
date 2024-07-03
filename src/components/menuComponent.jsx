import { useEffect, useMemo, useState } from "react";
import { addIsOpen, updateIsOpen } from "../hooks";
import { MenuItem } from "./menuItem";
import "./menuComponent.css";

export const MenuComponent = ({ menuOptions = [] }) => {
  const [menuItem, setMenuItem] = useState([]);

  const initializedMenuOptions = useMemo(
    () => addIsOpen(menuOptions),
    [menuOptions]
  );

  useEffect(() => {
    if (!menuItem?.length) {
      setMenuItem(initializedMenuOptions);
    }
  }, [initializedMenuOptions]);

  function handleSubMenu(item) {
    if (!!item?.subMenu) {
      toggleIsOpen(item.id);
    } else {
      alert("Item sem submenu");
    }
  }
  function toggleIsOpen(id) {
    setMenuItem((prevState) => updateIsOpen(prevState, id));
  }

  return (
    <div className="menu-container">
      {menuItem?.map((item) => (
        <MenuItem key={item.id} item={item} onToggle={handleSubMenu} />
      ))}
    </div>
  );
};
