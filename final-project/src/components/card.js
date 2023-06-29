import { useState, useEffect } from 'react'
import ReactStars from 'react-stars'
import { TailSpin } from 'react-loader-spinner'
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../Firebase/Firebase.js'
import {Link} from 'react-router-dom'
function Card() {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        async function getData() {
            setloading(true);
            const get = await getDocs(moviesRef);
            get.forEach((doc) => {
                setdata((prv) => [...prv, { ...(doc.data()),id: doc.id }])
            })
            setloading(false);
        } getData();
    }, [])



    return (
        <div className="d-flex justify-content-between p-3 mt-2 flex-wrap">
            {loading ? <div className="item-center justify-center"><TailSpin /></div> :
                data.map((element, index) => {
                    return (
                        <Link to={`/Detail/${element.id}`}><div>
                            <div key={index} className="card bg-dark me-2 mt-3" >
                                <img  src={element.Url} classname="card-img-top h-5" alt="..." />
                                <div class="card-body">
                                    <h5 className="card-title">Name : <span className="fw-bold text-success">{element.Title}</span></h5>
                                    <h5 className="card-title d-flex">Rating : <span className="fw-bold text-success">
                                        <ReactStars size={20} half={true} value={element.rating/element.rated} edit={false}

                                        /> </span></h5>
                                    <h5 className="card-title">Year : <span className="fw-bold text-success">{element.Year}</span></h5>
                                </div>
                            </div>
                        </div>
                        </Link>
                    )
                })}
        </div>)
}
export default Card