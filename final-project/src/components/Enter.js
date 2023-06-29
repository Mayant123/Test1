import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { query, where, getDocs } from 'firebase/firestore'
import { userRef } from '../Firebase/Firebase.js'
import bcrypt from "bcryptjs";
import { Appstate } from "../App"

function Enter() {
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [form, setform] = useState({
        Mobile: "",
        Password: ""
    })
    const [loading, setloading] = useState(false);
    async function login() {
        setloading(true);
        try {
            const quer = query(userRef, where('Mobile', '==', form.Mobile));
            const querySnapshot = await getDocs(quer);
            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.Password, _data.Password);
                if (isUser) {
                    useAppstate.setlogin(true);

                    swal({
                        text: "logged in",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    navigate('/')
                } else {
                    swal({
                        text: "Invalid credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    });
                }

            })

        } catch (error) {
            console.log(error);
            // swal({
            //     title: error.message,
            //     icon: "error",
            //     buttons: false,
            //     timer: 3000
            // });
        }
        setloading(false);
    }

    return (
        <div className="container justify-content-center">
            <div>
                <h1 className="text-center w-100 text-success">Login</h1>
            </div>
            <div className="input-group input-group-lg">
                <span className="input-group-text" id="inputGroup-sizing-lg">Number  </span>
                <input type="number" value={form.Mobile} onChange={(element) => setform({ ...form, Mobile: element.target.value })} className="form-controln w-50" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            </div>
            <div className="input-group input-group-lg mt-2">
                <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
                <input type="password" value={form.Password} onChange={(element) => setform({ ...form, Password: element.target.value })} className="form-controln w-50" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            </div>
            <div className="d-grid col-1 mx-auto">
                <button type="button" onClick={login} className="btn btn-primary mt-2 w-3 float-right">Login</button>
            </div>
            <div className="signin d-flex justify-content-center mt-3">
                <p>Do not have account?</p><Link to="/enterin"><span className="ms-1 text-primary">Sign-up</span></Link>
            </div>
        </div>
    )
}

export default Enter