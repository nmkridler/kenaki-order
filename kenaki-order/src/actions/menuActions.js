import { TOGGLE_MENU_MODAL} from './menuActionTypes'

export const toggleMenuModal = (opened, item_props) => ({
    type: TOGGLE_MENU_MODAL,
    payload: { opened, item_props }
})
