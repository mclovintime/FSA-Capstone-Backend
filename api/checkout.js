const express = require('express');
const { default: Stripe } = require('stripe');
const checkoutRouter = express.Router();

checkoutRouter.post("/payment", (req, res) => {

    const {product, token} = req.body;
    console.log('product', product);
    console.log('price', product.price);
    const idempontencyKey = uuid();

    return Stripe.custumors.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        Stripe.charges.create({
            amount: product.price *100,
            currency: 'usd',
            customer: customer.id,
            recipient_email: token.email,
            description: `purchase of product.name`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }

        }, {idempontencyKey})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})



module.exports = checkoutRouter