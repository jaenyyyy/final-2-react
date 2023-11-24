import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { busIdState } from '../../../recoil';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HashByRes = () => {
    const busId = useRecoilValue(busIdState);
    const { resNo } = useParams();

    const [resHashList, setResHashList] = useState([]);
    const [totalHashList, setTotalHashList] = useState([]);

    const loadTotalHashtag = () =>{
        axios.get(`http://localhost:8080/hashtag/list`)
            .then(response => {
                setTotalHashList(response.data);
            })
            .catch(err =>{
                window.alert("통신 오류 발생");
            })
    };

    const loadResHashtag = () => {
        axios.get(`http://localhost:8080/hashtag/resList/${resNo}`)
            .then(response => {
                setResHashList(response.data);
            })
            .catch(err => {
                window.alert("통신 오류 발생");
            });
    };


    useEffect(() => {
        loadTotalHashtag();
        loadResHashtag();
    }, [resNo]);

    return (
        <div className="container mt-5">
        <div className="row mt-4 offset-1">
            <div className="row">
                <h1>해시태그 관리</h1>
            </div>
        </div>
        <div className="row mt-4 offset-1">
            <div className="col-4">
                <div className="row">
                    <h5>전체 해시태그</h5>
                    <div className="overflow-auto" style={{ maxHeight: "400px" }}>
                        <ul className="list-group">
                            {totalHashList.map((total) => (
                                <li key={total.hashNo} className="list-group-item">
                                    <span className="badge bg-secondary badge-large mt-2">
                                        <h5># {total.hashComment}
                                        </h5>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
        </div>

            <div className="col-4">
                <div className="row">
                    <h5>매장에 등록된 해시태그</h5>
                        {resHashList.map((hashtag) => (
                            <li key={hashtag.hashNo}>
                                <span className="badge bg-warning badge-large mt-2">
                                    <h5># {hashtag.hashComment}</h5>
                                </span>
                            </li>
                        ))}
                </div>
            </div>


        </div>

    </div>

    );
};
export default HashByRes;
