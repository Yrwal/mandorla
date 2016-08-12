jQuery.fn.extend({
    // base code and idea from : http://jsfiddle.net/egstudio/aFMWg/1/
    /// use:
    ///  var textarea = $('<textarea id="textarea-edit" class="edit"></textarea>');
    ///  var connectWith = $('input[name="hiddenField"]');
    ///  $('.editable').initInlineEditor({
    ///      textarea: textarea,
    ///      connectWith: connectWith
    ///  });
    initInlineEditor: function (settings) {

        var option = $.extend({

            service: '',                                                            // parse in the webservice

            textarea: $('<textarea id="textarea-edit" class="edit"></textarea>'),   // the default textarea selector 
            connectWith: $('input[name="hiddenField"]'),                            // selector of hidden element on your page

            onComplete: function () { }                                             // function to execute upon completion
        }, settings);
        
        $(this).hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });

        $(this).each(function () {
            
            var editable = $(this);

            $(this).click(function () {
                
                var content = editable.html().trim();

                // switch content with textarea
                editable.hide();
                editable.after(option.textarea);
            
                // instantiate tinymce            
                var tinyEditor = new tinymce.Editor(option.textarea.attr('id'), {
                    setup: function (e) {
                        e.on('init', function () {
                            tinyEditor.setContent(content);
                            tinyEditor.focus();
                        });

                    }
                }, tinymce.EditorManager);

                tinyEditor.render();
            
                // on focus out: get the content, update html, save, and toggle view
                tinyEditor.on('blur', function () {

                    var newContent = tinyEditor.getContent();
                
                    if (newContent != "") {
                        option.connectWith.val(newContent).change();
                        editable.html(newContent);
                        editable.save(option.service, $(editable).attr('id'));
                    }

                    tinyEditor.destroy();
                    tinyEditor.remove();
                    option.textarea.remove();
                    editable.show();
                });

                return false;
            });
        });

        option.onComplete.call();
    },

    save: function (service, element) {        
        $.ajax({
            type: 'POST',
            url: service,
            data: {
                'content': escape($(this).html()),
                'fileName': document.location.pathname.match(/[^\/]+$/)[0],
                'elementId': element
            },
            dataType: 'html',
            success: function (msg) {
                $('.log-message').html(msg.d);
            },
            error: function (e) {
                $('.log-message').html("Unavailable");
            }
        });
    }
});
