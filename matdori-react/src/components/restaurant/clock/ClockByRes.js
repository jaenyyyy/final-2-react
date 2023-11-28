import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { busIdState } from '../../../recoil';
import { IoTime } from "react-icons/io5";

// 요일 설정 공간
export const WorkdayManager = () => {
  const { resNo } = useParams();
  const [workdays, setWorkdays] = useState([]);
  const dayOrder = ['월', '화', '수', '목', '금', '토', '일'];

  useEffect(() => {
    axios.get(`http://localhost:8080/workday/resList/${resNo}`)
      .then(response => {
        const sortedData = response.data.sort(
          (a, b) => dayOrder.indexOf(a.workdayName) - dayOrder.indexOf(b.workdayName)
        );
        setWorkdays(sortedData);
      })
      .catch(error => {
        console.error('요일 데이터를 가져오는데 실패했습니다.', error);
      });
  }, [resNo]);

  const toggleWorkday = (workday) => {
    // 서버에 변경을 요청합니다. 여기서는 notWorkday 값을 변경하지 않습니다.
    axios.put(`http://localhost:8080/workday/update`, workday)
      .then(response => {
        // 서버로부터 업데이트된 workday 객체를 받습니다.
        const updatedWorkday = response.data;

        // 클라이언트의 상태를 업데이트합니다.
        setWorkdays(currentWorkdays =>
          currentWorkdays.map(wd =>
            wd.workdayNo === updatedWorkday.workdayNo ? updatedWorkday : wd
          )
        );
      })
      .catch(error => {
        console.error('상태 업데이트에 실패했습니다.', error);
      });
  };

  return (
    <div className="workday-container">
      {workdays.map(workday => (
        <div key={workday.workdayNo} className="d-flex align-items-center mb-2">
          <span className="me-2">{workday.workdayName}</span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id={`switch-${workday.workdayNo}`}
              checked={workday.notWorkday === 'N'}
              onChange={() => toggleWorkday(workday)}
            />
            <label className="form-check-label" htmlFor={`switch-${workday.workdayNo}`}>
              {workday.notWorkday === 'N' ? '영업일' : '휴무일'}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};



//  여긴 시간설정 공간입니다
const ClockByRes = () => {
  const busId = useRecoilValue(busIdState);
  const { resNo } = useParams();
  const [times, setTimes] = useState([]);
  const [eatingTime, setEatingTime] = useState('');
  const [clock2No, setClock2No] = useState('');
  const [time, setTime] = useState('');
  const [dateTime, setDateTime] = useState(new Date());




  useEffect(() => {
    loadTotalClock();
  }, [])

  const loadTotalClock = () => {
    axios.get(`http://localhost:8080/clock2/resList/${resNo}`)
      .then(response => {
        setTimes(response.data);
        SetTimeList(response.data.map(a => ({
          clock2ResNo: a.clock2ResNo,
          clock2Select: a.clock2Select.substring(11, 16),
          clock2EatingTime: a.clock2EatingTime,
          clock2No: a.clock2No
        })));
      })
      .catch(err => {
        console.error('리스트받아오기 안됨');
      })
  };

  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const formattedDateTime = formatDateTime(dateTime);

  const [timeList, SetTimeList] = useState([]);
  console.log(timeList);

  useEffect(() => {
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      const updatedDateTime = new Date(dateTime.setHours(hours, minutes));
      setDateTime(updatedDateTime);
    }
  }, [time]);


  const handleAddTime = () => {
    const confirmAdd = window.confirm("해당 시간을 등록하시겠습니까?");
    const All = ({
      clock2Select: formattedDateTime,
      clock2No: clock2No,
      clock2ResNo: resNo,
      clock2EatingTime: eatingTime,

    })

    if (confirmAdd) {
      axios({
        url: `http://localhost:8080/clock2/insert`,
        method: "post",
        data: All,
      })
        .then(response => {

          loadTotalClock();
        })

    }
  };

  //   const handleDeleteTime = (time.clock2No) => {
  //     const confirmDelete = window.confirm('이 시간을 삭제하시겠습니까?');

  //     if (confirmDelete) {
  //       axios.delete(`http://localhost:8080/clock2/delete/${time.clock2No}`)
  //         .then(response => {
  //           // 삭제 후 처리 로직
  //           console.log('삭제 완료', response);
  //           // 데이터를 다시 불러오거나 상태 업데이트 등의 작업을 수행할 수 있습니다.
  //         })
  //         .catch(error => {
  //           console.error('삭제 중 오류 발생:', error);
  //           // 오류 처리 로직
  //         });
  //     }
  //   };

  // const deleteMenu = (menu) => {
  //     console.log(menu);
  //     setMenuData({ ...menu })
  //     setCurrentMenuTypeNo(menu.menuTypeNo); // 현재 선택된 메뉴 타입 번호를 상태로 설정
  //     openDeleteMenuModal();

  const handleDeleteTime = (timeList) => {
    console.log(timeList);
    setTimes({ ...timeList })

    const confirmDelete = window.confirm('이 시간을 삭제하시겠습니까?');

    if (confirmDelete) {
      axios.delete(`http://localhost:8080/clock2/delete/${timeList.clock2No}`)
        .then(() => {
          console.log('삭제 완료');
          loadTotalClock(); // 목록 새로고침
        })
        .catch(error => {
          console.error('삭제 중 오류 발생:', error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <WorkdayManager />
      <div className="row mt-4 offset-1">
        <div className="row">
          <div className="col">
            <h1><IoTime style={{ color: '#FFB416' }} /> 시간 관리</h1>
          </div>
        </div>
      </div>

      <div className="row mt-4 offset-1">
        <div className="col-4">
          <h5>시간을 등록해주세요</h5>
        </div>
      </div>

      <div className="row mt-2 offset-1">
        <div className="col">
          <input
            type="time" className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="09:00 형식으로 입력"
          />
        </div>
        <div className="col">
          <input
            type="text" className="form-control"
            value={eatingTime}
            onChange={(e) => setEatingTime(e.target.value)}
            placeholder="테이블 이용 시간"
          />
        </div>
        <div className="col">
          <button className="btn btn-warning" onClick={handleAddTime}>등록</button>
        </div>
      </div>

      <div className="row mt-4 offset-1">
        <div className="col-8 mb-2">
          {timeList.map((timeList) => (
            <div className="form-control mb-2 text-center p-4" key={timeList.clock2No}>
              <div className="row">
                <div className="col">
                  <h4>{timeList.clock2Select}</h4>
                </div>
                <div className="col">
                  <h4>( <span>{timeList.clock2EatingTime}</span> 분 )</h4>
                </div>
                <div className="col">
                  <button className="btn btn-secondary" onClick={() => handleDeleteTime(timeList)}>삭제</button>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default ClockByRes;
