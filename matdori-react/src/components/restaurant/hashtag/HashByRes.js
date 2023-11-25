import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { busIdState } from '../../../recoil';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHashtag } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

const HashByRes = () => {
    const busId = useRecoilValue(busIdState);
    const { resNo } = useParams();

    const [resHashList, setResHashList] = useState([]);
    const [totalHashList, setTotalHashList] = useState([]);
    const [resHashCount, setResHashCount] = useState(0);

    const loadTotalHashtag = () => {
        axios.get(`http://localhost:8080/hashtag/list`)
            .then(response => {
                setTotalHashList(response.data);
            })
            .catch(err => {
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

    const handleDelete = (hashNo) => {
        const confirmDelete = window.confirm("해당 해시태그를 삭제하시겠습니까?");

        if (confirmDelete) {
            axios.delete(`http://localhost:8080/hashtag/delete/${hashNo}`)
                .then(() => {
                    const updatedHashList = resHashList.filter(hash => hash.hashNo !== hashNo);
                    setResHashList(updatedHashList);
                })
                .catch(err => {
                    console.error('삭제 중 오류:', err);
                });
        }
    };

    const handleAdd = (hashNo, resNo) => {
        const confirmAdd = window.confirm("해당 해시태그를 등록하시겠습니까?");

        if (confirmAdd) {
            axios.post('http://localhost:8080/hashtag/insert', { hashNo, resNo })
                .then(response => {
                    // 매장에 해시태그를 추가하는 데 성공하면, 매장에 등록된 해시태그 목록을 다시 불러옵니다.
                    loadResHashtag();
                })
                .catch(error => {
                    console.error('추가 중 오류:', error);
                });
        }
    };






    useEffect(() => {
        loadTotalHashtag();
        loadResHashtag();
    }, [resNo]);

    return (
        <div className="container mt-5">
            <div className="row mt-4 offset-1">
                <div className="row">
                    <div className="col">
                        <h1><FaHashtag style={{ color: '#FFB416'}} /> 해시태그 관리</h1>
                    </div>
                </div>
            </div>


            <div className="row mt-4 offset-1">
                <div className="col-4">
                    <div className="row">
                        <h5>전체 해시태그 목록</h5>
                        <span>추가하고 싶은 해시태그를 선택해주세요</span>
                        <div className="overflow-auto border p-4" style={{ maxHeight: "400px" }}>
                            <div className="list-group">
                                {totalHashList.map((total) => (
                                    <div key={total.hashNo} className="list-group-item">
                                        <button
                                            className="btn btn-success mt-2"
                                            onClick={() => {
                                                if (resHashList.length >= 5) {
                                                    return;
                                                }
                                                handleAdd(total.hashNo, resNo);
                                            }}
                                            disabled={resHashList.length >= 5} 
                                        >
                                            <h5># {total.hashComment}</h5>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-4 offset-2">
                    <div className="row">
                        <h5>
                            매장에 등록된 해시태그 (최대 5개)
                        </h5>
                        <span>제외하고 싶은 해시태그를 선택해주세요</span>
                        
                        <div className="border p-4">
                            {resHashList.map((hashtag) => (
                                <div className="mb-3" key={hashtag.hashNo}>
                                    <button className="btn btn-warning mt-2" onClick={() => handleDelete(hashtag.hashNo)}>
                                        <h5># {hashtag.hashComment}</h5>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>

        </div>

    );
};
export default HashByRes;
