/**
 * action
 * 管理事件类型
 */

export const type = {
  SWITCH_MENU: "switch-menu"
};
export const menuSwitch = menuName => {
  return {
    type: type.SWITCH_MENU,
    menuName
  };
};
