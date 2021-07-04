//Toggle sidebar
$(".sidebar").on("click", "#toggleSidebar", function() {
	var sidebar = $(this).parents(".sidebar").first();
	
	if(sidebar.hasClass("collapse-left")) {
		sidebar.removeClass("collapse-left");
		//sidebar.find(".floatingToggle").remove();
	}
	else {
		sidebar.addClass("collapse-left");
		//$(this).clone().addClass("floatingToggle").prependTo(sidebar);
	}
});

//Collapse sidebar by default on smaller devices 
function sidebarcollapse() {
	if($(window).width() < 768) {
		var sidebar = $(".wrapper > .main > .sidebar");
		
		sidebar.hide().addClass("collapse-left");
			
		sidebar.on("transitionend", function() {
			sidebar.show();
		});
	}
}

//Split full url from media manager
function responsive_filemanager_callback(field_id) {
	var url = $("#" + field_id).val().split(root_dir)[1];
	$("input[name='" + field_id + "']").val(url).trigger("change");
}

$(document).ready(function() {
	sidebarcollapse();
});

//Validate forms
$("form").submit(function() {
	var valid = true;
	var passChar = 8;
	
	$(this).find(".invalid-feedback").remove();
	$(this).find(".is-invalid").removeClass("is-invalid");
	
	//Validate Passwords
	if($(this).find("input[name='password']").length && $(this).find("input[name='passwordConf']").length) {
		var pass = $(this).find("input[name='password']");
		var passConf = $(this).find("input[name='passwordConf']");
		
		if(pass.val().length || passConf.val().length) {
			if(pass.val().length < passChar) {
				pass.addClass("is-invalid");
				$("<div class='invalid-feedback'>Password must be at least " + passChar + " characters</div>").insertAfter(pass);

				valid = false;
			}
			else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(pass.val())) {
				pass.addClass("is-invalid");
				$("<div class='invalid-feedback'>Password must contain at least one lowercase, one uppercase and one digit</div>").insertAfter(pass);

				valid = false;
			}
			else if(pass.val() != passConf.val()) {
				pass.addClass("is-invalid");
				passConf.addClass("is-invalid");
				$("<div class='invalid-feedback'>Passwords do not match</div>").insertAfter(passConf);

				valid = false;
			}
		}
	}
    
    //Validate Urls
    if($(this).find("input[name='url']").length) {
        var url = $(this).find("input[name='url']");
        
        if(!/^[a-zA-Z0-9\:\/\-\_\+\?\&\=\#\.]+$/.test(url.val())) {
            url.addClass("is-invalid");
            $("<div class='invalid-feedback'>Url contains invalid characters. Allowed characters are A-Z, 0-9, :, /, -, _, +, ?, &, =, #, .</div>").insertAfter(url);
            
            valid = false;
        }
    }
	
	if(valid == false) {
		event.preventDefault();
		return;
	}
});

