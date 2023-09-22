export default function html([first,...strings],...values){
    return values.reduce(
    (acc,cur)=> acc.concat(cur,strings.shift()),
    [first]
    )
    //lặp values
    //html khi truyền chuỗi `` thì kq mảng [[chuỗi/ký tự], bien1, bien2]
    //first: "<h1>" ||string: ["</h1>\n    <ul>\n  ", "\n    </ul>\n"] ||values: false và kết quả của việc gọi phương thức map trên mảng cars 
    //[first] + [value] +  từng phần tử mảng string (ll từ đầu)
    //shift xóa đi pt đầu mảng và trả về pt đã xóa

    .filter(x => x && x !== true || x === 0)
    //filter return true => x có giá trị khác null, undefined, false, NaN, '' (chuỗi rỗng) 
    //loại bỏ giá trị true nhưng 0 vẫn đúng

    .join('')
    //nối thành chuỗi html tm các dk
}

export function createStore(reduce){
    const state = reduce()
    const roots = new Map()
    //là một obj đăc biệt có tc lặp qua và key có thể ở bất kể dạng j như obj

    function render(){
        for(const [root, component] of roots){
            //mỗi phần tử của đối tượng roots là một mảng gồm 2 phần tử
            const output = component();
            root.innerHTML = output//kq của hàm component
        }
    }

    return{
        //phương thức tạo view ra UI
        attach(component, root){
            roots.set(root, component)
            //set thêm một cặp key,value cho đối tượng Map=> roots
            render()
        },
        //Lựa chọn dữ liệu cụ thể trong store
        connect(selector = state => state){
            //selector gán kết quả mặc định là một hàm arrow function
            return component =>(props,...args) => 
            //Component({ prop1: 'value1' }, 'arg1', 'arg2');
            component(Object.assign({},props,selector(state),...args))
            //Object.assign sẽ sao chép tất cả các thuộc tính vào obj mới
            //{{}, props, selector(state),...args}
        },
        dispatch(action,...args){
            state = reduce(state, action, args)
            //state là kq reduce trước đó làm biến lưu trữ
            reduce()
        }
    }
}