import { atom, useRecoilState } from "recoil";

const busIdState = atom({
  key: "busIdState",
  default: localStorage.getItem('loggedInBusId') || '', // 기본값을 localStorage에서 가져오기
});

export const useSetBusId = () => {
  const [busId, setBusId] = useRecoilState(busIdState);

  const setLoggedInBusId = (id) => {
    setBusId(id); // Recoil 상태 업데이트
    localStorage.setItem('loggedInBusId', id); // localStorage 값 설정
  };

  return setLoggedInBusId;
};

export { busIdState };
