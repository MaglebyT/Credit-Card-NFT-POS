import { CheckoutWithCard, useEmbeddedWalletUserEmail } from "@thirdweb-dev/react";
import { useState } from "react";
import { CONTRACT_ID } from "../lib/constants";

type PaymentProps = {
    address: string;
    isModalOpen: (results: boolean) => void;
};

const Payment: React.FC<PaymentProps> = ({ address, isModalOpen }) => {
    const [isPaymentComplete, setIsPaymentComplete] = useState(false); 

    const email = useEmbeddedWalletUserEmail();

    return(
        <div
        style={{
            position: "fixed",
            top: 0, 
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
        }}
            onClick={() => {
                isModalOpen(false);
            }}
        >
            {isPaymentComplete ? (
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "whitesmoke",
                    padding: "2cm",
                    borderRadius: 6,
                    boxShadow: "5px, 5px, 10px, rgba(0, 0, 0, 0.1)",
                }}>
                    <h1>Payment Successful!</h1>
                    <button
                        onClick={() => {
                            isModalOpen(false);
                        }}
                        style={{
                            width: "100%",
                            borderRadius: 6,
                            border: "none",
                            padding: "1rem",
                            marginBottom: "1rem",
                            cursor: "pointer",
                            backgroundColor: "gray",
                            color: "white",
                        }}
                    >Close</button>

                    </div>
            ) : (
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "whitesmoke",
                    padding: "2rem",
                    borderRadius: 6,
                    boxShadow: "5px, 5px, 10px, rgba(0, 0, 0, 0.1)",
                }}>
                    <button
                        onClick={() => {
                            isModalOpen(false);
                        }}
                        style={{
                            width: "100%",
                            borderRadius: 6,
                            border: "none",
                            padding: "1rem",
                            marginBottom: "1rem",
                            cursor: "pointer",
                            backgroundColor: "gray",
                            color: "white",
                        }}
                    >Close</button>
                    <CheckoutWithCard
                        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
                        configs={{
                            contractId: CONTRACT_ID,
                            walletAddress: address,
                            email: email.data,
                        }}
                        onPaymentSuccess={(result) => {
                            setIsPaymentComplete(true)
                        }}
                        onError={(error) => {
                            console.log(error); 
                        }}
                        options={{
                            colorBackground: '#fefae0',
	                        colorPrimary: '#606c38',
	                        colorText: '#283618',
	                        borderRadius: 6,
	                        inputBackgroundColor: '#faedcd',
	                        inputBorderColor: '#d4a373',
                        }}
                    />
                 </div>
            )}
        </div>
    )
};

export default Payment;