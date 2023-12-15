$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblCustomers').DataTable({
        "ajax": {
            "url": "/Customers/GetAll", // Aseg�rate de que esta ruta sea correcta
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "id", "width": "20%" },
            { "data": "firstName", "width": "20%" },
            { "data": "lastName", "width": "20%" },
            { "data": "country", "width": "20%" },
            { "data": "phone", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/Customers/Edit/${data}" class="btn btn-success text-white" style="cursor:pointer;">Editar</a>
                                &nbsp
                                <a onclick=Delete("/Customers/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer;">Borrar</a>
                            </div>`;
                }, "width": "20%"
            }
        ],
    });
}

function Delete(url) {
    swal({
        title: "�Est� seguro de querer borrar el registro?",
        text: "Esta acci�n no puede ser revertida",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: 'DELETE',
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}