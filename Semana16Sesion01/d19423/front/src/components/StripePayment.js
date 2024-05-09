import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import Button from "react-bootstrap/Button"; 
import Card from "react-bootstrap/Card"; 
import { loadStripe } from "@stripe/stripe-js"; 

function StripePayment() { 
  const [product, setProduct] = useState({ 
    name: "Curso de IOS 2026", 
    price: 100, 
    productOwner: "Roberto Pineda", 
    description: 
      "Curso de IOS para avanzados", 
    quantity: 1, 
  }); 

  const makePayment = async () => { 
    const stripe = await loadStripe("pk_test_51PDczFK892a8Rl35nn1GIdlVDOWKOxqJT4KBOOkpbKCZ5MSeacpMHZRe8RWDDCUFMjRxXQnxcePk24aLxDDxixv600mU5Tuee2"); 
    const body = { product }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 
 
    const response = await fetch( 
      "http://localhost:8000/api/create-checkout-session", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 
 
    const session = await response.json(); 
 
    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    }); 
    console.log(result);
    if (result.error) { 
      console.log(result.error); 
    } 
  }; 
 
  return ( 
    <Card style={{ width: "20rem" }}> 
      <Card.Img 
        variant="top" src="https://images.pexels.com/photos/12428359/pexels-photo-12428359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      /> 
      <Card.Body> 
        <Card.Title>{product.name}</Card.Title> 
        <Card.Text>{product.description}</Card.Text> 
        <Button variant="primary" onClick={makePayment}> 
          Buy Now for {product.price} 
        </Button> 
      </Card.Body> 
    </Card> 
  ); 
}  
export default StripePayment; 