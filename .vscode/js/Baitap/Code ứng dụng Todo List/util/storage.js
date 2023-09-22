const TODOS_STORAGE_KEY = 'TODOS'
export default {
        //lấy
        get(){
            return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || []
        },
        //nhập
        set(todos){
            localStorage.setItem(TODOS_STORAGE_KEY,JSON.stringify(todos))
        }
}