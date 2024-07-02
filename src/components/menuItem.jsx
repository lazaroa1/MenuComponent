export const MenuItem = ({ item, onToggle, hasSubMenuWithSubMenu }) => {
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
