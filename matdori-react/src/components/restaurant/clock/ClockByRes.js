import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { busIdState } from '../../../recoil';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClockByRes = () => {
    const busId = useRecoilValue(busIdState);
    const { resNo } = useParams();
    const [workdays, setWorkdays] = useState({
        월: 'N', 화: 'N', 수: 'N', 목: 'N', 금: 'N', 토: 'N', 일: 'N',
    });
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [resClockList, setResClockList] = useState([]);

    useEffect(() => {
        const loadClockList = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/clock/list/${resNo}`);
                setResClockList(response.data);
            } catch (error) {
                console.error("시간 데이터 로드 중 오류 발생", error);
                window.alert("통신 오류 발생");
            }
        };

        loadClockList();
    }, [resNo]);

    const toggleDay = (day) => {
        setWorkdays(prevWorkdays => ({
            ...prevWorkdays,
            [day]: prevWorkdays[day] === 'N' ? 'Y' : 'N'
        }));
    };

    const handleTimeChange = (time) => {
        setSelectedTimes(prevSelectedTimes => (
            prevSelectedTimes.includes(time) ?
            prevSelectedTimes.filter(t => t !== time) :
            [...prevSelectedTimes, time]
        ));
    };

    const saveSettings = async () => {
        // 설정 저장 로직을 여기에 구현합니다...
    };

    const renderTimeSlots = () => {
        return resClockList.map((clock) => {
            const clockTime = clock.clockSelect.substring(11, 16);
            return (
                <div key={clock.clockNo} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="checkbox"
                            checked={selectedTimes.includes(clockTime)}
                            onChange={() => handleTimeChange(clockTime)}
                        />
                        {clockTime}
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
            <button onClick={saveSettings}>
                저장
            </button>
        </>
    );
};

export default ClockByRes;
