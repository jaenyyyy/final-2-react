import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Notice = () => {
  const [notice, setNotice] = useState('');
  const [newNotice, setNewNotice] = useState('');
  const { resNo } = useParams();

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
    setNewNotice(e.target.value);
  };

  const handleUpdateNotice = () => {
    axios.put(`http://localhost:8080/restaurant/notice/${resNo}`, { newNotice })
      .then(response => {
        setNotice(`${newNotice}`);
        //setNewNotice('');
      })
      .catch(error => {
        console.error('Error updating notice:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <textarea
                className="form-control mb-3"
                value={newNotice}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-primary mb-3"
                onClick={handleUpdateNotice}
              >
                공지 등록하기
              </button>
              <p>{JSON.stringify(notice)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
