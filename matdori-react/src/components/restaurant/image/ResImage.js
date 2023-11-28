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
        try {
          // 서버에서 여러 이미지에 대한 정보를 받아오는 요청을 보냅니다.
          const response = await axios.get(`http://localhost:8080/restaurant/image/${resNo}`);
          
          // 받아온 이미지 정보로부터 각각의 Blob을 생성하고 URL을 만듭니다.
          const newImageUrls = response.data.map((imageData) => {
            const blob = new Blob([imageData], { type: 'image/jpeg' }); // MIME 타입을 'image/jpeg'으로 가정
            return URL.createObjectURL(blob);
          });
      
          // 기존의 이미지 URL들을 해제합니다.
          images.forEach(imageUrl => URL.revokeObjectURL(imageUrl));
          // 새로운 이미지 URL 배열로 상태를 업데이트합니다.
          console.log(newImageUrls);
          setImages(newImageUrls);
      
        } catch (error) {
          console.error("Failed to load images:", error);
        }
      };
      
      useEffect(() => {
        loadImages();
      
        // 컴포넌트가 언마운트될 때 모든 이미지 URL을 해제합니다.
        return () => {
          images.forEach(imageUrl => URL.revokeObjectURL(imageUrl));
        };
      }, [resNo]); // resNo가 변경될 때마다 이미지를 다시 로드합니다.
      
    // const loadImages = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:8080/restaurant/image/${resNo}`);
    //       const imageData = response.data;
      
    //       // 바이너리 데이터를 포함하는 AttachDto를 이용하여 Blob을 만들고, 그 Blob에 대한 URL을 생성
    //       const imageUrls = await Promise.all(imageData.map(async (attach) => {
    //         const blob = new Blob([attach.data], { type: attach.contentType });
    //         const imageUrl = URL.createObjectURL(blob);
    //         return { ...attach, imageUrl }; // attach 객체에 imageUrl 속성 추가
    //       }));
      
    //       console.log("Loaded images:", imageUrls); // 로딩된 이미지 URL 로깅
    //       setImages(imageUrls); // 이미지 상태 업데이트
    //     } catch (error) {
    //       console.error("Failed to load images:", error);
    //     }
    //   };

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
                {images.map((imageUrl, index) => (
                    <div key={index} className="image-card">
                        <img src={imageUrl} alt="image" />
                        <button onClick={() => handleDelete(index)} className="button delete">삭제</button>
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
