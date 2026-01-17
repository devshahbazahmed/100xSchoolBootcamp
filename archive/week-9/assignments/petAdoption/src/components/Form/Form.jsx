import Input from "./Input/Input";
import "./Form.css";
import Button from "./Button/Button";
import { useState } from "react";

function Form() {
    const [petName, setPetName] = useState("");
    return (
        <div className="form-container">
            <form>
                <Input label="Pet Name" type="text" placeholder="Pet Name" setPetName={setPetName} />
                <Input label="Pet Type" type="text" placeholder="Pet Type" />
                <Input label="Breed" type="text" placeholder="Breed" />
                <Input label="Your Name" type="text" placeholder="Your Name" />
                <Input label="Email" type="text" placeholder="Email" />
                <Input label="Phone" type="text" placeholder="Phone" />
                <Button className="submit-button">Submit</Button>
            </form>
        </div>
    );
}

export default Form;