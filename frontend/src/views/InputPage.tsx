import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    Input,
    FormGroup,
    Container
} from "reactstrap"
import { toast } from 'react-toastify'
//@ts-ignore
import Cookies from 'js-cookie'
import { REGISTER_URL } from '../constants/index'

function InputPage() {
    let history = useHistory()
    const [status, UpdateStatus] = useState("")
    const [feedback, Updatefeedback] = useState("")
    const user = useRef<HTMLDivElement>(null)

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
                if (id === "password") {
                    datapayload.append("password1", value)
                    datapayload.append("password2", value)
                }
                else {
                    datapayload.append(id, value)
                }
            }
            const requestOptions = {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: datapayload
            };
            fetch(REGISTER_URL, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data["key"]) {
                        UpdateStatus("success")
                        Cookies.set('key', data["key"]);
                    }
                    else if (data["username"] || data["email"]) {
                        UpdateStatus("Username or email already in use!")
                    }
                });

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
                SubmitForm()
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
                                            Submit
                                    </Button>
                                    </FormGroup>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}
export default InputPage;
