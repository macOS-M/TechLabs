function ControlAcciones() {

	this.URL_API = "https://localhost:44362";

	this.GetUrlApiService = function (service) {
		return this.URL_API + service;
	}

	this.GetTableColumsDataName = function (tableId) {
		var val = $('#' + tableId).attr("ColumnsDataName");

		return val;
	}

	this.FillTable = function (service, tableId, refresh) {

		if (!refresh) {
			columns = this.GetTableColumsDataName(tableId).split(',');
			var arrayColumnsData = [];


			$.each(columns, function (index, value) {
				var obj = {};
				obj.data = value;
				arrayColumnsData.push(obj);
			});
			//Esto es la inicializacion de la tabla de data tables segun la documentacion de 
			// datatables.net, carga la data usando un request async al API
			$('#' + tableId).DataTable({
				"processing": true,
				"ajax": {
					"url": this.GetUrlApiService(service),
					dataSrc: 'Data'
				},
				"columns": arrayColumnsData
			});
		} else {
			//RECARGA LA TABLA
			$('#' + tableId).DataTable().ajax.reload();
		}

	}

	this.GetSelectedRow = function () {
		var data = sessionStorage.getItem(tableId + '_selected');

		return data;
	};

	this.BindFields = function (formId, data) {
		console.log(data);
		$('#' + formId + ' *').filter(':input').each(function (input) {
			var columnDataName = $(this).attr("ColumnDataName");
			this.value = data[columnDataName];
		});
	}

	this.GetDataForm = function (formId) {
		var data = {};

		$('#' + formId + ' *').filter(':input').each(function (input) {
			var columnDataName = $(this).attr("ColumnDataName");
			data[columnDataName] = this.value;
		});

		console.log(data);
		return data;
	}


	this.ShowMessage = function (type, message) {
		if (type == 'E') {
			$("#alert_container").removeClass("alert alert-success alert-dismissable")
			$("#alert_container").addClass("alert alert-danger alert-dismissable");
			$("#alert_message").text(message);
		} else if (type == 'I') {
			$("#alert_container").removeClass("alert alert-danger alert-dismissable")
			$("#alert_container").addClass("alert alert-success alert-dismissable");
			$("#alert_message").text(message);
		}
		$('.alert').show();
	};


	/* ACCIONES VIA AJAX, O ACCIONES ASINCRONAS*/
	this.PostToAPI = function (service, data, callBackFunction) {
		var jqxhr = $.post(this.GetUrlApiService(service), data, function (response) {
			var ctrlActions = new ControlAcciones();
			console.log(response.Message);
			//ctrlActions.ShowMessage('I', response.Message);

			if (callBackFunction) {
				callBackFunction(response.Data);
			}
		})
			.fail(function (response) {
				var data = response.responseJSON;
				var ctrlActions = new ControlAcciones();
				//ctrlActions.ShowMessage('E', data.ExceptionMessage);
				console.log(data);
			})
	};

	this.PutToAPI = function (service, data, callBackFunction) {
		var jqxhr = $.put(this.GetUrlApiService(service), data, function (response) {
			var ctrlActions = new ControlAcciones();
			ctrlActions.ShowMessage('I', response.Message);
			if (callBackFunction) {
				callbackFunction(response.Data);
			}

		})
			.fail(function (response) {
				var data = response.responseJSON;
				var ctrlActions = new ControlAcciones();
				ctrlActions.ShowMessage('E', data.ExceptionMessage);
				console.log(data);
			})
	};

	this.DeleteToAPI = function (service, data, callbackFunction) {
		var jqxhr = $.delete(this.GetUrlApiService(service), data, function (response) {
			var ctrlActions = new ControlAcciones();
			ctrlActions.ShowMessage('I', response.Message);
			if (callBackFunction) {
				callbackFunction(response.Data);
			}
		})
			.fail(function (response) {
				var data = response.responseJSON;
				var ctrlActions = new ControlAcciones();
				ctrlActions.ShowMessage('E', data.ExceptionMessage);
				console.log(data);
			})
	};

	this.GetToApi = function (service, callBackFunction) {
		var jqxhr = $.get(this.GetUrlApiService(service), function (response) {
			console.log("Response " + response);
			if (callBackFunction) {
				callBackFunction(response.Data);
			}

		});
	}
}

//Custom jquery actions
$.put = function (url, data, callback) {
	if ($.isFunction(data)) {
		type = type || callback,
			callback = data,
			data = {}
	}
	return $.ajax({
		url: url,
		type: 'PUT',
		success: callback,
		data: JSON.stringify(data),
		contentType: 'application/json'
	});
}

$.delete = function (url, data, callback) {
	if ($.isFunction(data)) {
		type = type || callback,
			callback = data,
			data = {}
	}
	return $.ajax({
		url: url,
		type: 'DELETE',
		success: callback,
		data: JSON.stringify(data),
		contentType: 'application/json'
	});
}
