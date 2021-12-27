var toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
