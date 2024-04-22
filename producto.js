var tabla;

function init() {
    $("#producto_form").on("submit", function(e){
        guardaryeditar(e);
    });
}

function guardaryeditar(e){
    e.preventDefault();
    var formData = new FormData($("#producto_form")[0]);
    $.ajax({
        url: "controller/productos.php?op=guardaryeditar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            console.log(datos);

            $('#producto_form')[0].reset();
            $("#modalmantenimiento").modal('hide');
            $('#producto_data').DataTable().ajax.reload();

            swal.fire(
                'Registro!',
                'El registro correctamente.',
                'success'
            )
        }
    });

}

$(document).ready(function(){

    tabla = $('#producto_data').dataTable({
    "aProcessing": true,
    "aServerSide": true,
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdf'
    ],
    "ajax":{
        url: 'controller/productos.php?op=listar',
        type : "get",
        dataType : "json",
        error: function(e){
            console.log(e.responseText);
        }
    },
        "bDestroy": true,
        "responsive": true,
        "bInfo": true,
        "iDisplayLength":20,
        "order": [[0, "ass"]],
        "language": {
            "sProcessing":      "Procesando...",
            "sLenghtMenu":      "Mostrar _MENU_ registros",
            "sZeroRecords":     "No se ha encontrado ningun resultado disponible en esta tabla",
            "sEmptyTable":      "Ningún dato disponible en esta tabla",
            "sInfo":            "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty":       "Mostrando un total de 0 registros",
            "sInfoFiltered":    "(filtrado de un total de _MAX_ registros)",
            "sInfoPostfix":     "",
            "sSearch":          "Buscar:",
            "sUrl":             "",
            "sInfoThousands":   ",",
            "sLoadingRecords":  "Cargando...",
            "oPaginate":    {
                "sFirst":       "Primero",
                "sLast":        "Ültimo",
                "sNext":        "Siguiente",
                "sPrevious":    "Anterior",
            },
            "oAria":    {
                "sSortAscending":   ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending":  ": Activar para ordenar la columna de manera descendente"
            }
        }
    }).DataTable();    
});



$(document).on("click","#btnNuevo", function(){
    $('#prod_id').val('');
    $('#mdltitulo').html('Nuevo Registro');
    $('#modalmantenimiento').modal('show');
});

function editar(prod_id){
    $.post("controller/productos.php?op=mostrar",{prod_id:prod_id},function (data) {
        data = JSON.parse(data);
        $('#prod_id').val(data.prod_id);
        $('#prod_name').val(data.prod_name);
    });
    $('#mdltitulo').html('Editar Registro');
    $('#modalmantenimiento').modal('show');
}

function eliminar(prod_id){
    swal.fire({
        title: 'CRUD',
        text: "Desea Eliminar el Registro?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.post("controller/productos.php?op=eliminar",{prod_id:prod_id},function (data) {

            });

            $('#producto_data').DataTable().ajax.reload();	

            swal.fire(
                'Eliminado!',
                'El registro se elimino correctamente.',
                'success'
            )
        }
    })
}

init();

