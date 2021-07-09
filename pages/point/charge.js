import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Layout from "../../components/Layout";
import CheckoutForm from "../../components/point/CheckOut";
import { useState } from "react";


const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
  ]
};
const stripePromise = loadStripe("pk_test_51IxpPgDIEssEsRmOCL2twCfr2rvzle2EclL9Vp26vq9aqG0wTwiVhI24s33VOksQXR3taLoZiAMEe3iNmhaQhRIE00iS33eod4");

const Charge = () => {
  return (
    <Layout>
    <div className="w-3/4 md:w-1/2">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm/>
      </Elements>
    </div>
    </Layout>
  );
};

export default Charge;
