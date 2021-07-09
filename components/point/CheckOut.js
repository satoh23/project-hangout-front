import React, { useState } from "react";
import {
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";


const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#ffc4fa"
      },
      "::placeholder": {
        color: "#ffc4fa"
      }
    },
    invalid: {
      iconColor: "#fa0000",
      color: "#fa0000"
    }
  }
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

export default function CheckoutForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
  });
  const [amount, setAmount] = useState(500)
  let email = ""

  const handleSubmit = async (event) => {
    event.preventDefault();
    let haveValidToken = false

    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    }).then((res)=>{
      if (res.ok){
        haveValidToken=true
      } else{
        alert("先にログインしてください")
        router.push("/")
      }
    })
      if (haveValidToken){
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/email-get/`,
        {
          method: "GET",
          headers: {"Content-Type": "application/json",},
          credentials: "include"
        }
      ).then((res)=>{
        return res.json()
      })
      .then((res)=>{
        email=res.email
      })}
    } catch(err){
      console.log(err)
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {email: email, name: billingDetails.name}
    });

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
      try{
        await fetch(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/save-stripe-info/`,
          {
            method: "POST",
            body: JSON.stringify({ payment_method_id: payload.paymentMethod.id, 
                                   email: email, name: billingDetails.name, amount: amount}),
            headers: {"Content-Type": "application/json",},
            credentials: "include"
          }
        )
        .then((res)=>{
          return res.json()
        })
        .then((res)=>{
          console.log(res)
        })
      } catch(err){
        console.log(err)
      }
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      name: ""
    });
  };

  const amountList = () => {
      return (
        <div className="w-full bg-pink-50 border border-pink-100 rounded-md pt-4 pb-4 mb-4 shadow-md text-center">
            <div className="text-center font-bold text-lg mb-2">○チャージ金額○</div>
            {amount===500 ? <span className="bg-pink-300 rounded-md shadow-md p-1 m-1 font-bold border-2 border-pink-400">500円</span>
                          : <button onClick={()=>{setAmount(500)}} className="bg-pink-200 rounded-md shadow-md p-1 m-1">500円</button>}

            {amount===1000 ? <span className="bg-pink-300 rounded-md shadow-md p-1 m-1 font-bold border-2 border-pink-400">1,000円</span>
                          : <button onClick={()=>{setAmount(1000)}} className="bg-pink-200 rounded-md shadow-md p-1 m-1">1,000円</button>}

            {amount===3000 ? <span className="bg-pink-300 rounded-md shadow-md p-1 m-1 font-bold border-2 border-pink-400">3,000円</span>
                          : <button onClick={()=>{setAmount(3000)}} className="bg-pink-200 rounded-md shadow-md p-1 m-1">3,000円</button>}

            {amount===5000 ? <span className="bg-pink-300 rounded-md shadow-md p-1 m-1 font-bold border-2 border-pink-400">5,000円</span>
                          : <button onClick={()=>{setAmount(5000)}} className="bg-pink-200 rounded-md shadow-md p-1 m-1">5,000円</button>}
            
            {amount===10000 ? <span className="bg-pink-300 rounded-md shadow-md p-1 m-1 font-bold border-2 border-pink-400">10,000円</span>
                          : <button onClick={()=>{setAmount(10000)}} className="bg-pink-200 rounded-md shadow-md p-1 m-1">10,000円</button>}

            {amount===20000 ? <span className="bg-pink-300 rounded-md shadow-md p-1 m-1 font-bold border-2 border-pink-400">20,000円</span>
                          : <button onClick={()=>{setAmount(20000)}} className="bg-pink-200 rounded-md shadow-md p-1 m-1">20,000円</button>}

            {amount===50000 ? <span className="bg-pink-300 rounded-md shadow-md p-1 m-1 font-bold border-2 border-pink-400">50,000円</span>
                          : <button onClick={()=>{setAmount(50000)}} className="bg-pink-200 rounded-md shadow-md p-1 m-1">50,000円</button>}
        </div>
      )
  }

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        支払いが完了しました
      </div>
      <div className="ResultMessage">
        チャージ画面に戻る場合は下のボタンを押してください
      </div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <div>
    {amountList()}
    <form className="w-full bg-pink-50 border border-pink-100 rounded-md pt-4 pb-4 shadow-md" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <Field
          label="名義"
          id="name"
          type="text"
          placeholder="HANG TAROU"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        決済する
      </SubmitButton>
    </form>
    <div className="mt-2 text-sm text-gray-500">※1.決済には外部決済サービスを使用しています</div>
    <div className="mt-1 text-sm text-gray-500">※2.決済には別途手数料がかかります(手数料3.8%)</div>
    <div className="mt-1 text-sm text-gray-500">※3.ポイントは1円＝1Pになります</div>
    </div>
  );
};