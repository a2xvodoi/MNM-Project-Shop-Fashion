$(document).ready(function() {
    //Add to card
    $('.add-to-cart').click((e) => {
        e.preventDefault();

        const _id = $('input[name="_id"]').val();
        const quantity = $('input[name="quantity"]').val();
        const size = $('.btn-size.active').text();
        const color = $('.btn-color.active').text();

        const data = {
            "productId": _id,
            "quantity": quantity,
            "size": size,
            "color": color
        };
        $.ajax({
            type: "POST",
            url: "/cart/addCart",
            data: { data: JSON.stringify(data) },
            dataType: "JSON",
            success: function(response) {
                return false;
            }
        });
    })

    // Update cart
    $('input[name="quantity"]').change(function() {
        const id = $(this).closest('.cart-product').data('id');
        const quantity = $(this).val();
        updateCart(id, quantity);
    });

    $('.qty button').on('click', function() {
        const id = $(this).closest('.cart-product').data('id');
        const quantity = $(this).closest('.qty').find('input[name="quantity"]').val();
        updateCart(id, quantity);
    });

    //Remove cart
    $('.remove-cart').click(function() {
        const that = $(this).closest('.cart-product');
        const id = that.data('id');
        $.ajax({
            type: "DELETE",
            url: `/cart/${id}/destroy`,
            success: function(response) {
                console.log(response)
                if (response.status === 200) {
                    that.html('');
                }
            }
        });
    })
});

const updateCart = (id, quantity) => {
    const data = {
        'quantity': quantity
    };
    $.ajax({
        type: "PATCH",
        url: `/cart/${id}/update`,
        data: { data: JSON.stringify(data) },
        dataType: "JSON",
        success: function(response) {

        }
    });
}