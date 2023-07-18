import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";


const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const newItem = {
      id: id + color,
      name: product.name,
      color,
      amount,
      image: product.images[0].url,
      price: product.price,
      stock: product.stock,
    };
    const foundItem = state.cart.find((item) => item.id === id + color);
    if (foundItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          let newAmount = item.amount + amount;
          if (newAmount > item.stock) {
            newAmount = item.stock;
          }
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    }
    return { ...state, cart: [...state.cart, newItem] };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, item) => {
        const { price, amount } = item;
        total.total_items += amount;
        total.total_amount += amount * price;
        return total;
      },
      { total_items: 0, total_amount: 0 }
    );
    return { ...state, total_items, total_amount };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === REMOVE_CART_ITEM) {
    const removeId = action.payload;
    const tempCart = state.cart.filter((item) => item.id !== removeId);
    return { ...state, cart: tempCart };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "increase") {
          let tempAmount = item.amount + 1;
          if (tempAmount > item.stock) {
            tempAmount = item.stock;
          }
          return { ...item, amount: tempAmount };
        } else if (value === "decrease") {
          let tempAmount = item.amount - 1;
          if (tempAmount < 1) {
            tempAmount = 1;
          }
          return { ...item, amount: tempAmount };
        }
        return item;
      }
    });
    return {...state, cart: tempCart}
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
