import axios from "axios";
import { useState } from "react";
import { Segment } from "semantic-ui-react";
import ValidationError from "./ValidationError";

export default function TestError() {
    const baseUrl = 'http://localhost:5000/api/';
    const [errors, setErrors] = useState(null);


    function handleValidationError() {
        axios.post(baseUrl + 'vijesti', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Segment></Segment>
            {errors && <ValidationError errors={errors}/>}
        </>

    )
}