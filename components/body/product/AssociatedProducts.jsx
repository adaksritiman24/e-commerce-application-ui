import {Box, Paper, Typography} from "@mui/material"
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMAGE_SERVER_BASE_URL, SPRING_BOOT_BASE_URL } from "../../constants";


const AssociatedProductCard = ({product}) =>{
    return (
        <Paper
            elevation={3}
            sx={{
                width : {
                    md : "270px",
                    sm : "220px",
                    xs : "200px",
                    aspectRatio : "4/5",
                },
                m : {
                    md : "11px",
                    xs : "4px",
                }
            }}
        >
            {product.images.length >= 1 && 
            
                <Box
                    sx={{
                        height : "60%",
                        display : "flex",
                        justifyContent : "center",
                        m : "12px",
                    }}
                >
                    <img
                        style={{
                          height : "100%",  
                        }}
                    src={`${IMAGE_SERVER_BASE_URL}${product.images[0]["url"]}`}/>
                </Box>
            }
            {product.name}

        </Paper>
    )
}

const getAssociatedProductsData = (ids, setProducts) => {
    const data = JSON.stringify(ids);
    const config = {
        method: 'post',
        url:   `${SPRING_BOOT_BASE_URL}/products/associated`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

    axios(config)
      .then( response=>{
        setProducts(response.data);
      })
      .catch((error) =>{
        console.log(error);
        setProducts([]);
      });
      
}


const AssociatedProduct = ({
    productIds
}) => {
    const [products, setProducts]= useState([]);
    useEffect(()=>{
        getAssociatedProductsData(productIds, setProducts);
    },[])
    return(
        <>
        <Box
            sx={{
                pt: "10px",
                px: {
                    lg: "30px",
                    md: "16px",
                    xs: "25px",
                },
                mb : "20px",
            }}
        >

            <Typography 
                variant="h2"
                sx={{
                fontSize: {
                    xs: "22px",
                    md: "30px",
                },
                m : {
                    md : "18px",
                    xs : "8px",
                },
                fontWeight: "600",
                fontFamily: "Trebuchet Ms",
                }}
            >
                Associated Products
            </Typography>
            <Box
                sx={{
                    overflow : "scroll",
                    bgcolor : grey[200],
                }}
            >
                <Box
                    sx={{
                        color : "black",
                        width : "max-content",
                        display : "flex",
                    }}
                >
                    {products.map((product, index)=>(
                        <AssociatedProductCard product={product}/>
                    ))}
                </Box>
            </Box>
        </Box>
        </>
    )
}

export default AssociatedProduct;