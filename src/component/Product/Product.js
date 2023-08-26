import React from 'react'
import axios from 'axios'
const Product = ({ product }) => {
  return (
    <div onClick={async () => { let res = await axios.get("http://localhost:8080/api/v1/product/" + product._id); console.log(res) }}>{product._id}</div>
  )
}

export default Product