import { Button, Form, Message } from "semantic-ui-react";
import contract from "../ethereum/ether";
import { useState } from "react";
import { ethers } from "ethers";
import Response from "./response/response";

const Patient = () => {
  const [input, setInput] = useState();
  const [patientIdValue, setPatientIdValue] = useState();
  const [patientId, setPatientId] = useState();

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [message1, setMessage1] = useState(null);
  const [message2, setMessage2] = useState(null);

  const [response1, setResponse1] = useState();
  const [response2, setResponse2] = useState(false);
  const [fetched, setFetched] = useState(false);

  // console.log(contract.signer.getAddress())

  const inputHandler = async (event) => {
    event.preventDefault();

    setFetched(false);
    setMessage1(null);
    setLoading1(true);

    try {
      const temp = await contract.viewRecords(+patientId);
      // console.log(temp);

      setResponse1((e) => {
        return (e = temp);
      });
    } catch (err) {
      setMessage1(err.message);
      console.log(err);
    }
    setLoading1(false);
    setFetched(true);
    setPatientId("");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setMessage2(null);
    setLoading2(true);

    try {
      const temp = await contract.transferAmount(+patientIdValue, {
        value: ethers.utils.parseEther(input),
      });
      console.log(temp);

      const result = await temp.wait();
      console.log(result);

      setResponse2((e) => {
        return (e = true);
      });
    } catch (err) {
      setMessage2(err.message);
    }
    setLoading2(false);
    setInput();
    setPatientIdValue();
  };
  return (
    <div>
      <h1>This part is used by users</h1>
      <h3>To fetch their details</h3>

      <Form onSubmit={inputHandler} error={!!message1}>
        <Form.Field>
          <label>Patient ID</label>
          <input
            placeholder="PatientID"
            value={patientId}
            onChange={(event) => {
              setPatientId((e) => {
                return (e = event.target.value);
              });
            }}
          />
        </Form.Field>
        <Button loading={loading1} primary>
          Get data
        </Button>
        <Message error header={"oops!"} content={message1} />
      </Form>

      {fetched && <Response data={response1} />}
      <hr />
      <br></br>
            
      <h3>To pay the transaciton</h3>
      {response2 && <Message content={"Transaction successful"} />}

      <Form onSubmit={submitHandler} error={!!message2}>
        <Form.Field>
          <label>Patient ID</label>
          <input
            placeholder="PatientID"
            value={patientIdValue}
            onChange={(event) => {
              setPatientIdValue((e) => {
                return (e = event.target.value);
              });
            }}
          />
        </Form.Field>

        <Form.Field>
          <label>Enter amount</label>
          <input
            placeholder="Amount (in ethers)"
            value={input}
            onChange={(event) => {
              setInput((e) => {
                return (e = event.target.value);
              });
            }}
          />
        </Form.Field>
        <Button loading={loading2} primary>
          Pay Now
        </Button>
        <Message error header={"oops!"} content={message2} />
      </Form>
    </div>
  );
};

export default Patient;
