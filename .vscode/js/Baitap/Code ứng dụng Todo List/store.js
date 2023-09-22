import { createStore } from "./core.js";
import  reducer  from "./reducer.js";
import withLogger from './logger.js'

const { attach,connect, dispatch} = createStore(withLogger(reducer));
//kết quả của hàm cre được gán vào obj

window.dispatch = dispatch

export {
    attach,
    connect
}
