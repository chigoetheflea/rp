const ADD_TO_CART_BUTTON = `.js-add-in-cart`;
const ADD_TO_CART_FORM = `.js-add-in-cart-form`;
const ADD_TO_CART_PRODUCT_ID = `input[name=product_id]`;
const ADD_TO_CART_QUANTITY = `.js-count-field`;
const ADD_TO_CART_VARIATION_ID = `input[name=variation_id]`;
const ADD_TO_CART_ADDED_CLASS = `button--added`;
const ADD_TO_CART_LOADING_CLASS = `button--loading`;
const ADD_TO_CART_TIMEOUT = 2000;
const CART = `.js-cart`;
const CART_ACTIVE_CLASS = `button-cart--not-empty`;

jQuery(document).ready(function ($) {

  /* Элементы магазина */

	$(ADD_TO_CART_BUTTON).on(`click`, function(evt) {
		evt.preventDefault();

		const _this = $(this),
			addToCartForm = _this.closest(ADD_TO_CART_FORM),
			buttonId = _this.val(),
			productQty = addToCartForm.find(ADD_TO_CART_QUANTITY).val() || 1,
			productId = addToCartForm.find(ADD_TO_CART_PRODUCT_ID).val() || buttonId,
			variationId = addToCartForm.find(ADD_TO_CART_VARIATION_ID).val() || 0;

		const data = {
			  action: `woocommerce_ajax_add_to_cart`,
        product_id: productId,
        product_sku: ``,
        quantity: productQty,
        variation_id: variationId,
      };

		$(document.body).trigger(`adding_to_cart`, [_this, data]);

		$.ajax({
      type: `post`,
      url: wc_add_to_cart_params.ajax_url,
      data: data,
      beforeSend: function(response) {
        _this
          .removeClass(ADD_TO_CART_ADDED_CLASS)
          .addClass(ADD_TO_CART_LOADING_CLASS);
      },
      complete: function(response) {
        _this
          .addClass(ADD_TO_CART_ADDED_CLASS)
          .removeClass(ADD_TO_CART_LOADING_CLASS);

				$(CART).addClass(CART_ACTIVE_CLASS);

        console.log("Response: " + response);

				setTimeout(function(){
					_this.removeClass(`${ADD_TO_CART_ADDED_CLASS} ${ADD_TO_CART_LOADING_CLASS}`);
				}, ADD_TO_CART_TIMEOUT);
      },
      success: function (response) {
        if (response.error & response.product_url) {
          window.location = response.product_url;

          return;
        } else {
          $(document.body).trigger(`added_to_cart`, [response.fragments, response.cart_hash, _this]);
        }
      },
    });

		return false;
	});

	/* Элементы магазина */

});
