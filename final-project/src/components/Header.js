import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { Appstate } from '../App'
function Header() {
    const useAppstate = useContext(Appstate);
    return (
        <div className="fs-2 d-flex justify-content-between border-bottom text-wrap sticky-top">
            <div>
                <Link to={"/"}> <span> filmy</span><span className="text-danger">Verse</span></Link>
            </div>
            {useAppstate.login ?
                <div>
                    <Link to="/AddMovie"> <button className="btn btn-primary cursor-pointer"><AddIcon /> Add New</button></Link>
                </div>
                :
                <div>
                    <Link to="/Enter"> <button className="btn btn-primary cursor-pointer">login</button></Link>
                </div>
            }
        </div>
    )
}

export default Header