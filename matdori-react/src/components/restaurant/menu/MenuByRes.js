import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MenuByRes = () => {
  const { resNo } = useParams();
  const [menuTypeList, setMenuTypeList] = useState([]);
  const [selectedMenuType, setSelectedMenuType] = useState(null);
  const [editingMenuTypeNo, setEditingMenuTypeNo] = useState(null);
  const [newMenuType, setNewMenuType] = useState({ menuTypeName: "", resNo: resNo }); // 추가
  const [menuTypeUpdates, setMenuTypeUpdates] = useState({}); // 추가


  useEffect(() => {
    axios
      .get(`http://localhost:8080/menuType/list/${resNo}`)
      .then((response) => {
        setMenuTypeList(response.data);
      })
      .catch((error) => console.error('Error fetching menu types:', error));
  }, [resNo]);

  const toggleMenuDetails = (menuType) => {
    const url = `http://localhost:8080/menu/${menuType.menuTypeNo}/detail`;
    console.log('Requesting URL:', url); // 이 로그를 통해 요청 URL 확인
  
    if (selectedMenuType?.menuTypeNo === menuType.menuTypeNo) {
      setSelectedMenuType(null);
    } else {
      axios.get(url)
        .then((response) => {
          setSelectedMenuType({ ...menuType, details: response.data });
        })
        .catch((error) => {
          console.error('Error fetching menu details:', error);
        });
    }
  };
//등록,수정 관련 구문
const addMenuType = () => {
  axios
    .post("http://localhost:8080/menuType/save", newMenuType)
    .then((response) => {
      setMenuTypeList([...menuTypeList, newMenuType]);
      setNewMenuType({ menuTypeName: "", resNo: resNo });
    })
    .catch((error) => {
      console.error("Error adding menu type:", error);
    });
};

const deleteMenuType = (menuTypeNo) => {
  axios
    .delete(`http://localhost:8080/menuType/delete/${menuTypeNo}`)
    .then((response) => {
      setMenuTypeList(menuTypeList.filter((menuType) => menuType.menuTypeNo !== menuTypeNo));
    })
    .catch((error) => {
      console.error("Error deleting menu type:", error);
    });
};

const handleEditClick = (menuTypeNo) => {
  setEditingMenuTypeNo(menuTypeNo);
  const menuTypeToEdit = menuTypeList.find((menuType) => menuType.menuTypeNo === menuTypeNo);
  setMenuTypeUpdates({ ...menuTypeUpdates, [menuTypeNo]: { ...menuTypeToEdit } });
};

const handleSaveClick = (menuTypeNo) => {
  axios
    .put(`http://localhost:8080/menuType/update/${menuTypeNo}`, menuTypeUpdates[menuTypeNo])
    .then((response) => {
      setEditingMenuTypeNo(null);
      setMenuTypeList(menuTypeList.map((menuType) => 
        menuType.menuTypeNo === menuTypeNo ? menuTypeUpdates[menuTypeNo] : menuType
      ));
    })
    .catch((error) => {
      console.error("Error updating menu type:", error);
    });
};
const [editingMenuId, setEditingMenuId] = useState(null); // 현재 수정 중인 메뉴 ID
const [menuUpdates, setMenuUpdates] = useState({});      // 수정된 메뉴 값 저장

  
  return (
    <div className="container mt-5">
      <h1>메뉴 관리</h1>
      <div>
        <input
          type="text"
          placeholder="새 메뉴 타입 이름"
          value={newMenuType.menuTypeName}
          onChange={(e) => setNewMenuType({ ...newMenuType, menuTypeName: e.target.value })}
        />
        <button onClick={addMenuType}>추가</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>메뉴 타입 이름</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {menuTypeList.map((type) => (
            <React.Fragment key={type.menuTypeNo}>
              <tr onClick={() => toggleMenuDetails(type)} style={{ cursor: 'pointer' }}>
                <td>{type.menuTypeName}</td>
                <td>
                  {editingMenuTypeNo === type.menuTypeNo ? (
                    <>
                      <button onClick={() => handleSaveClick(type.menuTypeNo)}>저장</button>
                      <button onClick={() => setEditingMenuTypeNo(null)}>취소</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(type.menuTypeNo)}>수정</button>
                      <button onClick={() => deleteMenuType(type.menuTypeNo)}>삭제</button>
                    </>
                  )}
                
                  </td>
              </tr>
              {selectedMenuType?.menuTypeNo === type.menuTypeNo && (
                <tr>
                  <td colSpan="2">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>메뉴 이름</th>
                          <th>가격</th>
                          <th>내용</th>
                          <th>첨부 번호</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedMenuType.details.map((menu) => (
                          <tr key={`${selectedMenuType.menuTypeNo}-${menu.menu_no}`}>
                            <td>{menu.menu_name}</td>
                            <td>{menu.menu_price}</td>
                            <td>{menu.menu_content}</td>
                            <td>{menu.attach_no}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuByRes;