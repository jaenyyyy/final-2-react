import { useRecoilValue } from 'recoil';
import { busIdState } from '../../../recoil';
import { useParams } from 'react-router-dom';

const ResImage=()=>{
    const { resNo } = useParams();
    const busId = useRecoilValue(busIdState);
   
    return (
        <>
        
        </>
        );
    };

    export default ResImage;