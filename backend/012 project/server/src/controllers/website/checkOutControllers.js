const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const chekOut = async (req, res)=>{
    try{
        console.log(req.body.cart.data);
        const lineItems = req.body.cart.data.map((data)=>(
            {
                "price_data": {
                    "currency": "inr",
                    "unit_amount": data.price,
                    "product_data": {
                        "name": data.product.name,
                        "images": ['https://media.istockphoto.com/id/523761634/photo/cute-panda-bear-climbing-in-tree.jpg?s=612x612&w=0&k=20&c=TxsmORsbuY1LpxQsc6T8fpWJo7lBwncciYhroAr8rXI=']
                    }
                },
                "quantity": data.quentity
            }
        ));

        // const customer = 

        res.status(200).json({message:'success'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    chekOut
}