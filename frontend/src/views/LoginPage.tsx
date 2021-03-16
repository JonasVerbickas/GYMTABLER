import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Input,
    FormGroup,
    Container
} from "reactstrap"
// @ts-ignore
import Cookies from 'js-cookie'
// @ts-ignore
import { toast } from 'react-toastify';
import { LOGIN_URL } from '../constants/index'


function LoginPage() {
    let history = useHistory()
    const [feedback, UpdateFeedback] = useState("")
    const [status, UpdateStatus] = useState("")

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

    // Validate User Input
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
        if (!ValidateUsername()) {
            UpdateFeedback("The username should have between 4-15 characters")
        }
        else if (!ValidatePassword()) {
            UpdateFeedback("The password should be at least 8 characters long.\n The password should contain at least 1 lowercase letter, 1 uppercase letter, 1 numerical character and 1 special character")
        }
        else {
            UpdateFeedback("")
            sendLoginData()
        }
    }

    // Send User Input to Backend
    function sendLoginData() {
        const token = Cookies.get('key')
        let element = document.querySelector('form') as HTMLFormElement
        if (element) {
            let formData = new FormData(element)
            let datapayload = new FormData()
            for (let [id, value] of formData) {
                datapayload.append(id, value)
            }
            const requestOptions = {
                method: 'POST',
                headers: { Accept: 'application/json', Authorization: `Token ${token}` },
                body: datapayload
            };
            fetch(LOGIN_URL, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data["key"]) {
                        UpdateStatus("success")
                    }
                    else if (data["username"] || data["email"]) {
                        UpdateStatus("Username or email already in use!")
                    }
                });
        }

    }

    return (
        <Container style={{ marginTop: '15em' }}>
            <div className="card px-4 py-5 mt-4">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3><strong>Log into your account</strong></h3>
                </div>
                <div className="row">
                    <div className="col-md-12 mx-0">
                        <form id="msform" autoComplete="on">
                            <div>
                                <FormGroup>
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
                                        className="nav-link d-lg-block px-4"
                                        color="primary"
                                        name="login"
                                        onClick={validateForm}>
                                        Login
                                    </Button>
                                    <span>
                                        <a href="" target="_blank">Forgotten password? </a>|
                                        <a href="/input"> Register an account</a>
                                    </span>
                                </FormGroup>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );

}

export default LoginPage;