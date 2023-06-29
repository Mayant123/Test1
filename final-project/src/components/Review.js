import react, { useState, useEffect } from 'react'
import { reviewsRef, db } from '../Firebase/Firebase'
import { TailSpin } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { addDoc, doc, query, where, getDocs, updateDoc, } from 'firebase/firestore';
import swal from 'sweetalert';
function Review({ id, prevRating, userRated }) {
    const [Rating, setRating] = useState(0);
    const [loading, setloading] = useState(false);
    const [form, setform] = useState("");
    const [data, setdata] = useState([]);
    const [reviewsLoading, setreviewsLoading] = useState(false);
    async function sentReview() {
        try {
            setloading(true);
            await addDoc(reviewsRef, {
                movieId: id,
                Name: "mayant partap",
                Rating: Rating,
                thought: form,
                timestamp: new Date().getTime()

            })
            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: prevRating + Rating,
                rated: userRated + 1
            })
            setRating(0);
            setform("");

            swal({
                title: "review sent",
                icon: "success",
                buttons: false,
                timer: 3000
            })
            setloading(false);
        } catch (error) {
            swal({
                title: "error.message",
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
    }
    useEffect(() => {
        async function getData() {
            setreviewsLoading(true);
            let quer = query(reviewsRef, where('moviesid', '==', id))
            const querySnapshot = await getDocs(quer);
            querySnapshot.forEach((doc) => {
                setdata((prev) => [...prev, doc.data()]);
            })
            setreviewsLoading(false);
        }
        getData();
    }, [])

    return (
        <div className="mt-2 w-full border-top border-solid border-success">
            <div className="rating">
                <ReactStars size={30} half={true}
                    onChange={(rate) => setRating(rate)}
                    value={Rating}
                />
            </div>
            <div>
                <input value={form} onChange={(element) => setform(element.target.value)} className="w-full p-2 header outline-none" type="text" placeholder="Share your review" />
            </div>
            <div className="mt-2 w-full">
                <button onClick={sentReview} className="btn btn-success w-full" type="button">
                    {loading ? <TailSpin height={20} /> : 'Share'} </button>
            </div>
            <div className="mt-2">
                {
                    reviewsLoading ? <TailSpin height={40} /> :
                        <div>
                            {
                                data.map((element, index) => {
                                    return (
                                        <div>
                                            <div className="bg-light row" key={index}>
                                                <div className="col-8">
                                                    <p>{element.Name}</p>
                                                </div>
                                                <div className="col-4">
                                                    <p>{new Date(element.timestamp).toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p>{element.thought}</p>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Review