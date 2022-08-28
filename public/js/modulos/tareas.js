import axios from "axios";
import Swal from "sweetalert2";

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    tareas.addEventListener('click', e => {
        // console.log(e.target.classList);
        if (e.target.classList.contains('fa-check-circle')) {
            // console.log("actualizando");
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // Request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(function (respuesta) {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo');
                    }
                })
        }

        if (e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement,
                idTarea = tareaHTML.dataset.tarea;

            // Pedir confirmación
            Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Enviar el delete por medio de axios
                    const url = `${location.origin}/tareas/${idTarea}`;
                    // delete necesita pasar params
                    axios.delete(url, { params: { idTarea } })
                        .then(function (respuesta) {
                            if (respuesta.status === 200) {
                                // Eliminar nodo
                                tareaHTML.remove();

                                // Opcional una alerta
                                Swal.fire({
                                    title: 'Tarea eliminada con éxito',
                                    icon: 'success',
                                    toast: true,
                                    position: "top-right",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true
                                })
                            }
                        })
                }
            })
        }
    });
}

export default tareas;