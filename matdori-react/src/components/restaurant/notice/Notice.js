import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Notice = () => {
  const [notice, setNotice] = useState('');
  const [newNotice, setNewNotice] = useState('');
  const [noticeLimit, setNoticeLimit] = useState(false);
  const { resNo, busId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/restaurant/notice/${resNo}`)
      .then(response => {
        setNotice(response.data);
      })
      .catch(error => {
        console.error('Error fetching notice:', error);
      });
  }, [resNo]);

  const handleInputChange = (e) => {
    if (e.target.value.length <= 1000) {
      setNewNotice(e.target.value);
      setNoticeLimit(false);
    } else {
      setNoticeLimit(true);
    }
  };

  const handleUpdateNotice = () => {
    if (newNotice.trim() !== '' && !noticeLimit) {
      axios.put(`http://localhost:8080/restaurant/notice/update/${resNo}`, { resNo, resNotice: newNotice })
        .then(response => {
          setNotice(newNotice);
          setNewNotice('');
        })
        .catch(error => {
          console.error('Error updating notice:', error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>공지 등록</h2>

          <div className="card">
            <div className="card-body">
              <textarea
                className={`form-control mb-3 ${noticeLimit ? 'is-invalid' : ''}`}
                value={newNotice}
                onChange={handleInputChange}
                style={{ height: '200px' }} // 입력창 높이 설정
                placeholder='신규 공지 등록 
                공지는 1000자 이내로 입력해주세요 '
              />
              {noticeLimit && <div className="invalid-feedback">공지는 최대 1000자까지 등록 가능합니다.</div>}
              <button
                className="btn btn-primary mb-3 btn-warning"
                onClick={handleUpdateNotice}
              >
                등록하기
              </button>
              <p>등록된 공지: {notice}</p>

              <div className="d-flex justify-content-between align-items-end mt-3">
                <small className="text-muted">
                  <small>공지는 한 번에 하나만 등록할 수 있습니다.</small>
                </small>
                <small>
                  <Link to={`/business/${busId}/${resNo}`} className="btn btn-primary btn-sm">
                    매장 관리로 돌아가기
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Notice;
