
$("#password").focus(function() {
	if ($(this).attr("type") == "text")
		$(this)[0].type = "password";
});

var flags = [ false, false, false, false ];
var num = /^[0-9]*$/;
var psw = /(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,}$/

function r_phone() {
	var phone=$("#phone");
	var phone_v =phone.val();
	if (phone_v.length == 0 || !num.test(phone_v) || phone_v.length > 20) {
		/*phone.css({
			border: '2px solid #EB5242'
		});*/
		$("#submit1").attr("disabled", "disabled");
		flags[0] = false;
		$("#register_phone span").remove();
		phone.after("<span class='error'>电话号为纯数字</span>");

	} else {
		/*phone.css({
			border: '1px solid #00CC00'
		});*/
		$.post("user_isPhoneNumRepeat.do", { users_phonenum : phone_v },
				   function(data){
				     if(data.isRepeat == "0"){
				    	 $("#register_phone span").remove();
					 		flags[0] = true;
					 		$("#error span").html("");
					 		enableSubmit(res);
				     }else if (data.isRepeat == "1"){
				        $("#submit1").attr("disabled", "disabled");
				 	 	flags[0] = false;
				 	 	$("#register_phone span").remove();
				 		phone.after("<span class='error'>账号已存在</span>");
				     }
				   }, "json");
		
	}
	
}

function r_qq() {
	var qq =$("#qq");
	var qq_v = qq.val();
	if (qq_v.length == 0 || !num.test(qq_v) || qq_v.length > 20) {
		/*qq.css({
			border: '2px solid red'
		});*/
		/*$("#error span").html("QQ号为纯数字");*/
		$("#submit1").attr("disabled", "disabled");
		flags[1] = false;
		$("#register_qq span").remove();
		qq.after("<span class='error'>QQ号为纯数字</span>");

	} else {
		/*qq.css({
			border: '2px solid #00CC00'
		});*/
		$("#register_qq span").remove();
		flags[1] = true;
		$("#error span").html("");
		enableSubmit(res);
	}
}
function r_password() {
	var password=$("#password");
	var password_v = password.val();
	var repeat = $("#repeat");
	var repeat_v=repeat.val();

	if (password_v.length == 0 || !psw.test(password_v) || password_v.length > 20) {
		/*password.css({
			border: '2px solid red'
		});*/
		/*$("#error span").html("密码由数字和字母组成且最少6位");*/
		$("#submit1").attr("disabled", "disabled");
		flags[2] = false;
		$("#register_password span").remove();
		password.after("<span class='error'>6～20位数字和字母</span>");
	} else {
		/*password.css({
			border: '2px solid #00CC00'
		});*/
		$("#register_password span").remove();
		flags[2] = true;
		$("#error span").html("");
		enableSubmit(res);
		if (repeat_v.length > 0) {
			r_repeat();
		}
	}
}
function r_repeat() {
	var password=$("#password");
	var password_v = password.val();
	var repeat = $("#repeat");
	var repeat_v=repeat.val();

	if (password_v != repeat_v) {
		/*repeat.css({
			border: '2px solid red'
		});*/
/*		$("#error span").html("两次密码不一致");
*/		$("#submit1").attr("disabled", "disabled");
		flags[3] = false;
		$("#register_repeat span").remove();
		repeat.after("<span class='error'>两次密码不一致</span>");
	} else {
		/*repeat.css({
			border: '2px solid #00CC00'
		});*/
		$("#register_repeat span").remove();
		flags[3] = true;
		$("#error span").html("");
		enableSubmit(res);
	}
	if (password_v.length > 0) {
		if (password_v.length == 0 || !psw.test(password_v) || password_v.length > 20) {
			/*$("#error span").html("密码由数字和字母组成且最少6位");*/
			/*repeat.css({
				border: '2px solid red'
			});*/
			$("#register_repeat span").remove();
			repeat.after("<span class='error'>6～20位数字和字母</span>");
			$("#submit1").attr("disabled", "disabled");
			flags[2] = false;
		}
	}
}


function enableSubmit(bool) {
	if (flags[0] && flags[1] && flags[2] && flags[3] && res == true) {
		if (bool) {
			$("#submit1").removeAttr("disabled");
		} else
			$("#submit1").attr("disabled", "disabled");
	} else {
		$("#submit1").attr("disabled", "disabled");
	}
}
