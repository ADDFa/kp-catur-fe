import Swal, { SweetAlertOptions } from "sweetalert2"

const ConfirmDialog = (onConfirmed: () => any, options?: SweetAlertOptions) => {
    Swal.fire({
        toast: true,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer)
            toast.addEventListener("mouseleave", Swal.resumeTimer)
        },
        ...options
    }).then((result) => {
        if (!result.isConfirmed) return
        onConfirmed()
    })
}

export default ConfirmDialog
