//백엔드의 HttpSession 대신 사용하는 저장소
//recoil 저장소에서 사용할 값들을 정의하고 외부로 export

//- 회원의 아이디(busId)
import {atom, useRecoilState} from "recoil";
const busIdState = atom({
    key:"busIdState",//식별값(왠만하면 변수명과 통일)
    default:''//기본값
});

export const useSetBusId = () => {
    const [busId, setBusId] = useRecoilState(busIdState);

    const setLoggedInBusId = (id) => {
        setBusId(id);
        localStorage.setItem('loggedInBusId', id); // busId를 로컬 스토리지에 저장
    };

    // 기존 값을 불러올 경우
    const storedBusId = localStorage.getItem('loggedInBusId');
    if (storedBusId) {
        setBusId(storedBusId); // 저장된 busId를 Recoil 상태에 설정
    }

    return setLoggedInBusId;
};

export {busIdState};//name export(외부에서 골라 쓸 수 있도록 여러개를 객체로 export)