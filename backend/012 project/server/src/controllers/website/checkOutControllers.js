const stripe = require('stripe')('sk_test_51LiyTNSH4QsKt7gAYWZpIajuDuTSeWPEHeErouhsUMtjITkHYE1cLM96gn6LvqicLVyyuy0D32wz2IK60S74ERLy00xyqVFrDo');

const chekOut = async (req, res)=>{
    try{
        console.log(req.body);
        const lineItems = req.body.cart.data.map((data)=>(
            {
                "price_data": {
                    "currency": "inr",
                    "unit_amount": data.product.price * 100,
                    "product_data": {
                        "name": data.product.name,
                        "images": ['https://media.istockphoto.com/id/523761634/photo/cute-panda-bear-climbing-in-tree.jpg?s=612x612&w=0&k=20&c=TxsmORsbuY1LpxQsc6T8fpWJo7lBwncciYhroAr8rXI=']
                    }
                },
                "quantity": data.quentity
            }
        ));

        console.log('user', {
            name: req.body.address.firstname,
            address:{
                line1: req.body.address.line1,
                line2: req.body.address.line2,
                city:  req.body.address.city,
                state: req.body.address.state,
                country: 'in',
                postal_code: req.body.address.postal_code
            }
        })

        const customer = await stripe.customers.create({
            name: req.body.address.firstname,
            address:{
                line1: req.body.address.line1,
                line2: req.body.address.line2,
                city:  req.body.address.city,
                state: req.body.address.state,
                country: 'in',
                postal_code: req.body.address.postal_code
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer: customer.id
        });

        res.status(200).json({message:'success', session:session.id});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    chekOut
}