//Modules: Import/ Export (Nạp vào/ Xuất ra)

import logger, {
    TYPE_lOG,//bthg type
    TYPE_WARN,//cánh báo vàng
    TYPE_ERROR//lỗi đỏ
    //có thảy thay thể * as tênobj
} from './logger.js';
//nạp logger (Import default) và TYPE_lOG,TYPE_WARN,TYPE_ERROR từ file logger.js



console.log(logger)
//console.log('Text message','warn');

//Mặc định xuất ea logger
// export default logger => export default, mỗi file js chỉ export default duy nhất 1 cái.
                        // export type => export thường, có thể export nhiều cái trong file
// ===== ===== 

// Để import default: import [tên_đối_tượng_cần_import] from [địa_chỉ_file_js]
// Để import các export thường: Ta sử dụng destructuring: import { [tên_đối_tượng_cần_import] } from [địa_chỉ_file_js].
// Đối với import dạng thường, ta có thể import nhiều đối tượng. import {typelog, typewarn, typeerror} from './constants.js'

// File index.js
// Viết chi tiết
        // import logger from './logger.js'
        // export default logger

// ===== ===== 

// Viết rút gọn
        // export { default } from './logger.js'
