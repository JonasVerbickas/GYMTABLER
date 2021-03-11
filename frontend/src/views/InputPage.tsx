import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Input,
    FormGroup,
    Label,
    FormText,
    Container
} from "reactstrap";
// @ts-ignore
import Slider from "nouislider";
import { toast } from 'react-toastify';
import { REGISTER_URL } from '../constants/index'

function InputPage() {
    let history = useHistory()
    const [step, UpdateStep] = useState(1)
    const [status, UpdateStatus] = useState("")
    const [feedback, Updatefeedback] = useState("")
    const second = useRef<HTMLLIElement>(null)
    const third = useRef<HTMLLIElement>(null)
    const user = useRef<HTMLDivElement>(null)
    const info = useRef<HTMLDivElement>(null)
    const pref = useRef<HTMLDivElement>(null)

    function decrementStep() {
        // step is current value
        UpdateStep(prevStep => prevStep - 1)
        //remove active className
        if (step === 2 && second && second.current && user.current && pref.current) {
            second.current.className = ""
            user.current.className = "activediv"
            pref.current.className = "hidden"
        }
        else if (step === 3 && third && third.current && pref.current && info.current) {
            third.current.className = ""
            pref.current.className = "activediv"
            info.current.className = "hidden"
        }
    }

    function incrementStep() {
        // step is current value
        UpdateStep(prevStep => prevStep + 1)
        if (step === 1 && second.current && user.current && pref.current) {
            second.current.className = "active"
            user.current.className = "hidden"
            pref.current.className = "activediv"

        }
        else if (step === 2 && third && third.current && pref.current && info.current) {
            third.current.className = "active"
            pref.current.className = "hidden"
            info.current.className = "activediv"
        }
        //add active className
    }
    useEffect(() => {
        const sliderRef = document.getElementById('slider');
        const experienceRef = document.getElementById('experienceSlider');

        Slider.create(sliderRef, {
            start: [3],
            connect: [true, false],
            step: 1,
            range: { min: 1, max: 7 },
            behaviour: 'tap-drag',
            tooltips: false,
            pips: {
                mode: 'steps',
                density: 14
            }

        });
        Slider.create(experienceRef, {
            start: 1,
            connect: [true, false],
            step: 1,
            range: { min: 1, max: 5 },
            behaviour: 'tap-drag',
            tooltips: false,
            pips: {
                mode: 'steps',
                density: 20
            }

        });
    }, [])
    useEffect(() => {
        if (status === "success") {
            toast.success('Registered Successfully!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            history.push("/")
        }
        else if (status === "") { }
        else {
            toast.error(status, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
    }, [status])

    function SubmitForm() {
        let element = document.querySelector('form') as HTMLFormElement
        if (element) {
            let formData = new FormData(element)
            let datapayload = new FormData()
            for (let [id, value] of formData) {
                datapayload.append(id, value)
            }
            const requestOptions = {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: datapayload
            };
            fetch(REGISTER_URL, requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        UpdateStatus("success")
                    }
                    else if (response.status === 409) {
                        UpdateStatus("Username or email already in use!")
                    }
                })
        }

    }
    function ValidateEmail() {
        let element = document.querySelector('form') as HTMLFormElement
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(element.email.value)) {
            return (true)
        }
        return (false)
    }
    function ValidateUsername() {
        let element = document.querySelector('form') as HTMLFormElement
        if (element.username.value < 4 || element.username.value > 15) {
            return (false)
        }
        return (true)
    }
    function ValidatePassword() {
        let element = document.querySelector('form') as HTMLFormElement
        if (element.password.value < 8) {
            return (false)
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(element.password.value)) {
            return (false)
        }
        return (true)
    }
    function validateForm() {
        if (!ValidateEmail()) {
            Updatefeedback("Please enter a valid email address!")
        }
        else if (!ValidateUsername()) {
            Updatefeedback("The username should have between 4-15 characters")
        }
        else if (!ValidatePassword()) {
            Updatefeedback("The password should be at least 8 characters long.\n The password should contain at least 1 lowercase letter, 1 uppercase letter, 1 numerical character and 1 special character")
        }
        else {
            Updatefeedback("")
            incrementStep()
        }
    }
    return (
        <Container style={{ marginTop: '5em' }}>
            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3><strong>Create an account</strong></h3>
                    <p>and start your journey</p>
                </div>
                <div className="row">
                    <div className="col-md-12 mx-0">
                        <form id="msform" autoComplete="on">
                            <ul id="progressbar">
                                <li className="active" id="account"><strong>Account</strong></li>
                                <li ref={second} id="preferences"><strong>Preferences</strong></li>
                            </ul>
                            <div ref={user} className="activediv">
                                <FormGroup>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="Enter email"
                                        className="msInput"
                                    />
                                    <Input
                                        type="text"
                                        name="username"
                                        id="exampleName"
                                        placeholder="Enter username"
                                        className="msInput"
                                    />
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePass"
                                        autoComplete="current-password"
                                        placeholder="Enter password"
                                        className="msInput"
                                    />
                                    <span style={{ color: 'red' }} >{feedback}</span>
                                    <Button
                                        className="nav-link d-lg-block"
                                        color="primary"
                                        name="next"
                                        onClick={validateForm}>
                                        Next Step
                                    </Button>
                                </FormGroup>
                            </div>
                            <div ref={pref} className="hidden">
                                <FormGroup>
                                    <FormText>Select how many days a week would you like to work out:</FormText>
                                    <div id='slider' style={{ margin: '20px' }} ></div>
                                    <div className="custom-form-radio" >
                                        <FormText style={{ margin: '20px' }}>Select your equipment access: </FormText>
                                        <Label className="form-check-label">
                                            <Input type="radio" name="equipment" id="equipment1" value="noEquipment" defaultChecked />No equipment
                                    </Label>
                                        <Label className="form-check-label">
                                            <Input type="radio" name="equipment" id="equipment2" value="basicEquipment" />Basic equipment
                                    </Label>
                                        <Label className="form-check-label">
                                            <Input type="radio" name="equipment" id="equipment3" value="gymEquipment" />Gym equipment
                                    </Label>
                                    </div>
                                    <FormText>How would you rate your level of comfort and experience working out:</FormText>
                                    <div id='experienceSlider' style={{ margin: '20px' }} ></div>
                                    <div style={{ display: 'flex', marginTop: '3em' }}>
                                        <Button
                                            className="nav-link d-lg-block"
                                            color="default"
                                            name="prev"
                                            onClick={decrementStep}>
                                            Previous
                                    </Button>
                                        <Button
                                            className="nav-link d-lg-block"
                                            color="primary"
                                            name="next"
                                            onClick={SubmitForm}>
                                            Confirm
                                        </Button>
                                    </div>
                                </FormGroup>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default InputPage;
