import { InsertPhoto } from "@mui/icons-material";
import {Box, Paper, Rating, Typography, useMediaQuery} from "@mui/material"
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IMAGE_SERVER_BASE_URL, SPRING_BOOT_BASE_URL } from "../../constants";


const AssociatedProductCard = ({product}) =>{
    const isDesktop  = useMediaQuery('(min-width:1200px)');
    const router = useRouter();
    const handleGoToAssociatedProductPage = ()=>{
        router.push(`/product/${product.id}`);
    }

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
                },
                cursor : "pointer"
            }}
            onClick={handleGoToAssociatedProductPage}
        >
            {product.images.length >= 1 ?
            
                (<Box
                    sx={{
                        height : "60%",
                        display : "flex",
                        justifyContent : "center",
                        m : "8px",
                        padding : "6px",
                        border : "0.4px solid grey",
                    }}
                >
                    <img
                        style={{
                          height : "100%",  
                        }}
                    src={`${IMAGE_SERVER_BASE_URL}${product.images[0]["url"]}`}/>
                </Box>
                ):(

                <Box
                    sx={{
                        height : "60%",
                        display : "flex",
                        justifyContent : "center",
                        background: grey[300],
                        m : "8px",
                        padding : "6px",
                    }}
                >
                    <InsertPhoto
                    sx={{
                        color: grey[400],
                        height: "85%",
                        width: "85%",
                    }}
                    />
                </Box>
                )
            }
            <Box
                sx={{
                    
                    "& .MuiRating-readyOnly": {
                        fontSize: {
                          lg: "34px",
                          md: "30px",
                          xs: "32px",
                        },
                        display : "flex",
                        justifyContent : "center",
                      },
                }}
            >

            <Rating
                value={product.rating}
                precision={0.5}
                readOnly
                sx={{
                    "& .MuiRating-decimal":{
                        fontSize : {
                            md : "32px",
                            xs : "22px",
                        }
                    }
                }}
              />
              <Typography
                variant="h2"
                textAlign="center"
                sx={{
                fontSize: {
                    xs: "15px",
                    md: "18px",
                },
                m : {
                    md : "7px 8px",
                    xs : "7px 8px",
                },
                fontWeight: "600",
                fontFamily: "Trebuchet Ms",
                }}
              >
                {product.name}
              </Typography>
            </Box>

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
    },[productIds])
    return(
        <>
        <Box
            sx={{
                p: "10px",
                px: {
                    lg: "30px",
                    md: "16px",
                    xs: "25px",
                },
                mb : "20px",
                bgcolor : grey[200],
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
                        <AssociatedProductCard key={index} product={product}/>
                    ))}
                </Box>
            </Box>
        </Box>
        </>
    )
}

export default AssociatedProduct;