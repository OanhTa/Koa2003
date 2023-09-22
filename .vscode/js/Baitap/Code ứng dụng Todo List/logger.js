export default function Logger(reducer){
    return (prevState, action, args)=>{
        const nextState = reducer(prevState,action,args)
        return nextState
    }
}