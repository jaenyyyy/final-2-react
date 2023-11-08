//백엔드의 HttpSession 대신 사용하는 저장소
//recoil 저장소에서 사용할 값들을 정의하고 외부로 export
//- 회원의 아이디(busId)
import {atom} from "recoil";
const busIdState = atom({
    key:"busIdState",//식별값(왠만하면 변수명과 통일)
    default:''//기본값(원래는 비어있어야 되지만 테스트를 위해 기본아이디를 설정)
})

const busLevelState = atom({
    key:"busLevelState",
    default:"일반"
});

export {busIdState, busLevelState};//name export(외부에서 골라 쓸 수 있도록 여러개를 객체로 export)