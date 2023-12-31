import { Button, Form ,Message} from "semantic-ui-react";
import { useState } from "react";
import contract from '../ethereum/ether';

const Admin = () => {
    const [loading, setLoading]= useState(false);
    const [message, setMessage] = useState(null);

    const [patientIdValue,setPatientIdValue] = useState();
    const [patientNameValue,setPatientNameValue] = useState('');
    const [genderValue,setGenderValue] = useState('');
    const [heightValue,setHeightValue] = useState();
    const [weightValue,setWeightValue] = useState();
    const [disease,setDisease] = useState('');
    const [billValue,setBillValue] = useState();
    const [billStatus,setBillStatus] = useState();
    const [dischargeStatus,setDischargeStatus] = useState();

    const submitHandler = async(event)=>{
        event.preventDefault();

        setMessage(null);
        setLoading(true);

        try{         
            await contract.storeDetails(
                patientIdValue,       
                patientNameValue,     
                genderValue,          
                heightValue,          
                weightValue,          
                disease,         
                billValue,            
                (billStatus  === 'false' ? false: true),     
                (dischargeStatus==='false' ? false: true) 
            )                        
        }catch(err){
            setMessage(err.message);
            console.log('err came from here');
        }
        setLoading(false);

        setPatientIdValue('');
        setPatientNameValue('');
        setGenderValue('');
        setHeightValue('');
        setWeightValue('');
        setBillStatus('');
        setDischargeStatus('');
        setBillValue('');
        setDisease('');

    };
  return (
    <div>
        <h1>This part is used by admin</h1>
      <Form onSubmit={submitHandler} error={!!message}>
        <Form.Field>
          <label>Patient ID</label>
          <input placeholder="PateintID" value={patientIdValue} onChange={(event)=>{setPatientIdValue(e=>{return e = +event.target.value;})}}/>
        </Form.Field>

        <Form.Field>
          <label>Patient Name</label>
          <input placeholder="Patient Name" value={patientNameValue} onChange={(event)=>{setPatientNameValue(e=>{return e = event.target.value;})}}/>
        </Form.Field>

        <Form.Field>
          <label>Gender</label>
          <input placeholder="Gender" value={genderValue} onChange={(event)=>{setGenderValue(e=>{return e = event.target.value;})}}/>
        </Form.Field>

        <Form.Field>
          <label>Height</label>
          <input placeholder="Height" value={heightValue} onChange={(event)=>{setHeightValue(e=>{return e = +event.target.value;})}}/>
        </Form.Field>

        <Form.Field>
          <label>Weight</label>
          <input placeholder="Weight" value={weightValue} onChange={(event)=>{setWeightValue(e=>{return e = +event.target.value;})}}/>
        </Form.Field>

        <Form.Field>
          <label>Disease</label>
          <input placeholder="Disease" value={disease} onChange={(event)=>{setDisease(e=>{return e = event.target.value;})}}/>
        </Form.Field>

        <Form.Field>
          <label>Bill</label>
          <input placeholder="Bill Amount" value={billValue} onChange={(event)=>{setBillValue(e=>{return e = +event.target.value;})}}/>
        </Form.Field>

        <Form.Field>
          <label>BillPending</label>
          <input placeholder="true/false" value={billStatus} onChange={(event)=>{setBillStatus(e=>{return e = event.target.value;})}}/>
        </Form.Field>

        <Form.Field>
          <label>DischargePending</label>
          <input placeholder="true/false" value={dischargeStatus} onChange={(event)=>{setDischargeStatus(e=>{return e = event.target.value ;})}}/>
        </Form.Field>

        <Button loading={loading} primary>Submit</Button>
        <Message error header={'oops!'} content={message}/>      
        </Form>
    </div>
  );
};

export default Admin;
