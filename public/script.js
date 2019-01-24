
$(document).ready(function () {




	$('#new_task_modal_btn').click(function(){
		
		var data = {
			taskType : $('#task_type').val(),
			taskName : $('#task_name').val(),
			taskDescription : $('#task_textarea').val()
		}

		$.post('/create' , data , function(response){
			location.reload(true);
		});

	});


	$('#sign_up_modal_btn').click(function(){
		var data = {
			username : $('#sign_up_username').val(),
			password : $('#sign_up_password').val()
		}

		$.post('/register' , data , function(){
			location.reload(true);
		});
	});


	$('#log_in_modal_btn').click(function(){
		var data = {
			username : $('#log_in_username').val(),
			password : $('#log_in_password').val()
		}

		$.post('/login', data , function(){
			location.reload(true);
		});
	});

	$('#log_out_btn').click(function(){
		$.get('/logout', function(){
			location.reload(true);
		});
	});

});



