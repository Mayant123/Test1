import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from '../Firebase/Firebase.js'
import { userRef } from '../Firebase/Firebase.js'
import swal from 'sweetalert';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs";

const auth = getAuth(app);
function Enterin() {
    const navigate = useNavigate();
    const [form, setform] = useState({
        Name: "",
        Mobile: "",
        Password: ""
    })
    const [loading, setloading] = useState(false)
    const [otpsent, setotpsent] = useState(false)
    const [OTP, setOTP] = useState("")

    function generateRecaptha() {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {

            }
        }, auth);
    }
    function requestOTP() {
        setloading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.Mobile}`, appVerifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult;
                swal({
                    text: "OTP sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                });
                setotpsent(true);
                setloading(false);
            }).catch((error) => {
                swal({
                    text: "OTP not sent",
                    icon: "error",
                    buttons: false,
                    timer: 3000
                });
                console.log(error);
            });
    }

    function verifyotp() {
        try {
            setloading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                swal({
                    text: "OTP confimed",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                });
                navigate('/enter');
                setloading(false);
            })

        } catch (error) {

        }
    }

    async function uploadData() {
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.Password, salt);
            await addDoc(userRef, {
                Name: form.Name,
                Password: hash,
                Mobile: form.Mobile
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="form container">
            <div className="text-center text-success">
                <h1>Sign-up</h1>
            </div>
            {otpsent ?
                <div>
                    <div className="mx-4 justify-content-center">
                        <input value={OTP} onChange={(element) => setOTP(element.target.value)} className="form-control" placeholder="OTP" aria-label="First name" />
                    </div>
                    <div className="col-2 mx-auto d-grid mt-3">
                        <button onClick={verifyotp} type="submit" className="btn btn-success">Confirm-OTP</button>
                    </div>
                </div>
                :
                <div>
                    <div className="main mt-4">
                        <div class="row">
                            <div className="col">
                                <input type="text" onChange={(element) => setform({ ...form, Name: element.target.value })} className="form-control" placeholder="Name" aria-label="First name" />
                            </div>
                            <div className="col">
                                <input type="number" value={form.Mobile} onChange={(element) => setform({ ...form, Mobile: element.target.value })} className="form-control" placeholder="Mobile number" aria-label="First name" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="col mt-2">
                            <input type="password" onChange={(element) => setform({ ...form, Password: element.target.value })} className="form-control" placeholder="Password" aria-label="First name" />
                        </div>
                        <div className="col-2 mx-auto d-grid mt-3">
                            <button onClick={requestOTP} type="submit" className="btn btn-primary">{loading ? <TailSpin height={20} /> : "Request-OTP"}</button>
                        </div>
                    </div>
                </div>

            }
            <div className="signin d-flex justify-content-center mt-3">
                <p>Already have account?</p><Link to="/enter"><span className="ms-1 text-primary">Log-in</span></Link>
            </div>
            <div>
                <div id="recaptcha-container">

                </div>
            </div>
        </div >
    )
}

export default Enterin