$(document).ready(function() {
	

	var validate  = {
		input_values: {
			val1: $('#name'),
			val2: $('#email'),
			val3: $('#password'),
			val4: $('#confirmation'),
			val5: $('#checkbox'),

			val7: $('#password'),
			val8: $('#password_confirmation'),

			//settings
			val9: $('#new_email'),
			val10: $('#current_password'),
			val11: $('#new_password'),
			val12: $('#confirm_password'),
		},
		regexp: {
			username: /^(([a-zA-Z0-9а-яА-ЯёЁэЭ]{2,})([.-\s]{1}([a-zA-Z0-9а-яА-ЯёЁэЭ]{1,}))?)$/,
			email: /^(\w{1,}.)?(\w{1,15})(.\w{1,})?(.\w{1,})?@((\w{2,}.)?(\w{2,})\.(\w{2,}))$/,
			password: /^[a-zA-Z0-9а-яА-ЯёЁэЭ!@#$%^&*]{8,}$/,
			password_2: /[a-zA-Zа-яА-ЯЁ]{1,}/,
			password_3: /[0-9]{1,}/,
		},
		result_signup: function(){
			var success_num = 0;
			var success_checkbox = 0;

			//username
			if (this.regexp.username.test(this.input_values.val1.val())) {
				success_num++;
			}
			else {
				if (this.input_values.val1.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Введите ваше имя');
					}
					
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Неверный формат имени');
					}
				}
			}
			//mail
			if (this.regexp.email.test(this.input_values.val2.val())) {
				success_num++;
			}
			else {
				if (this.input_values.val2.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Введите ваш Email');
					}
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Неверный формат Email');
					}
				}
			}
			//password
			if (this.regexp.password.test(this.input_values.val3.val())) { //sdfsdf23
				if (this.input_values.val3.val().search(this.regexp.password_2)==-1) {
					Notification.create(3, 'В пароле должны присутствовать буквы');
				}
				else {
					if (this.input_values.val3.val().search(this.regexp.password_3)==-1) {

						Notification.create(3, 'В пароле должны присутствовать цифры');
					}
					else {
						success_num++;
					}					
				}

			}
			else {
				if (this.input_values.val3.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Придумайте пароль');
					}
				} 
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Введите пароль (от 8ми символов)');
					}
				}
			}
			//confirm_pass
			if (this.regexp.password.test(this.input_values.val4.val())) {
				if (this.input_values.val3.val()==this.input_values.val4.val()) {
					success_num++;
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Пароли не совпадают');
					}
				}
			}
			else {
				if ($('.alerts_relative').children().length==0) {
					Notification.create(2, 'Пароли не совпадают');
				}
			}
			if ($('#checkbox').attr('checked')) {
				success_checkbox = 1;
			}

			//_error
			if (success_num==4) {
				if (success_checkbox==1) {
					$('form[name="form_signup"]').submit();
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Согласитесь с условиями Проекта');
					}
				}
			}
			else {
				if ($('.alerts_relative').children().length==0) {
					Notification.create(2, 'Заполните все поля');
				}
			}
		},

		result_signin: function () {
			var success_num = 0;
			//mail
			if (this.regexp.email.test(this.input_values.val2.val())) {
				success_num++;
			}
			else {
				if (this.input_values.val2.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Введите ваш Email');
					}
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Неверный формат Email');
					}
				}
			}


			//password
			if (this.regexp.password.test(this.input_values.val3.val())) { //sdfsdf23
				if (this.input_values.val3.val().search(this.regexp.password_2)==-1) {
					Notification.create(3, 'В пароле должны присутствовать буквы');
				}
				else {
					if (this.input_values.val3.val().search(this.regexp.password_3)==-1) {

						Notification.create(3, 'В пароле должны присутствовать цифры');
					}
					else {
						success_num++;
					}					
				}

			}
			else {
				if (this.input_values.val3.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Введите пароль');
					}
				} 
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Неверный формат пароля');
					}
				}
			}

			if (success_num==2) {
				$('form[name="form_signin"]').submit();
			}
		},
		result_restore: function() {
			//mail
			if (this.regexp.email.test(this.input_values.val2.val())) {
				$('form[name="form_restore"]').submit();
			}
			else {
				if (this.input_values.val2.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Введите ваш Email');
					}
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Неверный формат Email');
					}
				}
			}
		},
		result_createpass: function () {
			var success_num = 0;
			if (this.regexp.email.test(this.input_values.val2.val())) {
				success_num++;
			}
			else {
				if (this.input_values.val2.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Введите ваш Email');
					}
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Неверный формат Email');
					}
				}
			}


			//new password
			if (this.regexp.password.test(this.input_values.val7.val())) { //sdfsdf23
				if (this.input_values.val7.val().search(this.regexp.password_2)==-1) {
					Notification.create(3, 'В новом пароле должны присутствовать буквы');
				}
				else {
					if (this.input_values.val7.val().search(this.regexp.password_3)==-1) {

						Notification.create(3, 'В новом пароле должны присутствовать цифры');
					}
					else {
						success_num++;
					}					
				}

			}
			else {
				if (this.input_values.val7.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Придумайте новый пароль');
					}
				} 
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Введите новый пароль (от 8ми символов)');
					}
				}
			}
			//confirm_pass
			if (this.regexp.password.test(this.input_values.val8.val())) {
				if (this.input_values.val7.val()==this.input_values.val8.val()) {
					success_num++;
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Пароли не совпадают');
					}
				}
			}
			else {
				if ($('.alerts_relative').children().length==0) {
					Notification.create(2, 'Пароли не совпадают');
				}
			}

			if (success_num==3) {
				$('form[name="form_createpass"]').submit();
			}
		},
		result_setting1: function () {
			if (this.regexp.email.test(this.input_values.val9.val())) {
				$('form[name="form_setting"]').submit();
			}
			else {
				if (this.input_values.val9.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Вы не ввели ваш новый Email');
					}
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Неверный формат Email');
					}
				}
			}

		},
		result_setting2: function () {
			var success_num = 0;

			if (this.regexp.password.test(this.input_values.val10.val())) { //sdfsdf23
				if (this.input_values.val10.val().search(this.regexp.password_2)==-1) {
					Notification.create(3, 'В действующем пароле присутствуют буквы');
				}
				else {
					if (this.input_values.val10.val().search(this.regexp.password_3)==-1) {

						Notification.create(3, 'В действующем пароле присутствуют цифры');
					}
					else {
						success_num++;
					}					
				}

			}
			else {
				if (this.input_values.val10.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Введите ваш действующий пароль');
					}
				} 
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Пароль не корректный');
					}
				}
			}


			//newpass
			if (this.regexp.password.test(this.input_values.val11.val())) { //sdfsdf23
				if (this.input_values.val11.val().search(this.regexp.password_2)==-1) {
					Notification.create(3, 'В новом пароле должны присутствовать буквы');
				}
				else {
					if (this.input_values.val11.val().search(this.regexp.password_3)==-1) {

						Notification.create(3, 'В новом пароле должны присутствовать цифры');
					}
					else {
						success_num++;
					}					
				}

			}
			else {
				if (this.input_values.val11.val().length==0) {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Введите ваш новый пароль');
					}
				} 
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(3, 'Введите ваш новый пароль(от 8ми символов)');
					}
				}
			}



			//confirm_pass
			if (this.regexp.password.test(this.input_values.val12.val())) {
				if (this.input_values.val11.val()==this.input_values.val12.val()) {
					success_num++;
				}
				else {
					if ($('.alerts_relative').children().length==0) {
						Notification.create(2, 'Пароли не совпадают');
					}
				}
			}
			else {
				if ($('.alerts_relative').children().length==0) {
					Notification.create(2, 'Пароли не совпадают');
				}
			}

			if (success_num==3) {
				$('form[name="form_setting2"]').submit();
			}
		},
		result_setting3: function () {

			var regxp = /^[P](\d{7,12})$/;
			if ($('#p_wallet').val()!=0) {

				if (regxp.test($('#p_wallet').val())) {
					$('#contact1 form[name="form_setting3"]').submit();
				}
				else {
					Notification.create(2, 'Формат кошелька не верный');
				}
				
			}
			else {
				Notification.create(2, 'Поле для кошелька не может быть пустым');
			}
		}
	}



	$('.a_signup_column #checkbox').click(function(){
		if ($('.a_signup_column #checkbox').attr('checked')) {
			$('.a_signup_column #checkbox').removeAttr('checked','checked');
		}
		else {
			$('.a_signup_column #checkbox').attr('checked', 'checked');
		}
	});
	$('form[name="form_signup"] button').click(function() {
		validate.result_signup()
	});

	$('form[name="form_signin"] button').click(function() {
		validate.result_signin();
	});

	$('form[name="form_restore"] button').click(function() {
		validate.result_restore();
	});

	$('form[name="form_createpass"] button').click(function() {
		validate.result_createpass();
	});

	$('#contact1 form[name="form_setting"] button').click(function() {
		validate.result_setting1();
	});
	$('#contact1 form[name="form_setting2"] button').click(function() {
		validate.result_setting2();
	});
	$('#contact1 form[name="form_setting3"] button').click(function() {
		validate.result_setting3();
	});
	
});