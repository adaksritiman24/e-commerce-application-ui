export const getTotalCartItemsFromLS = ()=> {
    try{
        const cartJSON = localStorage.getItem("buzzCart");
        if(cartJSON === null  || cartJSON === undefined) return 0;
        const cartData = JSON.parse(cartJSON);
        return cartData.length;
    }
    catch(error) {
        return 0;
    }
}
