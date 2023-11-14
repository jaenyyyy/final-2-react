import { useRecoilValue } from "recoil";
import { busIdState } from "../recoil";


const Home = (props)=>{
    const busId = useRecoilValue(busIdState);
    
    return(
        <>
            <h1>메인페이지</h1>

            사업자 매인페이지의 모습

             로그인중인 아이디 = {busId}

        </>
    );

};

export default Home;