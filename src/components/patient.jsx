import { Button,Form,Message } from "semantic-ui-react";
import content from "../ethereum/ether";
import { useState } from "react";
import { ethers } from "ethers";

const Patient = () => {
  const [input, setInput] = useState("");
  const [patientIdValue,setPatientIdValue] =useState();
  const [patientId,setPatientId] =useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);


  const [response1,setResponse1] = useState();
  const [response2,setResponse2] = useState();

  const inputHandler=async (event)=>{
    event.preventDefault();

    setMessage(null);
    setLoading(true);
    try {
    const accounts = await content.provider.getSigner().getAddress();
        const temp = await content.contract.methods.viewRecords(patientId).send({
            from: accounts[0],
          });
     setResponse1( e=>{
        return e =temp;
     });
    }catch (err) {
      setMessage(err.message);
    }
    setLoading(false);

  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setMessage(null);
    setLoading(true);

    try {
      const accounts = await content.provider.getSigner().getAddress();
        const temp =await content.contract.methods.transferAmount(patientIdValue).send({
            from: accounts[0],
            value: ethers.utils.parseEther(input),
          })
     setResponse2(e=>{return e= temp});
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
    setInput();
    setPatientIdValue();

  };
  return (
    <div>

      <h1>This part is used by users</h1>
      <p>To fetch their details</p>
      <Form onSubmit={inputHandler} error={!!message}>
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
        <Button loading={loading} primary>
          Get data
        </Button>
        <Message error header={"oops!"} content={message} />
      </Form>
      <hr/>
      <br></br>
      <hr/>
    <p>To pay the transaciton</p>
      <Form onSubmit={submitHandler} error={!!message}>
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
        <Button loading={loading} primary>
          Pay Now
        </Button>
        <Message error header={"oops!"} content={message} />
      </Form>
    </div>
  );
};

export default Patient;
