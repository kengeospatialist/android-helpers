//Scrollpy
$(() => {
    var navHeight = $(".navbar").outerHeight();
    $('body').scrollspy({ target: ".navbar", offset: -100 });
});

//Arrays
$("#array-form").submit((e) => {
    e.preventDefault();
    var array_string = "";
    var arrays = $("[name='array']").val();
	var sort = $("[name='sort-array']").is(":checked");
    var capitalise = $("[name='capitalise']:checked").val();
    var array_items = arrays.split(",");
	if(sort){
		array_items.sort();
	}
    var i = 1;
    array_items.forEach((item) => {
        if (i == 1) {
            array_string += '<string-array name="name">\n    <item>' + handleCase(item, capitalise) + "</item>\n";
        }
        else if (i == array_items.length) {
            array_string += "    <item>" + handleCase(item, capitalise) + "</item>\n<string-array>";
        }
        else {
            array_string += "    <item>" + handleCase(item, capitalise) + "</item>\n";
        }
        i++;
    });


    //Result
    $("#generated-array").val(array_string);
});

function handleCase(string, s_case) {
    string = string.trim();
    if (s_case == "lowercase") {
        return string.toLowerCase();
    }
    else if (s_case == "capitalise-first") {
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    }
    else {
        return string.toUpperCase();
    }
}

//generating menu
$("#menu-form").submit((e) => {
    e.preventDefault();
    var menu_string_xml = "";
    var menu_string_java = "";
    var arrays = $("[name='menu-items']").val();
    var capitalise = $("[name='capitalise-m']:checked").val();
	var sort = $("[name='sort-menu']").is(":checked");
    var array_items = arrays.split(",");
	if(sort){
		array_items.sort();
	}
    var i = 1;

    array_items.forEach((item) => {
        menu_string_xml +=
            `<item
                android:id="@+id/${handleCase(item, 'lowercase')}"
                android:title="${handleCase(item, capitalise)}" />\n\n`;
        menu_string_java +=
            `case "${handleCase(item, 'lowercase')}":
                    id = R.id.${handleCase(item, 'lowercase')};
                    break;\n\n`;
        i++;
    });


    //Result
    $("#generated-menu").val(menu_string_xml);
    $("#generated-menu-java").val(menu_string_java);
});  