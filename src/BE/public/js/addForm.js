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
});