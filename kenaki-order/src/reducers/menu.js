import { TOGGLE_MENU_MODAL } from "../actions/menuActionTypes";

const defaultMenuState = {
    menuOpen: false,
    itemProps: {
        description: '',
        title: '',
        price: 0.0
    }
}

export default function(state = defaultMenuState, action) {
  switch (action.type) {
    case TOGGLE_MENU_MODAL: {
      const { opened, item_props } = action.payload;
      return {
        ...state,
        menuOpen: opened,
        itemProps: item_props
      };
    }
    default:
      return state;
  }
}
