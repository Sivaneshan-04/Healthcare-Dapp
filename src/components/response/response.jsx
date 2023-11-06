import { Grid } from 'semantic-ui-react';

const response = (props)=>{
    return<div>
            <h2>Patient Details</h2>

        <Grid columns={2} divided>
            <Grid.Row>
                <Grid.Column>Patient Id </Grid.Column>
                <Grid.Column>{props.data[0].toNumber()}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>Patient name </Grid.Column>
                <Grid.Column>{props.data[1]}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>Gender </Grid.Column>
                <Grid.Column>{props.data[2]}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>Patient height </Grid.Column>
                <Grid.Column>{props.data[3]}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>Patient weight </Grid.Column>
                <Grid.Column>{props.data[4]}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>Patient disease </Grid.Column>
                <Grid.Column>{props.data[5]}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>Bill amount </Grid.Column>
                <Grid.Column>{props.data[6].toNumber()}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>Bill pending</Grid.Column>
                <Grid.Column>{props.data[7].toString()}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>Discharge pending</Grid.Column>
                <Grid.Column>{props.data[8].toString()}</Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
};

export default response;