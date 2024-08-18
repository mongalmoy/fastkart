export const globalreducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      const item = action.payload.item;
      const cartlist = state.cart.cartList;
      const foundEl = cartlist.find((el) => el?.id == item?.id);
      if (foundEl) {
        const newList = cartlist?.map((el) =>
          el?.id === item?.id ? {...el, quantity: el.quantity+1} : el
        );
        return {
          ...state,
          cart: {
            ...state.cart,
            cartList: newList,
          },
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            cartList: [...state.cart.cartList, { ...item, quantity: 1 }],
          },
        };
      }
      break;

    default:
      break;
  }
};
