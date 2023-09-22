//Optional chaining(?.)=>Chuỗi tuỳ chọn
//sd khi không chắc chắn các key có tồn tại hay không
//  obj.val?.prop, obj.arr?.[prop], obj.func?.[prop]
const obj = {
    getName(value){
        console.log(value)
    }
}
obj.getName?.(123);