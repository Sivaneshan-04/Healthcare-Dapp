// import { useState } from 'react';
import './App.css';
// import { Button,Form,Message } from "semantic-ui-react";
// import contract from "./ethereum/ether";
// import { ethers } from 'ethers';

import Admin from './components/admin';
import Patient from './components/patient';

function App() {

//   const [integer , setInteger] = useState(0);
//   const [loading, setLoading]= useState(false);
//   const [message, setMessage] = useState(null);

//   const submitHandler = async(event)=>{
//     event.preventDefault();

//     setMessage(null);
//     setLoading(true);

//     try{         
//         
//         const temp =await contract.returnIt(integer);  
//         console.log(temp);
//         // setInteger((e)=>{
//         //   return e=temp;
//         // }) 
//     }catch(err){
//         setMessage(err.message);
//         console.log('err came from herer');
//     }
//     setLoading(false);

// };
  
  return (
    <div className="App">
      <Admin />
      <br />
      <hr/>
      <br />
      <hr/>
      <Patient />

      {/* <p>this is home page</p>
      <Form onSubmit={submitHandler} error={!!message}>
      <Form.Field>
          <label>ID</label>
          <input
            placeholder="PatientID"
            value={integer}
            onChange={(event) => {
              setInteger((e) => {
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
            <p>This is the world famous integer i am waiting for{integer}</p> */}
    </div>
  );  
}

export default App;
