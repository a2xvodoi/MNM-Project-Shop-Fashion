$(document).ready(function () {
    if ($('.img-avatar').attr('src')) {
        $('.img-avatar').removeClass('d-none');
    } else {
        $('.img-avatar').addClass('d-none');
    }
    $('#avatar').change(function (e) { 
        $('.img-avatar').removeClass('d-none');
        $('.img-avatar').attr('src',URL.createObjectURL(e.target.files[0]));
    });
});