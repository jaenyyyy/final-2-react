import { useRecoilValue } from "recoil";
import { busIdState } from "../recoil";
import matdoribus from '../assets/images/matdoribus.png';


const Home = (props) => {
    const busId = useRecoilValue(busIdState);

    return (
        <>
            <div className="row">
                {/* <img src={matdoribus} width={100} /> */}
            </div>
        </>
    );

};

export default Home;