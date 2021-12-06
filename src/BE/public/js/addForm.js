$(document).ready(function() {
    // jquery add form inputFile
    var form = $(".add-form").html();

    $(".btn-add-form").click(function() {
        $(".add-form-size-color").append(
            `
      <div class="mt-4">
        ` +
            ` ${form} ` +
            `
      </div>
    `
        );
    });
    $(".add-form-size-color").on("click", ".fa-minus-circle", function() {
        $(this).closest(".row").remove();
        console.log($(this).closest(".row").html());
    });
});