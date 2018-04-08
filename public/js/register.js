$(".submit").click(()=>{
    let form = $("#form").serializeArray();
    let formObject = JSON.parse(JSON.stringify(form));
    let password;
    let checkPassword;

    for(let item of formObject){ 
        
        if(!item.value){
            alert('有欄位沒填寫！');
            return;
        }else{
            if(item.name ==='password'){
                password = item.value;
            }
            if(item.name ==='checkPassword'){
                checkPassword = item.value;
            }
        }
    }
    if(password !== checkPassword){
        alert('密碼與確認密碼非一致！');
        return;
    }
    
    $.ajax({
        url: "/register",
        method: "POST",
        data: form
    })
    .done(function( res ) {
        $("#form")[0].reset();
        alert(res.message);
        window.location.href = window.location.origin +'/login';
    })
    .fail(function( res ) {
        alert(textStatus);
    });

});