const appendErrorContent = (id, error) => {
    $(id).append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${error}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `)
};

const showError = (id, errors) => {
    $(id).html('');
    errors.forEach(error => {
        appendErrorContent(id, error.msg);
    });
}
