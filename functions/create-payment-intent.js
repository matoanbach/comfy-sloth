// domain/.netlify/functions/create-payment-intent
// /functions/hello-world.js
exports.handler = async function (event, context) {
  if(event.body){
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    return {
        statusCode: 200,
        body: JSON.stringify(cart),
      };
  }
  return {
    statusCode: 200,
    body: "create payment intent",
  };
};
