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

    case "REMOVE_ITEM_TO_CART":
      const itemId = action.payload.itemId;
      const itemToRemove = state?.cart?.cartList?.find(el => el?.id===itemId);
      console.log(itemToRemove)

      const noOfItemsRemaining = itemToRemove?.quantity;

      let newCartList = null;
      if(Number(noOfItemsRemaining)>=2) {
        newCartList = state?.cart?.cartList?.map(el => el?.id===itemId ? {...el, quantity: el?.quantity-1} : el)
      } else {
        newCartList = state?.cart?.cartList?.filter(el => el?.id!==itemId);
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          cartList: newCartList,
        }
      }

    case "UPDATE_CARTLIST":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartList: action.payload.cartList,
        }
      }
      break;

    case "DELETE_CART_ITEMS":
      const itemIdListToRemove = action.payload;
      console.log("itemIdListToRemove", itemIdListToRemove)
      const newList = state?.cart?.cartList?.filter(el => !!!itemIdListToRemove?.find(ele => Number(ele)===Number(el?.id)))
      console.log("newList", newList)

      return {
        ...state,
        cart: {
          ...state.cart,
          cartList: newList,
        }
      }
      break;

    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      }
      break;

    default:
      break;
  }
};
