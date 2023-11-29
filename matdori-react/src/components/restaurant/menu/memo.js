import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { busIdState } from '../../../recoil';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClockByRes = () => {
    const busId = useRecoilValue(busIdState);
    const { resNo } = useParams();
    const [workdays, setWorkdays] = useState({
        월: 'N',
        화: 'N',
        수: 'N',
        목: 'N',
        금: 'N',
        토: 'N',
        일: 'N',
    });
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [resClockList, setResClockList] = useState([]);

    useEffect(() => {
        loadClockList();
    }, [resNo]);

    const loadClockList = () => {
        axios.get(`http://localhost:8080/clock/list/${resNo}`)
            .then(response => {
                setResClockList(response.data);
            })
            .catch(err => {
                window.alert("통신 오류 발생");
            });
    };

    const toggleDay = (day) => {
        setWorkdays(prev => ({
            ...prev,
            [day]: prev[day] === 'N' ? 'Y' : 'N'
        }));
    };

    const handleTimeChange = (time) => {
        setSelectedTimes(prev => {
            return prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time];
        });
    };

    const saveSettings = async () => {
        // 설정 저장 로직 구현
    };

    const renderTimeSlots = () => {
        return resClockList.map((clock) => {
            const clockTime = clock.clockSelect.substring(11, 16);
            return (
                <div key={clock.clockNo} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="checkbox"
                            checked={selectedTimes.includes(clock.clockTime)}
                            onChange={() => handleTimeChange(clock.clockTime)}
                        />
                        {clock.clockTime}
                    </label>
                </div>
            );
        });
    };

    return (
        <>
            <div>
                {Object.entries(workdays).map(([day, status]) => (
                    <button
                        key={day}
                        style={{ backgroundColor: status === 'N' ? 'yellow' : 'grey' }}
                        onClick={() => toggleDay(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>
            <div>
                {renderTimeSlots()}
            </div>
            <button onClick={saveSettings}>저장</button>
        </>
    );
};

export default ClockByRes;
