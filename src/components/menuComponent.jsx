import { useEffect, useMemo } from "react";

export const MenuComponent = () => {
  const initializedMenuItems = useMemo(() => addIsOpen(menuItem), [menuItem]);

  useEffect(() => {
    if (!_menuItem?.length) {
      const dataWithIsOpen = addIsOpen(menuItem);
      setMenuItem(dataWithIsOpen);
    }
  }, [initializedMenuItems]);

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
};