//Validate urls on keyup
$("input[name='url']").keyup(function() {
    var url = $(this);
    
    url.removeClass("is-invalid");
    url.siblings(".invalid-feedback").remove();
    
    if(!/^[a-zA-Z0-9\:\/\-\_\+\?\&\=\#\.]+$/.test(url.val())) {
        url.addClass("is-invalid");
        $("<div class='invalid-feedback'>Url contains invalid characters. Allowed characters are A-Z, 0-9, :, /, -, _, +, ?, &, =, #, .</div>").insertAfter(url);
    }
});

//Confirm inputs
$("input[type='submit'][data-confirm]").click(function() {
	if(!confirm($(this).attr("data-confirm"))) {
		event.preventDefault();
		return;
	}
});

//Clear search || Return to list
$("input[name='clearSearch'],input[name='returnList']").click(function() {
	window.location.href = window.location.href.split("?")[0];
});

//Delete content
$("input[name='deleteContent']").click(function() {
    var btn = $(this);
	if(confirm("Are you sure you want to delete this content?")) {
		if(btn.attr("data-id").length) {
			$.ajax({
				url: window.location.pathname,
				method: "post",
				dataType: "json",
				data: ({id: $(this).attr("data-id"), method: "deleteContent"}),
				success: function(data) {
					if(data["status"] == "success") {
						location.reload();
					}
					else {
						var message = "<div class='alert alert-" + data["status"] + "'>" + data["message"] + "</div>";
                        
						if(btn.parents("table").first().length > 0) {
							btn.parents("table").first().find(".alert").remove();
							$(message).insertBefore(btn.parents("table").first());
						}
						else {
							btn.parents("form").first().find(".alert").remove();
							$(message).appendTo(btn.parents("form").first());
						}
					}
				}
			});
		}
	}
});

//Count input characters
$(".countChars").keyup(function() {
    var limit = $(this).attr("maxlength");
    var chars = $(this).val().length;
    
    if($(this).siblings("small.charCount").length) {
        $(this).siblings("small.charCount").text(chars + " of " + limit);
    }
    else {
        $("<small class='charCount d-block text-end'>" + chars + " of " + limit + "</small>").insertAfter($(this));
    }
});

//Validate other settings
$("#otherSettings").submit(function() {
    var valid = true;
    var analytics = $(this).find("input[name='googleAnalytics']");
    
    if(analytics.val().length && !/^[A-Z]{2}\-[0-9]{8}\-[0-9]$/.test(analytics.val())) {
        analytics.addClass("is-invalid");
        $("<div class='invalid-feedback'>Value does not appear to be valid</div>").insertAfter(analytics);

        valid = false;
    }
    
    if(valid == false) {
        event.preventDefault();
        return;
    }
});

//Change navigation menu
$("select[name='chooseMenu']").change(function() {
    window.location.href = window.location.href.split('manage-navigation/')[0] + "manage-navigation/" + $(this).val();
});

//Select existing page to insert
$("#insertNavigation select[name='existing']").change(function() {
    var option = $(this).children(":selected");
    var name = option.attr("data-name");
    var url = option.attr("data-url");
    
    $("#insertNavigation").find("input[name='name']").val(name);
    $("#insertNavigation").find("input[name='url']").val(url);
});

//Edit existing navigation item
$(".structure").on("click", "button[name='edit']", function() {
    $(this).parents(".navigationLevel").first().find(".modal").first().modal("show");
});

//Delete existing navigation item 
$(".structure").on("click", "button[name='delete']", function() {
    if(confirm("Are you sure you want to delete this item?")) {
        $(this).parents(".navigationLevel").first().find("input[name='delete']").first().val(1);
        $(this).parents(".navigationLevel").first().hide();
    }
});

//Re-order existing navigation items
$(".structureItems").sortable({
    items: ".navigationLevel",
    connectWith: ".structureItems",
    dropOnEmpty: true,
    stop: function() {
        $(".structure .navigationLevel").each(function() {
            var position = $(this).prevAll(".navigationLevel").length;
            var edit = $(this).find(".modal").first();
            
            if($(this).parent().is(".structure")) {
                var parent = 0;
            }
            else {
                var parent = $(this).parents(".navigationLevel").first().attr("data-id");
            }
                
            edit.find("input[name='parent']").val(parent);
            edit.find("input[name='position']").val(position);
        });
    }
});

//Save navigation structure
$(".structure input[name='saveStructure']").click(function() {
    var json = {};
    var btn = $(this);
    var structure = $(this).parents(".structure").first();
    var i = 0;
    
    structure.find(".alert").remove();
    
    structure.find(".navigationLevel").each(function() {
        var form = $(this).children(".modal").first();
        
        json[i] = {
            "id": form.find("input[name='id']").val(),
            "name": form.find("input[name='name']").val(),
            "url": form.find("input[name='url']").val(),
            "visible": form.find("select[name='visible']").val(),
            "parent": form.find("input[name='parent']").val(),
            "position": form.find("input[name='position']").val(),
            "delete": form.find("input[name='delete']").val()
        }
        
        i++;
    });
    
    if(structure.find(".is-invalid").length || structure.find(".invalid-feedback").length) {
        event.preventDefault();
        $("<div class='alert alert-danger mt-3'>You have entered invalid information. Please check your inputs and try again.</div>").insertAfter(btn.parent(".form-group"));
        
        return;
    }
    
    structure.find("input[name='json']").val(JSON.stringify(json));
})