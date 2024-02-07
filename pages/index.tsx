import { ConnectWallet, ContractMetadata, MediaRenderer, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../lib/constants";
import { useState } from "react";
import Payment from "../components/payment";

const Home: NextPage = () => {
  const address = useAddress();

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: contractMetadata } = useContractMetadata(contract); 

  return (
    <div className={styles.container}>
      <ConnectWallet
        modalSize="compact"
      />
      {address && (
        <div style= {{
          position: "relative",
          width: "50%",
          textAlign: "center",
        }}>
          <h1>{contractMetadata?.name}</h1>
          <MediaRenderer
            src={contractMetadata?.image}
            height="250px"
            width="250px"
          />
          <p> {contractMetadata?.description} </p>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              width: "100%",
              borderRadius: 6,
              border: "none",
              padding: "1rem",
              marginBottom: "1rem",
              cursor: "pointer",
              backgroundColor: "blue",
              color: "white",
            }}
          >Buy Now!</button>
          {isModalOpen && (
            <div>
              <Payment
                address={address}
                isModalOpen={(result) => {
                  setIsModalOpen(result); 
                }}
              />
            </div>

          )}
        </div>
      )}
    </div>
    
  );
};

export default Home;
