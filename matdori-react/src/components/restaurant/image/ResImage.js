import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { busIdState } from '../../../recoil';
import { useParams } from 'react-router-dom';
import './ResImage.css';
import axios from 'axios';
import { Modal } from "bootstrap";

const ResImage = () => {
    const { resNo } = useParams();
    const busId = useRecoilValue(busIdState);
    const [images, setImages] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(); // 파일 인풋 참조
    const modalRef = useRef(); // 모달 참조

    // 이미지를 불러오는 함수
    const loadImages = async () => {
        console.log(loadImages);
        try {
          // 이미지 목록 API 호출
          const response = await axios.get(`http://localhost:8080/restaurant/image/${resNo}`);
          // 상태에 이미지 목록 설정
          setImages(response.data.map(image => ({
            ...image,
            imageUrl: `http://localhost:8080/image/restaurant/image/${image.attachNo}`
          })));
          console.log(response.data); // 로깅하여 데이터 형식 확인
        } catch (error) {
          console.error("Failed to load images:", error);
        }
    };

    useEffect(() => {
        loadImages();
    }, [resNo]);

    // 파일 인풋에서 이미지를 선택할 때 호출되는 함수
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                openModal();
            };
            reader.readAsDataURL(file);
        }
    };

    // 이미지 업로드 모달을 여는 함수
    const openModal = () => {
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    // 이미지 업로드 모달을 닫는 함수
    const closeModal = () => {
        const modal = Modal.getInstance(modalRef.current);
        modal.hide();
        // 모달을 닫을 때 미리보기와 선택된 파일을 초기화합니다.
        setPreviewImage(null);
        setSelectedFile(null);
    };

    // 이미지를 업로드하는 함수
    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('resImages', selectedFile);

            try {
                await axios.post(`http://localhost:8080/restaurant/upload/resNo/${resNo}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                loadImages(); // 이미지 목록 갱신
                closeModal(); // 모달 닫기
            } catch (error) {
                console.error("Failed to upload image:", error);
            }
        }
    };

    // 이미지를 삭제하는 함수
    const handleDelete = async (imageId) => {
        try {
            await axios.delete(`http://localhost:8080/restaurant/deleteImage/${imageId}`);
            loadImages(); // 이미지 목록 갱신
        } catch (error) {
            console.error("Failed to delete image:", error);
        }
    };

    return (
        <div className="image-management-container">
            <h2>사진 관리</h2>
            <input 
                type="file" 
                onChange={handleImageChange} 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
            />
            <button onClick={() => fileInputRef.current.click()} className="button add">사진 추가</button>
            <div className="image-grid">
                {images.map((image) => (
                    <div key={image.attachNo} className="image-card">
                        <img src={image.imageUrl} alt="image" className="card-img-top" />
                        <button onClick={() => handleDelete(image.attachNo)} className="button delete">삭제</button>
                    </div>
                ))}
            </div>
            {/* 모달 구현 부분 */}
            <div className="modal" ref={modalRef} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">이미지 미리보기</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            {previewImage && (
                                <img src={previewImage} alt="Preview" className="img-preview"/>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpload}>업로드</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResImage;