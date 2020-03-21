import {
    TOGGLE_MENU_MODAL,
    TOGGLE_BAG_MODAL,
    ADD_TO_BAG,
    REMOVE_FROM_BAG,
    UPDATE_BAG_QUANTITY,
    EMPTY_BAG
} from './menuActionTypes'

export const toggleMenuModal = (opened, item_props) => ({
    type: TOGGLE_MENU_MODAL,
    payload: { opened, item_props }
})

export const toggleBagModal = (opened) => ({
    type: TOGGLE_BAG_MODAL,
    payload: { opened }
})

export const addToBag = (contents) => ({
    type: ADD_TO_BAG,
    payload: { contents }
})

export const removeFromBag = (index) => ({
    type: REMOVE_FROM_BAG,
    payload: { index }
})

export const updateBagQuantity = (index, quantity) => ({
    type: UPDATE_BAG_QUANTITY,
    payload: { index, quantity }
})

export const emptyBag = () => ({
    type: EMPTY_BAG
})
