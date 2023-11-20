import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from "recoil";
import { busIdState } from '../../../recoil';
import { Modal } from "bootstrap";


const MenuByRes = () => {
  const busId = useRecoilValue(busIdState);
  const { resNo } = useParams();
  const [menuTypeList, setMenuTypeList] = useState([]);
  const [menuType, setMenuType] = useState({
    menuTypeNo: 0,
    menuTypeName: "",
    resNo: resNo
  });
  const [file, setFile] = useState(null); // 파일 상태 추가


  // const [newData, setNewData] = useState();


  useEffect(() => {
    console.log(busId)
    loadMenuTypeList();
  }, [])

  const clearMenuType = () => {
    setMenuType({
      MenuTypeNo: "",
      MenuTypeName: "",
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
      setMenuTypeList(response.data);
      console.log(response.data)
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
      // alart("성공임")
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
    });
  };

  //--------------모달 열고 닫기 
  const bsModal = useRef();
  const bsModal2 = useRef();
  const deleteModal = useRef(); 
  const deleteMenuModal = useRef(); 


  //------------메뉴타입명 수정
  const changeMenuTypeName = (target) => {
    setMenuType({ ...target })
    openModal2();
  };
  const openModal = () => {
    const modal = new Modal(bsModal.current);
    modal.show();
  };
  const closeModal = () => {
    const modal = Modal.getInstance(bsModal.current);
    modal.hide();
  };



  const openModal2 = () => {
    const modal = new Modal(bsModal2.current);
    modal.show();
  };
  const closeModal2 = () => {
    const modal = Modal.getInstance(bsModal2.current);
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

    // clearProfile();
  };
  
  

  const changeMenuChange = (e) => {
    setMenuData({
      ...menuData,
      [e.target.name]: e.target.value,
      menuTypeNo: menuType.menuTypeNo
    });
  };


  const addMe = (target) => {
    setMenuType({ ...target })
    openModal();
  };

  const addMenu = () => {
    const formData = new FormData();

    // 폼 데이터에 메뉴 정보 추가
    formData.append('resNo', menuData.resNo);
    formData.append('menuName', menuData.menuName);
    formData.append('menuPrice', menuData.menuPrice);
    formData.append('menuContent', menuData.menuContent);

    // 파일 데이터 추가 (fileInput은 파일 입력 요소의 ref 또는 이름이어야 합니다.)
    if (menuData.file) {
      formData.append('file', menuData.file);
    }
    axios({
      url: "http://localhost:8080/menu/upload", // 파일 업로드 API 엔드포인트로 변경
      method: "post",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      alert("메뉴 추가 성공");
      closeModal();
      loadMenuTypeList(); // 메뉴 목록을 다시 불러오는 함수
    }).catch(error => {
      console.error("메뉴 추가 실패: ", error);
      alert("메뉴 추가 실패");
    });
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

  ///--사원 불러오기
  const [menuList, setMenuList] = useState([]);

  // const cellClick = (target) => {
  //     setDept({ ...target })
  //     loadEmpList();
  // };
  const cellClick = (target) => {
    axios({
      url: `http://localhost:8080/menu/${target.menuTypeNo}/detail`,
      method: 'get',  // 'post' 대신 'get' 메서드 사용
    }).then(response => {
      console.log(response.data);
      setMenuList(response.data);
    }).catch(error => {
      console.error("Error loading menus: ", error);
    });
  };


  //메뉴  관련
  const clearMenuList = () => {
    setMenuList({
      resNo: "",
      menuTypeNo: "",
      menuName: "",
      menuPrice: "",
      menuContent: "",
      attach_no: ""
    });
  }
  //메뉴 등록
  const [menuData, setMenuData] = useState({
    resNo: resNo,
    menuTypeNo: "",
    menuName: "",
    menuPrice: "",
    menuContent: "",
    attach_no: ""
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // 파일 변경 이벤트 핸들러
  };

  // 메뉴 수정 핸들러
  const handleEditMenu = (menu) => {
    // 메뉴 데이터를 수정 모달에 설정
    setMenuData({
      menuName: menu.menuName,
      menuPrice: menu.menuPrice,
      menuContent: menu.menuContent,
      attach_no: menu.attachNo
      
    });

   openModal();
  };

  // 메뉴 삭제 핸들러
  const handleDeleteMenu = (menuNo) => {
    axios.delete(`http://localhost:8080/menu/${menuNo}`)
      .then(response => {
        // 삭제 성공 시 UI 업데이트
        loadMenuTypeList();
      })
      .catch(error => {
        console.error("메뉴 삭제 실패: ", error);
      });
  };
const deleteMenu = (target) => {
    setMenuType({ ...target })
    openDeleteMenuModal();
  }

  const removeMenu = () => {
    axios({
      url: `http://localhost:8080/menu/delete/${menuData.menuNo}`, // URL 수정
      method: 'delete'
    }).then(response => {
      if (response.data == null) { 
        alert("실패"); 
      } else { 
        alert("삭제되었습니다"); 
        closeDeleteMenuModal(); // 모달을 닫는 함수 수정
        setMenuData({ menuNo: 0, menuName: "", resNo: resNo, menuPrice: "", menuContent: "", attach_no: "" });
        loadMenuTypeList(); // 메뉴 목록을 다시 불러옵니다.
      }
    }).catch(error => {
      console.error("삭제 실패: ", error);
    });
  };

  return (
    <div className="container mt-5">
      <div className="row mt-4">
        <div className="col-10 offset-1">
          <h1>메뉴 관리</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-8">
          <input
            className="form-control"
            name="menuTypeName"
            placeholder="메뉴 타입 이름 입력"
            onChange={changeInfo}
          />
        </div>
        <div className="col-sm-4">
          <button className="btn btn-outline-primary" onClick={addMenuType}>분류 추가</button>
        </div>
      </div>
      <table className="table">
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
                <button className="btn btn-outline-primary me-2" onClick={() => addMe(menuType)}>메뉴등록</button>
                <button className="btn btn-outline-primary me-2" onClick={() => changeMenuTypeName(menuType)}>수정</button>
                <button className="btn btn-outline-primary" onClick={() => deleteMenuType(menuType)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        menuList.length > 0 &&
        <div className="menu-list-container">
          <h3>메뉴 리스트</h3>
          <div className="row">
            {menuList.map(menu => (
              <div className="col-md-4" key={menu.menuNo}>
                <div className="card">
                  {/* 이미지 표시 부분 */}
                  <img
                    src={menu.menuImage || `http://localhost:8080/path/to/image/${menu.attachNo}`}
                    className="card-img-top"
                    alt={menu.menuName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{menu.menuName}</h5>
                    <p className="card-text">{menu.menuContent}</p>
                    <p className="card-text">{menu.menuPrice}원</p>
                    <button className="btn btn-primary" onClick={() => handleEditMenu(menu)}>수정</button>
                    <button className="btn btn-danger" onClick={() => deleteMenu(menu)}>삭제</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
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
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>닫기</button>
              <button type="button" className="btn btn-primary" onClick={addMenu}>등록하기</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" ref={bsModal2} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">수정</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <input type="text" className="form-control" name="menuTypeName" onChange={changeInfo} value={menuType.menuTypeName} />

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal2}>닫기</button>
              <button type="button" className="btn btn-primary" onClick={updateMenuType}>변경하기</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" ref={deleteModal} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
       <div className="modal fade" ref={bsModal2} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">수정</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <input type="text" className="form-control" name="menuTypeName" onChange={changeInfo} value={menuType.menuTypeName} />

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal2}>닫기</button>
              <button type="button" className="btn btn-primary" onClick={updateMenuType}>변경하기</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" ref={deleteModal} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
      <div className="modal fade" ref={deleteMenuModal} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
