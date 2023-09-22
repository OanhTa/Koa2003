
//C2
function Validator(formSeletor){

    var _this = this;
    var formRules = {};

    function getParent(element,selecter){
        while(element.parentElement){
            if(element.parentElement.matches(selecter)){
                return element.parentElement
            }
            element = element.parentElement;
        }
    }

    //Quy ước tạo rule (có lỗi=>mess| không lỗi=>underfined)
    var validatorRules = {
        required: function(value){
            return value ? undefined : 'Vui lòng nhập trường này'
        },
        email: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        },
        min: function(min){
            return function(value){
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`
            }
        },
        max: function(max){
            return function(value){
                return value.length <= max ? undefined : `Vui lòng nhập ít nhất ${max} ký tự`
            }
        },
    };

    var formElement = document.querySelector(formSeletor);
    if(formElement){
        var inputs = formElement.querySelector('[name][rules]');

        //lặp qua từng input
        for(var input of inputs){
            var rules = input.getAttribute('rules').split('|');
            //tách chuỗi thành (bằng |) thành mảng các phần tử=> "required|email" => [required,email,min:6]
            
            for(var rule of rules){

                var isRuleHasValue = rule.includes(':');
                var ruleInfo;
                if(isRuleHasValue){
                    ruleInfo = rule.split(':');
                    //[min,6]
                    rule = ruleInfo[0];//required,email,min
                }

                var ruleFunc = validatorRules[rule];
                if(isRuleHasValue){
                    ruleFunc = validatorRules[rule](ruleInfo[1]);
                    //truyền đối só cho hàm min=> kq: f(value)
                }

                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(validatorRules[rule]);
                    //{'email': [f(value),f(value)]}
                }else{
                    formRules[input.name] = [validatorRules[rule]];
                    //{'email': [f(value)]}
                }
            }

            //Lắng nghe sự kiện để validate( blur,change)
            
            input.onblur = handleValidate;
            input.oninput = handleClearErr;
        }
        //Ham thuc hien validate
        function handleValidate(event){
            var rules = formRules(event.target.name)//[f(value),f(value)]
            var errMessage;
            
            for( var rule of rules){
                errMessage = rule(event.target.value)
                if(errMessage) break;
            }

            //nếu có lỗi thì hiển thị mess ra web
             if(errMessage){
                var formGroup = getParent(event.target,'.form-group')
                if(formGroup){
                    var formMesage = formGroup.querySelector('.form-message');
                    if(formMesage){
                        formMesage.innerText = errMessage;
                        formGroup.classList.add('invalid');
                    }
                }
            }
            return !errMessage;//KHÔNG LỖI = true
        }
        //Hàm clear mess lỗi
        function handleClearErr(event){
            var formGroup = getParent(event.target,'.form-group')
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid');

                var formMesage = formGroup.querySelector('.form-message');
                if(formMesage){
                    formMesage.innerText = '';
                }
            }
        }
    }

    //xử lý hành vi submit form
    formElement.onsubmit = function(event){
    event.preventDefault();

    var inputs = formElement.querySelector('[name][rules]');
    var isValid = true;

    //lặp qua từng input
    for(var input of inputs){
        if(!handleValidate({target: input})){
            //!!errMessage => có lỗi
            isValid = false;
        }
    }
    //Khi không có lỗi thì submitform
    if(isValid){

        if(typeof _this.onSubmit === 'function'){

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
            return _this.onSubmit(formValues);
        }

        formElement.sumbit();
    }

    }
}

