import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom';
import react from 'react';
import { getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { moviesRef, db } from '../Firebase/Firebase.js'
import { doc } from 'firebase/firestore'
import { TailSpin } from 'react-loader-spinner'
import Review from './Review.js'

function Detail() {
    const { id } = useParams();
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState({
        Title: "",
        Year: "",
        Image: "",
        Discription: "",
        rating: 0,
        userRated: 0
    })
    useEffect(() => {
        async function getdata() {
            setloading(true);
            const _doc = doc(db, "movies", id);
            const get = await getDoc(_doc)
            setdata(get.data());
            setloading(false);
        }
        getdata();
    }, [])

    return (

        <div className="detail">
            {
                loading ? <TailSpin /> :
                    <div className="container">
                        <div className="row">
                            <div className="col-4 sticky">
                                <img className="h-75 w-100" src={data.Url} alt="" />
                            </div>
                            <div className="col-8">
                                <h1 className="text-success">{data.Name} <span className="text-light">{data.Year}</span></h1>
                                <div className="rating">
                                    <ReactStars size={20} half={true}
                                        edit={false}
                                        value={data.rating / data.rated}
                                    />
                                </div>
                                <p>{data.Discription}</p>
                                <div className="review">
                                    <Review id={id} prevRating={data.rating} userRated={data.rated} />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Detail