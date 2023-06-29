import react, { useState, useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from '../Firebase/Firebase.js';
import swal from 'sweetalert';
import {Appstate} from '../App.js'
function AddMovie() {
    const useAppstate= useContext(Appstate);
    const [form, setform] = useState([{
        Title: "",
        Year: "",
        Discription: "",
        image: "",
        rated:0,
        rating:0
    }]);
    const [loading, setloading] = useState(false);
    async function addMovie(){
        setloading(true);
        await addDoc(moviesRef, form);
        swal({
            title:"fully added",
            icon:"success",
            button: false,
            timer: 3000
        })
        setloading(false);
    }
    return (
        <div>
            <div className="container">
                <h1 className="text-center text-success">Add Movie</h1>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label for="inputEmail4" class="form-label">Title</label>
                        <input value={form.Title} onChange={(element) => setform({ ...form, Title: element.target.value })} type="text" className="form-control" id="inputName4" />
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label">Year</label>
                        <input value={form.Year} onChange={(element) => setform({ ...form, Year: element.target.value })} type="text" className="form-control" id="inputYear4" />
                    </div>
                    <label for="basic-url" className="form-label">Your vanity URL</label>
                    <div class="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3"> Image URL</span>
                        <input value={form.Url} onChange={(element) => setform({ ...form, Url: element.target.value })} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                    </div>
                    <div class="input-group">
                        <span className="input-group-text">Discription</span>
                        <textarea value={form.Discription} onChange={(element) => setform({ ...form, Discription: element.target.value })} className="form-control" aria-label="With textarea"></textarea>
                    </div>
                    <div class="col-12">

                        <button onClick={addMovie} type="button" className="btn btn-primary text-center align-items-center">
                            {loading ? <TailSpin height="25" /> : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddMovie