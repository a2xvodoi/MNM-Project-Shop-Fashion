var formDelete = document.forms['form-delete'];
$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var _id = button.data('_id');
    var type = button.data('type');
    var modal = $(this);
    switch (type) {
        case 'products':
            modal.find('.modal-body').html('Bạn có chắc muốn xoá sản phẩm này?');
            break;
        case 'categories':
            modal.find('.modal-body').html('Bạn có chắc muốn xoá danh mục này?');
            break;
        case 'users':
            modal.find('.modal-body').html('Bạn có chắc muốn xoá tài khoản này?');
            break;
    }

    $('.btn-delete').click((e) =>{
        e.preventDefault();
        formDelete.action = `/admin/${type}/${_id}/destroy?_method=DELETE`;
        formDelete.submit();
    })
})