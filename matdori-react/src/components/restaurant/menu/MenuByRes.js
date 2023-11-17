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

  const openModal = () => {
    const modal = new Modal(bsModal.current);
    modal.show();
};
const closeModal = () => {
    const modal = Modal.getInstance(bsModal.current);
    modal.hide();
    //------------부서명 수정
    const changeMenuTypeName = (target) => {
      setMenuType({ ...target })
      openModal();
    };
  };

  //메뉴타입 변경
  const bsModal = useRef();

  ///--사원 불러오기
  const [menuList, setMenuList] = useState([]);

  // const cellClick = (target) => {
  //     setDept({ ...target })
  //     loadEmpList();
  // };
  const cellClick = (target) => {
    axios({
      url: `http://localhost:8080/menu/${target.menuTypeNo}/detail`,
      method: 'post',
      data: {
        menuTypeNo: target.menuTypeNo,
        resNo: resNo
      }
    }).then(response => {
      console.log(response.data);
      setMenuList(response.data);
    });
  };


  //메뉴  관련
  const clearMenuList=()=>{
    setMenuList({
      resNo:"",
      menuTypeNo:"",
      menuName:"",
      menuPrice:"",
      menuContent:"",
      attach_no:""
      });

  //메뉴 등록
      const [menuData, setMenuData] = useState({
        resNo:resNo,
      menuTypeNo:menuType.menuTypeNo,
      menuName:"",
      menuPrice:"",
      menuContent:"",
      attach_no:""
      });

  }

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
            placeholder="메뉴 타입 이름 입력" // 사용자가 입력란의 용도를 알 수 있도록 placeholder 추가
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
              <button className="btn btn-outline-primary me-2" onClick={() => addMenu(menuType)}>메뉴등록</button>
                <button className="btn btn-outline-primary me-2" onClick={() => { e => changeMenuTypeName(menuType) }}>수정</button>
                <button className="btn btn-outline-primary" onClick={() => { e => deleteMenuType(menuType) }}>삭제</button>
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
                  <img src={menu.menuImage} className="card-img-top" alt={menu.menuName} />
                  <div className="card-body">
                    <h5 className="card-title">{menu.menuName}</h5>
                    <p className="card-text">{menu.menuContent}</p>
                    <p className="card-text">{menu.menuPrice}원</p>
                    <button className="btn btn-primary">수정</button>
                    <button className="btn btn-danger">삭제</button>
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
              <h5 className="modal-title" >등록</h5>
              <button type="button" className="border-0 bg-transparent"
                onClick={closeModal}>
                <span aria-hidden="true">&times;</span>                </button>
            </div>
            <div className="modal-body">
            
    <div className="mb-3">
        <label htmlFor="menuName" className="form-label">메뉴 이름</label>
        <input type="text" className="form-control" id="menuName" name="menuName" required />
    </div>
    <div className="mb-3">
        <label htmlFor="menuPrice" className="form-label">가격</label>
        <input type="number" className="form-control" id="menuPrice" name="menuPrice" required />
    </div>
    <div className="mb-3">
        <label htmlFor="menuContent" className="form-label">설명</label>
        <textarea className="form-control" id="menuDescriptioContent" name="menuContent"></textarea>
    </div>
    <div className="mb-3">
        <label htmlFor="menuImaga" className="form-label">이미지</label>
        <input type="file" className="form-control" id="menuImage" name="menuImage" required />
    </div>
</div>
<div className="modal-footer">
    <button type="button" className="btn btn-secondary" onClick={closeModal}>닫기</button>
    <button type="button" className="btn btn-primary" onClick={addMenu}>등록하기</button>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuByRes;