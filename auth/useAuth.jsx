import axios from "axios";
import { useEffect, useState } from "react"
import { SPRING_BOOT_BASE_URL } from "../components/constants";

const useAuth = ()=>{
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
                    setUser(response.data);
                    setToken(userToken)
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