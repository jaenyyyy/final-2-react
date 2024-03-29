import { useRecoilState } from "recoil";
import { companyState, userState } from "../recoil";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

const DeptInsert = () => {
    //세션스토리지 아이디만 저장
    ///****전체적으로 모달 닫을때 초기화 시키기

    const [comId] = useRecoilState(companyState);
    const [deptList, setDeptList] = useState([]);


    const [newData, setNewData] = useState();
    ///그냥 모달을 여는거로 합시다! 못해먹겠습니다!
    useEffect(() => {
        console.log(comId)
        loadDetpList();
        loadPosition();
    }, [])
    const clearDept = () => {
        setDept({
            deptNo: "",
            deptName: "",
            comId: comId
        })
    }

    const [dept, setDept] = useState({
        deptNo: 0,
        deptName: "",
        comId: comId
    })

    const changeInfo = (e) => {
        setDept({
            ...dept,
            [e.target.name]: e.target.value
        })


    };
    //-----부서 추가 버튼을 누르면 input창이 보이게
    const deptInsert = () => {
        //추가할 부분 같은 이름의 부서가 있을 경우 등록이 안되게 해야함
        axios({
            url: `http://localhost:8080/dept/`,
            method: 'post',
            data: {
                deptName: dept.deptName,
                comId: comId
            }
        }).then(response => {
            console.log(response.data)
            alert("성공!")
            loadDetpList();
        }
        );


    };

    const loadDetpList = () => {
        axios({
            url: `http://localhost:8080/dept/listByCompany/${comId}`,
            method: "get"


        }).then((response) => {
            setDeptList(response.data);
            console.log(response.data)
        });
    };

    const updateDept = () => {
        console.log(dept.deptNo)
        delete dept.comId;
        axios({
            url: `http://localhost:8080/dept/update/${dept.deptNo}`,
            method: "put",
            data: { deptName: dept.deptName }

        }).then(response => {
            console.log(response.data)
            closeModal();
            loadDetpList();
            alert("수정완료")
        });

    };
    //부서명 변경

    //--------------모달 열고 닫기 
    const bsModal = useRef();
    const bsModal2 = useRef();
    const deletModal =useRef();
    const openModal = () => {
        const modal = new Modal(bsModal.current);
        modal.show();
    };
    const closeModal = () => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();

        // clearProfile();
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
    const openDeletModal = () => {
        const modal = new Modal(deletModal.current);
        modal.show();
    };
    const closeDeletModal = () => {
        const modal = Modal.getInstance(deletModal.current);
        modal.hide();

        // clearProfile();
    };

    //초기값 false

    //------------부서명 수정
    const changeDeptName = (target) => {
        setDept({ ...target })
        openModal();

    };


    //------------부서 삭제 부서 인원이 없을경우
    //------------인원 추가 이동(백부터 만들어야함)
    const addEmp = (target) => {
        setDept({ ...target })
        console.log(target)
        openModal2();
    };
    //회사아이디는 세션에ㅐ 있는 값을 가져와서 하고 
    //dept는 클릭했을때 번호가 생성이 되고 
    const deptDelete = (target) => {
        setDept({...target})
        openDeletModal();
    }
    const removeDept =()=>{
        axios({
            url:`http://localhost:8080/dept/deleteDept/${dept.deptNo}`,
            method:'delete'
        }).then(response=>{
            if(response.data ==null){alert("실패")}
            else{alert("삭제되었습니다")}
            closeDeletModal();
            setDept('');

            loadDetpList();
        }

        );
    };


    /////-------------직급 등록
    const [positionData, setPositionData] = useState({
        comId: comId,
        empPositionName: "",
        empPositionOrder: ''
    });
    const changePositionData = (e) => {
        setPositionData({
            ...positionData,
            [e.target.name]: e.target.value
        })
    };


    const addPosition = () => {

        axios({
            url: "http://localhost:8080/empPosition",
            method: "post",
            data: positionData
        }).then(response => {
            if (response.data != null) {
                alert("성공")
            }

            setPositionData('')
        });
    };
    ///--사원 불러오기
    const [empList, setEmpList] = useState([]);

    // const cellClick = (target) => {
    //     setDept({ ...target })
    //     loadEmpList();
    // };
    const cellClick = (target) => {
        axios({
            url: `http://localhost:8080/emp/empListByDeptCom`,
            method: 'post',
            data: {
                menuTypeNo: target.menuTypeNo,
                comId: comId
            }
        }).then(response => {
            console.log(response.data);
            setEmpList(response.data);
        });
    };


    


    






    const clearEmpList = () => {
        setEmpList({
            comId: "",
            deptNo: '',
            empEmail: '',
            empId: '',
            empName: "",
            empPositionName: "",
            empTel: ""
        })
    }


    ///----사원 등록 
    const [empData, setEmpData] = useState({
        comId: comId,
        deptNo: dept.deptNo,
        empName: "",
        empPw: "testpw",
        empTel: "",
        empPositionNo: 0,
        empEmail: ""
    });

    const [salData, setSalData] = useState({
        salAnnual: 0
    });

    const changeSalChange = (e) => {
        console.log(dept.deptNo)
        setSalData({
            ...salData,
            [e.target.name]: e.target.value,
        });
    };



    const changeEmpChange = (e) => {
        setEmpData({
            ...empData,
            [e.target.name]: e.target.value,
            deptNo: dept.deptNo
        });
    };

    const addEmployee = () => {
        // 서버에 데이터 전송
        axios({
            url: "http://localhost:8080/emp/addEmp/", // 실제 API 엔드포인트로 변경
            method: "post",
            data: {
                empDto: {
                    comId: comId,
                    deptNo: dept.deptNo,
                    empName: empData.empName,
                    empPw: empData.empPw,
                    empTel: empData.empTel,
                    empPositionNo: empData.empPositionNo,
                    empEmail: empData.empEmail
                },
                salDto: {
                    salAnnual: salData.salAnnual,
                }
            }
        }).then(response => {
            if (response.data != null) {
                alert("성공");
                closeModal2()
                loadDetpList();
            }

            // 성공 후에 상태 초기화 또는 필요한 작업 수행

        }).catch(error => {
            console.error("에러 발생:", error);
            // 에러 처리 로직 작성 가능
        });
    };

    //--부서 불러오기

    const [positionList, setPositionList] = useState([]);
    const loadPosition = () => {
        axios({
            url: `http://localhost:8080/empPosition/position/${comId}`,
            method: "get"
        }).then(response => {
            console.log(response.data)
            setPositionList(response.data);
        });
    }




    //부서 삭제 부서인원이 0 명이면 삭제 가능하게


    ///부서 이동 update dept
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [empInfo, setEmpInfo] = useState({
        empId: "",
        deptNo: '',
        empExit: '',

    });

    const changeEmpDept = (target) => {
        setEmpInfo({ ...target })
        setIsDropdownOpen((prevId) => (prevId === target.empId ? null : target.empId));

    };

    const changeEmp = (e) => {
        setEmpInfo({
            ...empInfo,
            [e.target.name]: e.target.value
        })
        console.log("emp={}", empInfo)

    };

    const transDept = () => {
        axios({
            url: `http://localhost:8080/emp/updateDept/${empInfo.empId}`,
            method: 'put',
            data: {
                deptNo: empInfo.deptNo
            }
        }).then(response => {
            console.log(response.data)
            if(response.data === null){alert("실패했습니다")}
            else{alert("성공")}
            loadDetpList();
           
        });
    };
    const [isEmpLeave, setIsEmpLeave] = useState(false);

    const opneDateInput = (target) => {
        setEmpInfo(target)
        setIsEmpLeave((prevId) => (prevId === target.empId ? null : target.empId));

    }

    const [leaveData, setLeaveData] = useState({
        empId: '',
        empExit: '',
    });

    const dateChange = (e) => {
        // 인풋값이 변경될 때마다 leaveData 상태 업데이트
        setLeaveData({
            ...leaveData,
            empExit: e.target.value,
            empId: empInfo.empId
        });
        console.log("emp={}", empInfo)

    };

    const empLeave = () => {
        //empId알려주고 퇴사일 쏴주고
        axios({
            url: `http://localhost:8080/emp/updateExit/${leaveData.empId}`,
            method: "put",
            data: { empExit: leaveData.empExit }
        }).then(response => {
            console.log(response.data)
            setLeaveData("")
        });
    }









    return (

        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-10 offset-1">
                        <h1>부서관리</h1>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-3 ">
                        부서명 <input className="form-control" name="deptName" onChange={changeInfo} />
                    </div>
                    <div className="col-4 mt-4">
                        <button className="btn btn-primary" onClick={deptInsert}>추가 </button>
                    </div>
                    <div className="col-1 ">
                        정렬<input type="number" className="form-control" name="empPositionOrder" onChange={changePositionData} />
                    </div>
                    <div className="col-3 ">
                        직급 <input className="form-control" name="empPositionName" onChange={changePositionData} />
                    </div>
                    <div className="col-1 mt-4">
                        <button className="btn btn-primary " onClick={addPosition}>추가 </button>
                    </div>
                </div>


                {/* 추가할 부분 드롭다운 만들어서 부서별 인원 찾기? 안해도 될거 같긴한데 */}
                <div className="row mt-4">
                    <div className="col ">
                        <tabel className="table table-border">
                            <thead>
                                <tr>
                                    <th>부서명</th>
                                    <th>부서인원</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deptList.map((dept) => (
                                    <tr key={dept.deptNo}>


                                        <td onClick={e => cellClick(dept)}>{dept.deptName}</td>
                                        <td>{dept.empCount}</td>
                                        <td>
                                            <buttnon className="btn btn-outline-primary me-2" onClick={e => addEmp(dept)}>사원등록</buttnon>
                                            <button className="btn btn-outline-primary me-2" onClick={e => changeDeptName(dept)}>수정</button>
                                            <button className="btn btn-outline-primary" onClick={e=>deptDelete(dept)}>삭제</button>
                                        </td>


                                    </tr>

                                ))}
                            </tbody>
                        </tabel>
                    </div>
                    <div className="col ">
                        <tabel className="table table-border">
                            <thead>
                                <tr>
                                    <th>직급</th>
                                    <th>사원명</th>
                                    <th>사원번호</th>
                                    <th>Email</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empList
                                    .filter((emp) => emp.empExit === null)
                                    .map((emp) => (
                                        <tr key={emp.empId}>
                                            <td>{emp.empPositionName}</td>
                                            <td>{emp.empName}</td>
                                            <td>{emp.empId}</td>
                                            <td>{emp.empEmail}</td>
                                            <td>
                                                <button className="btn btn-outline-primary me-2" onClick={e => changeEmpDept(emp)}>부서이동</button>
                                                <button className="btn btn-outline-primary" onClick={e => opneDateInput(emp)}>퇴사처리</button>
                                                {isEmpLeave === emp.empId && (
                                                    <div className="row">
                                                        <div className="col-7">
                                                            <input type="date" className="form-control" onChange={dateChange} value={leaveData.empExit} />
                                                        </div>
                                                        <div className="col-4">
                                                            <button className="btn btn-sm btn-outline-success" onClick={empLeave} >저장</button>
                                                        </div>
                                                    </div>
                                                )}

                                                {isDropdownOpen === emp.empId && (
                                                    <div className="row">
                                                        <div className="col-7">
                                                            <select className="mt-2 form-control" name="deptNo" value={empInfo.deptNo} onChange={changeEmp}>
                                                                {deptList.map((dept, index) => (
                                                                    <option key={dept.deptNo} value={dept.deptNo}>{index + 1}.{dept.deptName}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-4">
                                                            <button className="mt-2 me-2 btn btn-sm btn-outline-primary" onClick={transDept}>변경</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </tabel>
                    </div>
                </div>
                <div className="row mt-4">

                </div>


                <div className="modal fade" ref={bsModal} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">수정</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" name="deptName" onChange={changeInfo} value={dept.deptName} />

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={updateDept}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" ref={bsModal2} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">등록</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                이름<input className="form-control" name="empName" value={empData.empName} onChange={changeEmpChange} />

                                전화번호<input  className="form-control" name="empTel" value={empData.empTel} onChange={changeEmpChange} />
                                <input type="hidden" className="form-control" name="empPw" value={empData.pw} onChange={changeEmpChange} />

                                직급선택<select className="form-control" name="empPositionNo" value={empData.empPositionNo} onChange={changeEmpChange}>
                                    {positionList.map((position) => (

                                        <option key={position.empPositionNo} value={position.empPositionNo}>{position.empPositionName}</option>

                                    ))}



                                </select>
                                email<input className="form-control" name="empEmail" value={empData.empEmail} onChange={changeEmpChange} />
                                연봉<input type="number" className="form-control" name="salAnnual" value={salData.salAnnual} onChange={changeSalChange} />


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal2}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={addEmployee}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>



         

                <div className="modal fade" ref={deletModal} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">부서 삭제</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                               {dept.empCount}{dept.deptNo}{dept.deptName}삭제하시겠습니까?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeDeletModal}>Close</button>
                                
                                <button type="button" className={` btn btn-danger ${dept.empCount !==0? 'disabled': ''}`} onClick={removeDept}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};
export default DeptInsert;