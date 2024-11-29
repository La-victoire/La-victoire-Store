
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
// remember o sort out this category page
const Categories = ({products}) => {
  const { category } = useParams();
  const filteredProducts = products.filter((product) => product.category === category);
  return (
    <>
    <div>

    </div>
    </>
  )
}

export default Categories