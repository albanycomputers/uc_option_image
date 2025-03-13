/**
 * @file
 * Show the selected option
 */
(function ($) {
  Backdrop.UCOptionImage = Backdrop.UCOptionImage || {};

  Backdrop.UCOptionImage.selected = [];

  /**
   * Initialize the form, and show any images for default selections
   */
  Backdrop.UCOptionImage.init = function() {
    Backdrop.UCOptionImage.update();

    $('*[id^=edit-attributes]').bind('change', function() {
      Backdrop.UCOptionImage.update();
    });
  };

  /**
   * Add a selected option
   */
  Backdrop.UCOptionImage.add_selected = function(aid, oid) {
    if (!Backdrop.UCOptionImage.selected[aid]) {
      Backdrop.UCOptionImage.selected[aid] = [];
    }
    if (!Backdrop.UCOptionImage.selected[aid][oid]) {
      Backdrop.UCOptionImage.selected[aid][oid] = true;
    }
  };

  /**
   * Update the selected images, as necessary
   */
  Backdrop.UCOptionImage.update = function() {
    Backdrop.UCOptionImage.selected = [];

    Backdrop.UCOptionImage.update_inputs();
    Backdrop.UCOptionImage.update_selects();

    Backdrop.UCOptionImage.show_images();
  }

  /**
   * Update the image for this attribute if the checkbox / radio is selected
   */
  Backdrop.UCOptionImage.update_inputs = function(el) {
    $('input[id^=edit-attributes]:checked').each(function() {
      var match = $(this).attr('id').match(/edit\-attributes\-(\d+)\-(\d+)/);
      if (!match) {
        return;
      }

      var aid = match[1];
      var oid = match[2];

      Backdrop.UCOptionImage.add_selected(aid, oid);
    });
  };

  /**
   * Update the image for this attribute if the select item is chosen
   */
  Backdrop.UCOptionImage.update_selects = function(el) {
    $('select[id^=edit-attributes]').each(function() {
      var match = $(this).attr('id').match(/edit\-attributes\-(\d+)/);
      if (!match) {
        return;
      }

      var aid = match[1];
      var oid = $(this).val();

      Backdrop.UCOptionImage.add_selected(aid, oid);
    });
  };

  /**
   * Display this option image.  If the option is already displayed, it remains visible.
   *
   * Multiple choices for the same option will show each choice in the order they are chosen.
   */
  Backdrop.UCOptionImage.show_images = function() {
    for (var aid in Backdrop.UCOptionImage.selected) {
      if (!aid) {
        continue;
      }

      var el = $('#uc-option-image-selected-' + aid);
      if (el.length < 1) {
        continue;
      }

      el.html('');
      Backdrop.UCOptionImage.show_image(aid);
    }
  };

  /**
   * Add images for a given aid
   */
  Backdrop.UCOptionImage.show_image = function(aid) {
    var options = Backdrop.settings['uc_option_image-' + aid];
    if (!options) {
      return;
    }

    var el = $('#uc-option-image-selected-' + aid);
    if (el.length < 1) {
      return;
    }

    for (oid in Backdrop.UCOptionImage.selected[aid]) {
      if (!oid) {
        continue;
      }
      if (!options[oid]) {
        continue;
      }

      el.append(options[oid]);
    }
  }

  Backdrop.behaviors.uc_option_image = {
    attach: function(context, settings) {
      Backdrop.UCOptionImage.init();
    }
  }
})(jQuery);
