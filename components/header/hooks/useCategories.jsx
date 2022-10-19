import React,{useEffect, useState} from 'react'
import {categories as categoriesData} from "../../../dummy_data/categories";

const useCategories =()=> {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = ()=> {
        setCategories(categoriesData);
    }
    getAllCategories();
  }, [])

  return ({
    categories
  })
  
}

export default useCategories