export const addIsOpen = (data) => {
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
};

export const updateIsOpen = (data, id) => {
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
        subMenu: updateIsOpen(item.subMenu, id),
      };
    }

    return item;
  });
  return updateIsData;
};

export const handleSubMenu = (item) => {
  if (!!item?.subMenu) {
    toggleIsOpen(item.id);
  } else {
    alert("Item sem submenu");
  }
};

export const hasSubMenuWithSubMenu = (subMenu) => {
  return subMenu.some((item) => item.subMenu && item.subMenu.length > 0);
};

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
