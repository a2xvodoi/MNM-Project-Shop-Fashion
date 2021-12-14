$(document).ready(function() {
    // jquery add form inputFile
    var form = `
            <div class="row">
            <div class="col-4">
                <label>Size</label>
                <select class="custom-select" id="size_color" name="size_color[size]">
                    <option selected="" value="">--- Chọn size ---</option>
                    
                    <option value="4XL">4XL</option>
                    
                    <option value="3XL">3XL</option>
                    
                    <option value="2XL">2XL</option>
                    
                    <option value="XL">XL</option>
                    
                    <option value="L">L</option>
                    
                    <option value="M">M</option>
                    
                    <option value="S">S</option>
                    
                </select>
            </div>
            <div class="col-4">
                <label>Color</label>
                <select class="custom-select" name="size_color[color]">
                    <option selected="" value="">--- Chọn color ---</option>
                    
                    <option value="Đỏ">Đỏ</option>
                    
                    <option value="Tím tham">Tím tham</option>
                    
                    <option value="Xanh">Xanh</option>
                    
                    <option value="Vàng">Vàng</option>
                    
                    <option value="Ghi đậm">Ghi đậm</option>
                    
                    <option value="Ghi nhạt">Ghi nhạt</option>
                    
                    <option value="Cam">Cam</option>
                    
                    <option value="Nâu">Nâu</option>
                    
                    <option value="Hồng">Hồng</option>
                    
                    <option value="Đen">Đen</option>
                    
                    <option value="Rêu">Rêu</option>
                    
                    <option value="Be">Be</option>
                    
                    <option value="Ghi">Ghi</option>
                    
                    <option value="Trắng">Trắng</option>
                    
                    <option value="Xanh dương">Xanh dương</option>
                    
                    <option value="Xanh lá">Xanh lá</option>
                    
                </select>
            </div>
            <div class="col-4">
                <label>Quantity</label>
                <div class="d-flex align-items-center">
                    <input type="number" name="size_color[quantity]" class="form-control">
                    <i class="fas fa-minus-circle" style="margin-left: 10px; cursor: pointer; color: red"></i>
                </div>
            </div>
        </div>
    `;

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
    });
});