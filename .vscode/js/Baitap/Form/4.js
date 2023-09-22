// Đối tượng `Validator`
function Validator(options) {
    
    //hàm lấy thẻ cha group
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};
    // Hàm thực hiện validate của lần lượt các inputElement 
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector cho vào obj
        var rules = selectorRules[rule.selector];//[f()], [f()] cảu từng selector là kết quả bên dưới
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                        //checkbox không lấy value mà lấy thẻ dc check=> gender:checked
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
                    //từng f(selector) và lấy value => errorMessage= 'Trường này....'(khi người dùng không nhập value nó sẽ hiện value mess lỗi)
                }
            if (errorMessage) break;//chỉ cần có 1 errorMessage(1 f()) thì thoát
        }
        
        //nếu có lỗi thì thêm text và đổi màu đỏ (khi blur khỏi input)
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    
    //Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {

        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();//bỏ hànha vi mặc định chuyển đến trang khác

            var isFormValid = true;

            // Lặp qua từng rules([f()], [f()] từng selector lại để lấy validate
            //khi bấm vào submit thì báo lỗi tất cả rule khi chưa nhập
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                // isValid = !errMessage = underfined = false=>(k lỗi)
                if (!isValid) {
                    isFormValid = false;//có lỗi
                }
            });
            //Lấy dữ liệu ng dung nhạp khi submit( trong TH k có lỗi nào => isFormValis = true)
            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    //gọi lại hàm onsubmit và trả về giá trị của form
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        //1-- Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
                //vơi lần sau  khi cùng selector qua lặp foreach ta thêm phần tử vào mảng=>thu được mảng gômg những hàm test cùng selector
                //[f(), f()] =>selectorRules = {email: [f(), f()]}
            } else {
                selectorRules[rule.selector] = [rule.test];
                //vơi selecter gọi đến lần 1 obj['email']=[f]=>{email: [f()]}
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            //inputElements là nodelist chuyển thành mảng
            Array.from(inputElements).forEach(function (inputElement) {
               // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                } 
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || 'Trường này phải là email';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}
