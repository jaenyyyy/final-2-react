

import { atom } from "recoil";

const busIdState = atom({
  key: "busIdState",
  default: localStorage.getItem('loggedInBusId') || '',
});

const tokenState = atom({
  key: "tokenState",
  default: localStorage.getItem('loggedInToken') || '',
});

export { busIdState, tokenState };

