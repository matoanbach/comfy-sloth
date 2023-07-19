import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let prices = action.payload.map((item) => item.price);
    let new_max_price = Math.max(...prices);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        price: new_max_price,
        max_price: new_max_price,
      },
    };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    let { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];
    if (text) {
      tempProducts = tempProducts.filter((item) =>
        item.name.toLowerCase().startsWith(text)
      );
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter((item) => item.category === category);
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter((item) => item.company === company);
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((item) => {
        return item.colors.find((c) => c === color);
      });
    }
    tempProducts = tempProducts.filter((item) => item.price <= price);

    if (shipping) {
      tempProducts = tempProducts.filter((item) => item.shipping === true);
    }

    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        company: "all",
        color: "all",
        max_price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
      list_view: false,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
      list_view: true,
    };
  }

  if (action.type === UPDATE_SORT) {
    const { value } = action.payload;
    return {
      ...state,
      sort: value,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        // if(a.price < b.price){
        //   return -1;
        // }
        // if(a.price > b.price) {
        //   return 1;
        // }
        // return 0;
        return a.price - b.price;
      });
      return { ...state, filtered_products: tempProducts };
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => {
        // if(a.price > b.price){
        //   return -1;
        // }
        // if(a.price < b.price) {
        //   return 1;
        // }
        // return 0;
        return b.price - a.price;
      });
      return { ...state, filtered_products: tempProducts };
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return { ...state, filtered_products: tempProducts };
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      return { ...state, filtered_products: tempProducts };
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
