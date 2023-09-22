//import { createStore } from 'https://cdn.skypack.dev/redux';

//------------------MY REDUX------------------------
function createStore(reducer){
    let state = reducer(undefined,{})
    const subscribers = [];

    return{
        getState(){
            return state
        },
        dispatch(action){
            state = reducer(state,action)

            subscribers.forEach(subscriber=> subscriber())
            //mỗi sub con đều là hàm 
        },
        subscribe(subscriber){
            subscribers.push(subscriber);

        }
    }
}





//------------------MY APP---------------------------
const initState = 0;
//Reduce
function bankReducer(state = initState, action){
    switch(action.type){
        case 'DEPOSIT':
            return state + action.payload;
        case 'WITHDRAW':
            return state - action.payload;
        default:
            return state
    }
}

//store
const store = window.store = createStore(bankReducer)

//TEST
console.log(store)//obj
console.log(store.getState())//trả lại state đã cập nhập( hiện tại)
//console.log(store.dispatch())//chuyển dữ liệu obj mô tả action(even) đến Store
//console.log(store.subscribe())//thông báo dạng callback sau khi state dc cập nhập

//Action
function actionDeposit(payload){
    return{
        type: 'DEPOSIT',
        payload
    }
}
function actionWithdraw(payload){
    return{
        type: 'WITHDRAW',
        payload
    }
}

//DOM event
const desposit = document.querySelector('#deposit')
const withdraw = document.querySelector('#withdraw')

//Event handler
desposit.onclick = function(){
    store.dispatch(actionDeposit(10))
}
withdraw.onclick = function(){
    store.dispatch(actionWithdraw(10))
}

//Listener
store.subscribe(()=>{
    render();
})

//Render
function render(){
    const output = document.querySelector('#output')
    output.innerText = store.getState();
}
render();