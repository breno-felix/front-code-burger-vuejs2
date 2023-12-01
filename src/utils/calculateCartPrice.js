const calculateCartPrice = (cartProducts) => {
    return cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);
};

export default calculateCartPrice