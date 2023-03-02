import React, { useContext, useState } from "react";
import "./dashboard.css";
// INTERNAL IMPORT
import { HealthContext } from "../Context/HealthCareContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./Modal";
import Modal from "react-bootstrap/Modal";
import "./Navbar.css";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

const Dash = () => {
  const {
    onlycolabName,
    onlyaddresses,
    onlypercentage,
    onlytotalRevenue,
    onlyyourAmount,
    nftcolabName,
    nftaddresses,
    nftpercentage,
    nfttotalRevenue,
    nftyourAmount,
    totalMints,
    tokenIdCounter,
    Splitting,
    Splittings,
    // qrimage,
    qradd,
    qraddds,
  } = useContext(HealthContext);

  const [modalShow, setModalShow] = useState(false);

  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const applyAccessConditions = async (e) => {
    // CID on which you are applying encryption
    // CID is generated by uploading a file with encryption
    // Only the owner of the file can apply access conditions
    const cid = "QmUQ7MMS61W2NWFz2XG8QiDL3v9f1P5L6yP8W7LtT32WJb";

    // Conditions to add
    const conditions = [
      {
        id: 1,
        chain: "Shardeum_Lib1",
        method: "balanceOf",
        standardContractType: "ERC721",
        contractAddress: "0x6f492F20a469CE66cBa0f341c21A2c173237A082",
        returnValueTest: { comparator: ">=", value: "1" },
        parameters: [":userAddress"],
      },
    ];

    // Aggregator is what kind of operation to apply to access conditions
    // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
    const aggregator = "([1])";
    const { publicKey, signedMessage } = await encryptionSignature();

    /*
      accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
        Parameters:
          publicKey: owners public key
          CID: CID of file to decrypt
          signedMessage: message signed by owner of publicKey
          conditions: should be in format like above
          aggregator: aggregator to apply on conditions
    */
    const response = await lighthouse.accessCondition(
      publicKey,
      cid,
      signedMessage,
      conditions,
      aggregator
    );

    console.log(response.data.cid);
    /*
      {
        data: {
          cid: "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh",
          status: "Success"
        }
      }
    */
  };

  return (
    <main className="main">
      <div className="responsive-wrapper">
        <div className="main-header">
          <h1>Recent Contracts</h1>
        </div>

        <div className="content">
          <div className="content-main">
            <div className="card-grid">
              <article className="card">
                <div className="card-header">
                  <div className="divbox">
                    {/* <span><img src="https://th.bing.com/th/id/OIP.LUG6AerNQHqaJHk0ft87OAHaEo?w=285&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" /></span> */}
                    <h4 className="address">Address</h4>
                    {/* <img src={qrimage} alt="qr" /> */}
                    <MyVerticallyCenteredModal
                      // qr={qrimage}
                      qradd={qradd}
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <div className="btnadd">
                      <Button
                        variant="primary"
                        onClick={() => setModalShow(true)}
                      >
                        QR
                      </Button>
                    </div>
                  </div>
                </div>
                  <div className="card-header bg-transparent border-success">
                <div className="address">
                    Colab with {onlycolabName}
                  </div>
                </div>
                <div className="card-body text-success">
                  <div className="address">
                    <h5 className="card-title">
                      Address: {onlyaddresses[0]}, {onlyaddresses[1]}
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Your Percentage: {onlypercentage[0]}
                      {onlypercentage[1]}%
                    </li>
                    <li className="list-group-item">
                      Total Revenue: {onlytotalRevenue} ETH
                    </li>
                    <li className="list-group-item">
                      Starts From ....... & Ends on ......
                    </li>
                  </ul>
                </div>{" "}
                <div className="card-footer bg-transparent border-success jj">
                  {" "}
                  Your Amount: {onlyyourAmount} ETH
                </div>
                <div className="card-footer">
                  <button className="df" onClick={() => Splitting()}>
                    Split Funds
                  </button>
                </div>
              </article>
              <article className="card">
                <div className="card-header">
                  <div className="divbox">
                    {/* <span><img src="https://th.bing.com/th/id/OIP.LUG6AerNQHqaJHk0ft87OAHaEo?w=285&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" /></span> */}
                    <h3 className="address">Address</h3>
                    {/* <img src={qrimage} alt="qr" />
                    <h5>0x277EbD1a3878C2800794477047f73e31513aee0c</h5> */}

                    <MyVerticallyCenteredModal
                      // qr={qrimage}
                      qradd= {qraddds}
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <div className="btnadd">
                      <Button
                        variant="primary"
                        onClick={() => setModalShow(true)}
                      >
                        QR
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="card-header bg-transparent border-success">
                  <div className="address">
                  Colab with {nftcolabName}
                </div>
                </div>
                <div className="card-body text-success">
                  <div className="address">
                  <h5 className="card-title">
                    Address: {nftaddresses[0]}, {nftaddresses[1]}
                  </h5></div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Your Percentage: {nftpercentage[0]}
                      {nftpercentage[1]}%
                    </li>
                    <li className="list-group-item">
                      Total Revenue: {nfttotalRevenue} ETH
                    </li>
                    <li className="list-group-item">
                      {" "}
                      Minted NFTs: {tokenIdCounter} Out of Total Mint Available:{" "}
                      {totalMints}
                    </li>
                    <li className="list-group-item">
                      Starts From ....... & Ends on ......
                    </li>
                  </ul>
                </div>
                <div className="card-footer bg-transparent border-success jj">
                  {" "}
                  Your Amount: {nftyourAmount} ETH
                </div>

                <div className="card-footer">
                  <button className="df" onClick={() => Splittings()}>
                    Split Funds
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="btt">
          <Link to="/onlycollab">
            <button className="btnn"> Create New </button>
          </Link>
          <Link to="/collabNFT">
            {" "}
            <button className="btnn">Collab with NFT collection</button>
          </Link>
          <button className="btnn" onClick={() => {applyAccessConditions()}}>Access Control</button>
        </div>
        <div className="main-header">
          <h1>Collection : </h1>
        </div>
      </div>
    </main>
  );
};

export default Dash;