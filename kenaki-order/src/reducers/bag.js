import {
    ADD_TO_BAG,
    REMOVE_FROM_BAG,
    EMPTY_BAG,
    UPDATE_BAG_QUANTITY,
    TOGGLE_BAG_MODAL } from "../actions/menuActionTypes";

const defaultBagState = {
    bag: [],
    bagOpen: false
}

export default function(state = defaultBagState, action) {
  switch (action.type) {
    case TOGGLE_BAG_MODAL: {
        const { opened } = action.payload;
        return {
            ...state,
            bagOpen: opened
        };
    }
    case ADD_TO_BAG: {
        const { contents } = action.payload;
        let updated_bag = [...state.bag];
        updated_bag.push(contents)
        return {
            ...state,
            bag: updated_bag
        };
    }
    case REMOVE_FROM_BAG: {
        const { index } = action.payload;
        let current_bag = [...state.bag]
        current_bag.splice(index, 1)

        return {
            ...state,
            bag: current_bag
        }
    }
    case UPDATE_BAG_QUANTITY: {
        const { index, quantity } = action.payload;

        let current_bag = [...state.bag]
        current_bag[index].quantity = quantity
        return {
            ...state,
            bag: current_bag
        }
    }
    case EMPTY_BAG: {
        return {
            ...state,
            bag: []
        }
    }
    default:
      return state;
  }
}
