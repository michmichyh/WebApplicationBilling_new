document.addEventListener('DOMContentLoaded', function () {
    loadCustomers();
});

function loadCustomers() {
    fetch('/Customers/GetAllCustomers') // Aseg�rate de reemplazar con la ruta correcta
        .then(response => response.json())
        .then(data => {
            initializeDataTable(data.data);
        })
        .catch(error => console.error('Error:', error));
}


function initializeDataTable(customers) {
    let table = document.getElementById('customersTable');
    if (!table) {
        table = document.createElement('table');
        table.id = 'customersTable';
        table.className = 'display'; // Clase necesaria para DataTables
        document.getElementById('customersContainer').appendChild(table);
    }

    $(table).DataTable({
        responsive: true,
        data: customers,
        columns: [
            { title: "ID", data: "id", className: "column-id" },
            { title: "Nombre", data: "firstName", className: "column-name" },
            { title: "Apellido", data: "lastName", className: "column-name" },
            { title: "Pa�s", data: "country", className: "column-country" },
            { title: "Tel�fono", data: "phone", className: "column-phone" },
            {
                title: "Acciones",
                data: "id",
                render: function (data) {
                    return `<div class="text-center">
                                <a href="/Customers/Detail/${data}" class=""><i class="fa fa-eye"></i></a>
                                <a href="/Customers/Edit/${data}" class=""><i class="fa fa-edit"></i></a>
                                <a onclick="Delete('/Customers/Delete/${data}')" class=""><i class="fa fa-trash"></i></a>
                            </div>`;
                },
                className: "column-actions"
            }
        ]
    });
}


function Delete(url) {
    Swal.fire({
        title: "�Est� seguro de querer borrar el registro?",
        text: "�Esta acci�n no puede ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S�, b�rralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'DELETE',
                url: url,
                success: function (response) {
                    if (response && response.success) {
                        toastr.success(response.message || "Registro eliminado con �xito.");
                        // Recargar DataTables
                        $('#customersTable').DataTable().clear().destroy();
                        loadCustomers();
                    } else {
                        toastr.error(response.message || "Ocurri� un error desconocido.");
                    }
                },
                error: function (error) {
                    toastr.error("Error al intentar eliminar el registro.");
                    console.error('Error:', error);
                }
            });
        }
    });
}