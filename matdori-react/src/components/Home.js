import { useRecoilValue } from "recoil";
import { busIdState } from "../recoil";
import matdoribus from '../assets/images/matdoribus.png';
import { MdOutlineAddBusiness } from "react-icons/md";


const Home = (props) => {
    const busId = useRecoilValue(busIdState);

    return (
        <>
            <div className="row">
                <div className="col text-center mt-3">
                    <h1>
                    <MdOutlineAddBusiness style={{ color: '#FFB416', fontSize: '4em' }} />
                    MATDORI BUSINESS
                    </h1>
                    <h2 className="mt-4"></h2>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    { <img src={matdoribus} width={600} /> }
                </div>
            </div>
        </>
    );

};

export default Home;