import axios from "axios";
import { useEffect, useState } from "react"
import { buzzCart } from "../components/body/hooks/useProduct";
import { SPRING_BOOT_BASE_URL } from "../components/constants";

const useAuth = (anonymousAuthSessionId)=>{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const getToken = ()=> {
        return localStorage.getItem('buzzUserToken');
    }
    const setUserTokenInLocalStorage = (token)=>{
        localStorage.setItem('buzzUserToken',token);
    }

    const removeTokenFromLocalStorage = ()=>{
        localStorage.removeItem('buzzUserToken');
    }

    const fetchUserFromToken = ()=> {
        const userToken = getToken();
        if(userToken == null){
            setUser(null);
            setToken(null);
            //anonymous journey -->> fetch/create cart
            console.log("Fetch Cart For anonymous user: "+anonymousAuthSessionId);
            var config = {
                method: 'get',
                url: `${SPRING_BOOT_BASE_URL}/cart/anonymous/${anonymousAuthSessionId}`,
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            axios(config)
            .then(resp => {
                console.log(resp);
            })
            .catch(error=> {
                console.log("error");
            });
        }
        else {
            const data = JSON.stringify({
                "token": userToken
            });

            var config = {
                method: 'post',
                url: `${SPRING_BOOT_BASE_URL}/customer/me`,
                headers: { 
                  'Content-Type': 'application/json'
                },
                data
            };

            axios(config)
                .then(response => {
                    console.log("Got user data :", response.data);
                    performCartMergeOperation(response?.data?.username).then((status)=>{
                        setUser(response.data);
                        setToken(userToken);
                    }).catch(error=>{
                        setUser(response.data);
                        setToken(userToken);
                    })
                    
                })
                .catch(error=> {
                    setUser(null);
                    setToken(null);
                    console.log("error: ",error);
                })
              
        }
    }
    const handleLogout = ()=>{
        removeTokenFromLocalStorage();
        fetchUserFromToken();
    }


    const handleLoginThroughModal = (username, password,setUsername, setPassword, setHelperText, setLoginModalOpen)=> {
        const data = JSON.stringify({
            "username": username,
            "password": password,
        });
        const config = {
            method : "post",
            url : `${SPRING_BOOT_BASE_URL}/customer/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
        axios(config)
        .then(response => {
            setUserTokenInLocalStorage(response.data.authToken);
            fetchUserFromToken();
            setHelperText(null);
            setLoginModalOpen(false);
            setUsername("");
            setPassword("");
            document.getElementById("searchBoxMain").focus();
        })
        .catch(error=> {
            setHelperText("Invalid userame or password !!");

        })
    }

    const getCartDataFromLS = ()=> {
        const cartListJSON = localStorage.getItem(buzzCart);
        if(cartListJSON == null){
            return [];
        }
        var cartList  = [];
        try {
            cartList = JSON.parse(cartListJSON);
            if(cartList == null || !Array.isArray(cartList)) {
                return [];
            }
        }
        catch {
            return [];
        }
        return cartList;
    }

    const removeCartFromLS =()=> {
        localStorage.removeItem(buzzCart);
    }

    const performCartMergeOperation = async(username)=> {
        
        var data = JSON.stringify(getCartDataFromLS());

        if(username != null) {
            console.log("Starting merge cart operation for user: "+username);
            var config = {
                method: 'post',
                url: `${SPRING_BOOT_BASE_URL}/cart/${username}/merge`,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            try {
                await axios(config);
                console.log("Cart Merge done");
                removeCartFromLS(); // delete cart from localstorage
            }
            catch {
                console.log("Error while merging cart.");
                
            }
            return;
        }

    }

    useEffect(() => {
      fetchUserFromToken();
    
    }, [])


    return ({
        user, 
        token,
        setUser,
        setToken,
        handleLoginThroughModal,
        handleLogout
    })
}

export default useAuth;