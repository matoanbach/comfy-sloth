import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView"
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products } = useFilterContext();
  return <GridView filtered_products={filtered_products} />;
};

export default ProductList;
