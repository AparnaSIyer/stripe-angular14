import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';
import { CheckoutService } from './services/checkout.service';
import { loadStripe } from '@stripe/stripe-js'; // this is typescript

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'stripe-angular14-integration';
  stripe: any;
  paymentHandler:any = null;
  success: boolean = false;
  failure:boolean = false;
  stripePromise;

  constructor(public fns:AngularFireFunctions,public checkout:CheckoutService){
    this.stripePromise = loadStripe('pk_test_51LTELgSE9qohiq2jFpVjWzPi5co6eSgl1ThCsICp519GzpKu23MhfMELAb6LzboXxEAGwsoSG7CzLUebmQn0el3K00dRhFxYou')  
  }
  async ngOnInit(){
    // this.stripe = await loadStripe(environment.stripe.key);
    this.invokeStripe();

    
    // const  elements  = this.stripe.elements();

    // const style = {
    //   base: {
    //     color: '#32325d',
    //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //     fontSmoothing: 'antialiased',
    //     fontSize: (window.innerWidth <= 500) ? '12px' : '16px',
    //     '::placeholder': {
    //       color: '#aab7c4'
    //     }
    //   },
    //   invalid: {
    //     color: '#fa755a',
    //     iconColor: '#fa755a'
    //   }
    // };

    // const card = elements.create('card',{ style });

    // card.mount('#card-element');
    // card.on('change', (event: any)=>{
    //   let cardErrorBlock = document.getElementById('card-errors');
    //   if(event.error){  
    //     if(cardErrorBlock)
    //       cardErrorBlock.textContent = event.error.message;
    //   } else{
    //     if(cardErrorBlock)
    //     cardErrorBlock.textContent = '';
    //   }
    // });

    // const button =  document.getElementById('button');
    // if(button){
    //   button.addEventListener('click',(event)=>{
    //     let ownerInfo = {
    //       owner:{
    //         name:'user'
    //       },
    //       amount:20,
    //       currency:'usd'
    //     }
    //     this.stripe.createSource(card,ownerInfo).then((res: any)=>{
    //       let cardErrorBlock = document.getElementById('card-errors');
    //       if(res.error){
    //         if(cardErrorBlock){
    //           cardErrorBlock.textContent = res.error.message;
    //         }
    //       } else{
    //         if(cardErrorBlock){
    //           cardErrorBlock.textContent = '';
    //         }
    //         this.stripeSourceHandler(res.source);
    //       }
    //     })
    //   })
    // }
  }

  stripeSourceHandler(source: any){
    let callable = this.fns.httpsCallable('stripeChargeCall');
    let paymentResult = callable(source);
    paymentResult.subscribe(paymentResponseObejct=>{
      if(paymentResponseObejct.result === 'SUCCESSFUL'){
        document.getElementsByClassName('text')[0].innerHTML = 'Paid for flower successfull. Thanks. You will be delivered your order soon.'
      } else{
        document.getElementsByClassName('text')[0].innerHTML = 'Oops! Something went wrong'

      }
    })
  }

  async makePayment(amount: any) {
    const stripe = await this.stripePromise;
    if(stripe){
      console.log(window.location.href,"window.location.href");
      
      const { error } = await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems: [{ price: 'price_1LUgYeSE9qohiq2jpZkJOikr', quantity: 2 }],
        billingAddressCollection:'auto',
        successUrl: `http://localhost:43217/success`,
        cancelUrl: `http://localhost:43217/failure`,
      });
  
      if (error) {
        console.log(error);
      }
    }
   
    // const paymentHandler = (<any>window).StripeCheckout.configure({
    //   key: 'pk_test_51LTELgSE9qohiq2jFpVjWzPi5co6eSgl1ThCsICp519GzpKu23MhfMELAb6LzboXxEAGwsoSG7CzLUebmQn0el3K00dRhFxYou',
    //   locale: 'auto',
    //   token: function (stripeToken: any) {
    //     console.log(stripeToken);
    //     paymentstripe(stripeToken)
    //     alert('Stripe token generated!');
    //   },
    //   });

    //   paymentHandler.open({
    //     name: 'Positronx',
    //     description: '3 widgets',
    //     amount: amount * 100,
    //   });


    // const paymentstripe = (stripeToken: any) => {
    //   this.checkout.makePayment(stripeToken).subscribe((data: any) => {
    //     console.log(data);
    //     if (data.data === "success") {
    //       this.success = true
    //     }
    //     else {
    //       this.failure = true
    //     }
    //   });
    // };

    }
  invokeStripe() {  
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LTELgSE9qohiq2jFpVjWzPi5co6eSgl1ThCsICp519GzpKu23MhfMELAb6LzboXxEAGwsoSG7CzLUebmQn0el3K00dRhFxYou',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

}
