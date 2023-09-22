import { createStore } from "./core.js";
import  reducer  from "./reducer.js";

const { attach,connect, dispatch} = createStore(reducer);
//kết quả của hàm cre được gán vào obj

window.dispatch = dispatch

export {
    attach,
    connect
}
