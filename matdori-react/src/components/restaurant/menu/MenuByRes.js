



import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from "recoil";
import { busIdState } from '../../../recoil';
import { Modal } from "bootstrap";
import './MenuByRes.css'; // CSS 파일 import
import { FaBowlFood } from "react-icons/fa6";


const MenuByRes = () => {
  const busId = useRecoilValue(busIdState);
  const { resNo } = useParams();
  const [menuTypeList, setMenuTypeList] = useState([]);
  const [menuType, setMenuType] = useState({
    menuTypeNo: "",
    menuTypeName: "",
    resNo: resNo
  });
  const [file, setFile] = useState(null); // 파일 상태 추가
  const [currentMenuTypeNo, setCurrentMenuTypeNo] = useState(null);
  const [previousImageUrl, setPreviousImageUrl] = useState(null);

  useEffect(() => {
    console.log(busId)
    loadMenuTypeList();
  }, [])

  const clearMenuType = () => {
    setMenuType({
      menuTypeNo: "",
      menuTypeName: "",
      resNo: resNo
    })
  }


  const changeInfo = (e) => {
    setMenuType({
      ...menuType,
      [e.target.name]: e.target.value
    })
  };


  //저장
  const loadMenuTypeList = () => {
    axios({
      url: `http://localhost:8080/menuType/list/${resNo}`,
      method: "get"
    }).then((response) => {
      // console.log(response.data)
      setMenuTypeList(response.data);
    });
  };


  //메뉴 타입을 추가하는 함수
  const addMenuType = () => {
    axios({
      url: `http://localhost:8080/menuType/save/`,
      method: 'post',
      data: {
        menuTypeName: menuType.menuTypeName,
        resNo: resNo
      }
    }).then(response => {
      console.log(response.data)
      loadMenuTypeList();
    });
  };

  // 메뉴타입을 수정하는 함수
  const updateMenuType = () => {
    console.log(menuType.menuTypeNo)
    delete menuType.resNo;
    axios({
      url: `http://localhost:8080/menuType/update/${menuType.menuTypeNo}`,
      method: "put",
      data: { menuTypeName: menuType.menuTypeName }

    }).then(response => {
      console.log(response.data)
      loadMenuTypeList();
      alert("수정완료")
      closeModal();
    });
  };

  //--------------모달 열고 닫기 
  const bsModal = useRef();
  const bsModal2 = useRef();
  const deleteModal = useRef();
  const deleteMenuModal = useRef();
  const editMenuModal = useRef();


  //------------메뉴타입명 수정
  const changeMenuTypeName = (target) => {
    setMenuType({ ...target })
    openModal2();
  };
  const openModal2 = () => {
    const modal = new Modal(bsModal2.current);
    modal.show();
  };
  const closeModal2 = () => {
    const modal = Modal.getInstance(bsModal2.current);
    modal.hide();
  };

  const saveMenu = async () => {
    try {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append("menuName", menuData.menuName);
      formData.append("actorImage", menuData.menuImage);

      // actor 정보와 이미지를 함께 서버로 전송
      const response = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/menu/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 등록 후 목록을 다시 불러오기
      cellClick();
      closeModal(); // 모달 닫기

    } catch (error) {
      console.error("Failed to save actor:", error);
    }
  };

  //메뉴 미리보기 함수
  const [previewImage, setPreviewImage] = useState(null);

  //이미지가 선택될 때 호출되는 함수
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      //선택된 파일이 있을 경우 파일 정보를 저장
      setMenuData({
        ...menuData,
        menuImage: selectedFile,
      });

      //선택된 파일이 있을 경우 미리보기 업데이트
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setMenuData({
        ...menuData,
        menuImage: null,
      });

      setPreviewImage(null);
    }
  };




  const openModal = () => {
    const modal = new Modal(bsModal.current);
    modal.show();
  };
  const closeModal = () => {
    const modal = Modal.getInstance(bsModal.current);
    modal.hide();

    


    // clearProfile();
  };
  const openDeleteModal = () => {
    const modal = new Modal(deleteModal.current);
    modal.show();
  };
  const closeDeleteModal = () => {
    const modal = Modal.getInstance(deleteModal.current);
    modal.hide();

    // clearProfile();
  };
  const openDeleteMenuModal = () => {
    const modal = new Modal(deleteMenuModal.current);
    modal.show();
  };
  const closeDeleteMenuModal = () => {
    const modal = Modal.getInstance(deleteMenuModal.current);
    modal.hide();
  };

  const openEditMenuModal = () => {
    const modal = new Modal(editMenuModal.current);
    modal.show();
  };
  const closeEditMenuModal = () => {
    const modal = Modal.getInstance(editMenuModal.current);
    modal.hide();
  };



  const changeMenuChange = (e) => {
    setMenuData({
      ...menuData,
      [e.target.name]: e.target.value,
      
    });
  };


  const addMe = (target) => {
    console.log("Selected target:", target);
    console.log("번호:", target.menuTypeNo);
    setMenuData(prevData => ({
      ...prevData,
      menuTypeNo: target.menuTypeNo
    }));
      openModal();
  
  };

  const addMenu = async () => {
    console.log(menuData);

    try {
      const menuTypeNo  = menuData.menuTypeNo;
    console.log("menuTypeNo="+menuTypeNo);
      // menuTypeNo 검증
      if (menuTypeNo<1) {
        console.error('menuTypeNo is undefined or not set');
        return;
      }
  
      // FormData 객체 생성
      const formData = new FormData();
      formData.append("menuTypeNo", menuTypeNo);
      formData.append("menuName", menuData.menuName);
      formData.append("menuPrice", menuData.menuPrice);
      formData.append("menuContent", menuData.menuContent);
      console.log("formData="+formData);

      
      // menuImage가 존재하는 경우에만 추가
      if (menuData.menuImage && menuData.menuImage instanceof File) {
        formData.append("menuImage", menuData.menuImage);
      }
  
      // 서버로 POST 요청
      const response = await axios.post(
        `http://localhost:8080/menu/upload/resNo/${menuData.resNo}/menuTypeNo/${menuTypeNo}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  

      // 등록 후 목록을 다시 불러오기
      if (response.status === 200) { // 성공적으로 등록되었을 때의 상태 코드 확인
        alert("메뉴가 성공적으로 등록되었습니다.");
        clearMenuList(); // 입력 필드 초기화
        cellClick({ menuTypeNo: menuData.menuTypeNo }); // 목록 새로고침
      }
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("메뉴 등록에 실패했습니다:", error);
    }
  };



  const deleteMenuType = (target) => {
    setMenuType({ ...target })
    openDeleteModal();
  }

  const removeMenuType = () => {
    axios({
      url: `http://localhost:8080/menuType/delete/${menuType.menuTypeNo}`,
      method: 'delete'
    }).then(response => {
      if (response.data == null) { alert("실패") }
      else { alert("삭제되었습니다") }
      closeDeleteModal();
      setMenuType({ menuTypeNo: 0, menuTypeName: "", resNo: resNo });

      loadMenuTypeList();

    }

    );
  };

  ///--메뉴 불러오기
  const [menuList, setMenuList] = useState([]);

  const cellClick = (menuType) => {
    console.log(menuType);
    if (!menuType || !menuType.menuTypeNo) {
      console.error('Invalid target or target.menuTypeNo is undefined');
      return;
    }
    axios({
      url: `http://localhost:8080/menu/list/${menuType.menuTypeNo}`,
      method: 'get',
    }).then(async response => {
      // console.log("response="+response.data);
      // 각 메뉴에 대한 이미지를 불러오고 menuList를 업데이트
      const updatedMenuList = await Promise.all(response.data.map(async (menu) => {
        // console.log(menu.menuNo);
        const imageUrl = await loadMenuImage(menu.menuNo) || 'path_to_default_image.jpg';
        return { ...menu, menuImage: imageUrl };
      }));

      setMenuList(updatedMenuList);
    }).catch(error => {
      console.error("오류남", error);
    });
  };

  const loadMenuImage = async (menuNo) => {
  try {
    const imageResponse = await axios({
      url: `http://localhost:8080/image/menu/${menuNo}`,
      method: "get",
      responseType: "arraybuffer",
    });

    // 이전 URL이 있으면 해제
    if (previousImageUrl) {
      URL.revokeObjectURL(previousImageUrl);
    }

    const blob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
    const newImageUrl = URL.createObjectURL(blob);

    // 새 URL을 previousImageUrl 상태에 저장
    setPreviousImageUrl(newImageUrl);
    return newImageUrl;

  } catch (error) {
    console.error("Failed to load menu image:", error);
    return null;
  }
};

  useEffect(() => {
    cellClick();
  }, []);

  // 메뉴 리스트 초기화 함수
  const clearMenuList = () => {
    setMenuData(prevData =>({
      // resNo: resNo,
      // menuTypeNo: menuType.menuTypeNo,
      ...prevData,// 현재 menuTypeNo를 유지하면서 나머지 상태를 초기화합니다.
      menuNo: null,
      menuName: "",
      menuPrice: "",
      menuContent: "",
      menuImage: null
    }));
  };
  //메뉴 등록
  const [menuData, setMenuData] = useState({
    resNo: resNo,
    menuTypeNo: "",
    menuNo: null,
    menuName: "",
    menuPrice: "",
    menuContent: "",
    menuImage: null
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // 파일 미리보기 로직
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        // 여기에서 menuData.menuImage도 업데이트
        setMenuData(prevData => ({
          ...prevData,
          menuImage: selectedFile
        }));
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setMenuData(prevData => ({
        ...prevData,
        menuImage: null
      }));
      setPreviewImage(null);
    }
  };

  // 메뉴 수정 핸들러
  // const handleEditMenu = (menuData) => {
  //   // 메뉴 데이터를 수정 모달에 설정
  //   setMenuData({
  //     menuNo: menuData.menuNo,
  //     menuName: menuData.menuName,
  //     menuPrice: menuData.menuPrice,
  //     menuContent: menuData.menuContent,
  //     menuImage: menuData.menuImage,
  //     menuTypeNo: menuData.menuTypeNo // 메뉴 타입 번호 추가
  //   });

  //   openEditMenuModal();
  // };
  const editMenu = async (target) => {
    // 메뉴 정보를 모달에 표시하기 전에 불러오기
    const { menuNo } = target;

    // menuNo를 사용하여 메뉴 정보와 이미지 정보를 불러오기
    // 해당 정보를 state에 업데이트하고 모달 열기
    loadMenuDetails(menuNo);
    openEditMenuModal();
  };
  const loadMenuDetails = async (menuNo) => {
    try {
      // 메뉴 정보를 불러오는 API 호출
      const menuResponse = await axios({
        url: `http://localhost:8080/menu/selectOneByMenuNo/${menuNo}`, 
        method: "get",
      });
     

      // 비어있을 경우 처리
      if (!menuResponse.data || menuResponse.data.length === 0) {
        console.error("비어있어요");
        // 원하는 처리를 여기에 추가 (예: 에러 메시지 표시 등)
        return;
      }

      // 이미지 정보를 불러오는 API 호출
      const imageResponse = await axios({
        url: `http://localhost:8080/image/menu/${menuNo}`,
        method: "get",
        responseType: "arraybuffer",
      });
      console.log("맞지?"+imageResponse);

      const menuImage = imageResponse.data ? new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] }) : null;
      // 배우 정보와 이미지 정보를 state에 업데이트
      setMenuData({
       
        menuNo: menuResponse.data.menuNo,
        menuTypeNo:menuResponse.data.menuTypeNo,
        menuName: menuResponse.data.menuName,
        menuPrice: menuResponse.data.menuPrice,
        menuContent: menuResponse.data.menuContent,
        menuImage: null,//이미지를 set 하진 않고 미리보기만
      });

      // 불러온 이미지를 미리보기로 업데이트
      setPreviewImage(URL.createObjectURL(menuImage));

    } catch (error) {
      console.error("Failed to load menu details:", error);
    }
  };

  //수정 비동기
  const updateMenu = async () => {
    console.log(menuData);
    try {
      // FormData 객체 생성
      const formData = new FormData();
       // resNo : resNo,
      formData.append("menuName", menuData.menuName);
      formData.append("menuNo", menuData.menuNo);
      formData.append("menuTypeNo", menuData.menuTypeNo);
      formData.append("menuPrice", menuData.menuPrice);
      formData.append("menuContent", menuData.menuContent);

      // menu 이미지가 변경된 경우에만 FormData에 추가
      if (menuData.menuImage != null && menuData.menuImage instanceof Blob) {
        formData.append("menuImage", menuData.menuImage);
        console.log(menuData.menuImage);
      }

      // menu 정보와 이미지를 함께 서버로 전송
      const response = await axios.put(
        `http://localhost:8080/menu/edit/${menuData.menuNo}`,
        formData,
       {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        }
      );
      
      // 수정 후 목록을 다시 불러오기
      if (response.status === 200) {
        cellClick({ menuTypeNo: menuData.menuTypeNo }); // 수정된 메뉴 타입의 메뉴 목록 다시 로드
        closeEditMenuModal(); // 모달 닫기
        console.log("메뉴 수정 성공");
      } else {
        console.error("메뉴 수정 실패", response.status);
      }
    } catch (error) {
      console.error("메뉴 수정 중 오류 발생:", error);
    }
  };


  const deleteMenu = (menu) => {
    console.log(menu);
    setMenuData({ ...menu })
    setCurrentMenuTypeNo(menu.menuTypeNo); // 현재 선택된 메뉴 타입 번호를 상태로 설정
    openDeleteMenuModal();
  }

  const removeMenu = () => {
    if (menuData.menuNo === null) {
      alert("메뉴가 선택되지 않았습니다.");
      return;
    }

    axios({
      url: `http://localhost:8080/menu/delete/${menuData.menuNo}`,
      method: 'delete'
    })
      .then(response => {
        if (response.data == null) {
          alert("삭제 실패");
        } else {
          alert("삭제되었습니다");
          closeDeleteMenuModal();
          // 삭제 후 초기화 코드가 필요한 경우 아래와 같이 설정합니다.
          setMenuData({
            menuNo: null,
            menuName: "",
            resNo: resNo,
            menuPrice: "",
            menuContent: "",
            attach_no: ""
          });
          // loadMenuTypeList();
          cellClick({ menuTypeNo: currentMenuTypeNo }); // 여기서 currentMenuTypeNo를 사용

        }
      })
      .catch(error => {
        console.error("삭제 실패: ", error);
      });
  };

  // 메뉴 업데이트 함수
  // const updateMenu = async () => {
  //   try {
  //     const formData = new FormData();
  //     // menuData 객체의 키를 반복하면서 formData 객체를 구성합니다.
  //     Object.keys(menuData).forEach(key => {
  //       if (key !== 'menuImage') {
  //         formData.append(key, menuData[key]);
  //       }
  //     });
  
  //     // menuImage가 File 또는 Blob 인스턴스인 경우에만 formData에 추가합니다.
  //     if (menuData.menuImage && (menuData.menuImage instanceof File || menuData.menuImage instanceof Blob)) {
  //       formData.append('menuImage', menuData.menuImage);
  //     }
  
  //     // axios 요청을 보낼 때는 formData를 data로 사용합니다.
  //     const response = await axios({
  //       url: `http://localhost:8080/menu/update/${menuData.menuNo}`,
  //       method: "put",
  //       data: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  
  //     // 응답 처리
  //     if (response.data) {
  //       alert("메뉴 수정 성공");
  //       closeModal();
  //       cellClick({ menuTypeNo: menuData.menuTypeNo }); // 수정된 메뉴 타입의 메뉴 목록을 다시 로드합니다.
  //     }
  //   } catch (error) {
  //     console.error("메뉴 수정 실패: ", error);
  //     alert("메뉴 수정 실패");
  //   }
  // };
  // const updateMenu = async () => {
  //   try {
  //     // FormData 객체 생성
  //     const formData = new FormData();
  //     formData.append("menuName", menuData.menuName);
  //     formData.append("menuPrice", menuData.menuPrice);
  //     formData.append("menuContent", menuData.menuContent);
     
  //     // menu 이미지가 변경된 경우에만 FormData에 추가
  //     if (menuData.menuImage != null && menuData.menuImage instanceof Blob) {
  //       formData.append("menuImage", menuData.menuImage);
  //       console.log(menuData.menuImage);
  //     }

  //     // menu 정보와 이미지를 함께 서버로 전송
  //     const response = await axios({
  //       url: `http://localhost:8080/menu/update/${menuData.menuNo}`,
  //       method: "put",
  //       data: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       }
  //     );

  //     // 수정 후 목록을 다시 불러오기
  //     cellClick();
  //     closeEditMenuModal(); // 모달 닫기
  //   } catch (error) {
  //     console.error("실패", error);
  //   }
  // };
  return (
    <div className="container mt-5">
      <div className="row mt-4">
        <div className="col-10 offset-1">
          <h1><FaBowlFood style={{ color: '#FFB416', fontSize: '1em' }} />메뉴 관리</h1>
        </div>
      </div>
      <div className="row mt-4 offset-1">
        <div className="col-sm-8">
          <input
            className="form-control"
            name="menuTypeName"
            placeholder="메뉴 타입 이름 입력"
            onChange={changeInfo}
          />
        </div>
        <div className="col-sm-4">
          <button className="btn btn-warning" onClick={addMenuType}>분류 추가</button>
        </div>
      </div>
      <table className="table offset-1">
        <thead>
          <tr>
            <th>메뉴 타입 번호</th>
            <th>분류</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {menuTypeList.map((menuType) => (
            <tr key={menuType.menuTypeNo}>
              <td onClick={() => cellClick(menuType)}>{menuType.menuTypeNo}</td>
              <td onClick={() => cellClick(menuType)}>{menuType.menuTypeName}</td>
              <td>
                <button className="btn btn-outline-warning me-2" onClick={() => addMe(menuType)}>메뉴등록</button>
                <button className="btn btn-outline-warning me-2" onClick={() => changeMenuTypeName(menuType)}>수정</button>
                <button className="btn btn-outline-warning" onClick={() => deleteMenuType(menuType)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        menuList.length > 0 &&
        <div className="menu-list-container offset-1">
          <h3>메뉴 리스트</h3>
          <div className="row">
            {menuList.map(menu => (
              <div className="col-md-4" key={menu.menuNo}>
                <div className="card">
                  {/* 이미지 표시 부분 */}
                  <img
                    src={menu.menuImage || `http://localhost:8080/image/menu/${menuData.menuNo}`}
                    className="card-img-top"
                    alt={menu.menuName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{menu.menuName}</h5>
                    <p className="card-text">{menu.menuContent}</p>
                    <p className="card-text">{menu.menuPrice}원</p>
                    <button className="btn btn-warning" onClick={() =>editMenu(menu)}>수정</button>
                    <button className="btn btn-danger" onClick={() => deleteMenu(menu)}>삭제</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      <div className="modal fade" ref={editMenuModal} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editMenuModalLabel">메뉴 수정</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="menuName" className="form-label">메뉴 이름</label>
                <input type="text" className="form-control" name="menuName" value={menuData.menuName} onChange={changeMenuChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="menuPrice" className="form-label">가격</label>
                <input type="number" className="form-control" name="menuPrice" value={menuData.menuPrice} onChange={changeMenuChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="menuContent" className="form-label">설명</label>
                <textarea className="form-control" name="menuContent" value={menuData.menuContent} onChange={changeMenuChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="menuImage" className="form-label">이미지</label>
                <input type="file" className="form-control" name="menuImage" onChange={handleFileChange} />
                {previewImage && (
                                        <div className="mt-2">
                                            <img
                                                src={previewImage}
                                                alt="미리보기"
                                                className="img-fluid"
                                            />
                                        </div>
                                    )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="button" className="btn btn-warning" onClick={updateMenu}>변경하기</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" ref={bsModal} id="exampleModal"
        data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">등록</h5>
              <button type="button" className="border-0 bg-transparent" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="menuName" className="form-label">메뉴 이름</label>
                <input type="text" className="form-control" value={menuData.menuName} name="menuName" onChange={changeMenuChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="menuPrice" className="form-label">가격</label>
                <input type="number" className="form-control" value={menuData.menuPrice} name="menuPrice" onChange={changeMenuChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="menuContent" className="form-label">설명</label>
                <textarea className="form-control" value={menuData.menuContent} name="menuContent" onChange={changeMenuChange} ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="menuImage" className="form-label">이미지</label>
                <input type="file" className="form-control" name="menuImage" onChange={handleFileChange} />
                {previewImage && (
                                        <div className="mt-2">
                                            <img
                                                src={previewImage}
                                                alt="미리보기"
                                                className="img-fluid"
                                            />
                                        </div>
                                    )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>닫기</button>
              <button type="button" className="btn btn-warning" onClick={addMenu}>등록하기</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" ref={bsModal2} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">수정</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <input type="text" className="form-control" name="menuTypeName" onChange={changeInfo} value={menuType.menuTypeName || ''} />

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal2}>닫기</button>
              <button type="button" className="btn btn-warning" onClick={updateMenuType}>변경하기</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" ref={deleteModal} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">메뉴타입 삭제</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              '{menuType.menuTypeName}'를 삭제하시겠습니까?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeDeleteModal}>닫기</button>

              <button type="button" className="btn btn-danger" onClick={removeMenuType}>확인</button>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" ref={deleteMenuModal} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">메뉴 삭제</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              '{menuData.menuName}'를 삭제하시겠습니까?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeDeleteMenuModal}>닫기</button>

              <button type="button" className="btn btn-danger" onClick={removeMenu}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuByRes;