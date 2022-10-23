const StripeCheckout = () => (
  <section>
    <div className="product">
      <div className="description">
        <h3>Stock Purchase</h3>
        <h5>$100.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
);

export default StripeCheckout;
