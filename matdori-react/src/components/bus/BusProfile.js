import { useRecoilValue } from "recoil";
import { busIdState } from "../../recoil";

const BusProfile = ()=>{
  const busId = useRecoilValue(busIdState);
  return(
    <>
      {busId}님 프로필 
    </>
  )
}

export default BusProfile;