import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { busIdState } from '../../../recoil';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHashtag } from "react-icons/fa6";

const ClockByRes = () => {
    const busId = useRecoilValue(busIdState);
    const { resNo } = useParams();

    const[clockList, setClockList] = useState([]);

   

return(
    <>
    
    </>
);
};
export default ClockByRes;