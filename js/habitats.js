// menu stuff

var submenu = {
	"home" : [ "herp", "derp", "nerp" ],
	"portfolio" : [ "my work one", "my work two", "not my work but.." ],
	"CV" : [ "linkedIn" ],
	"about" : [ "who am I?" ]
};

var buttonTags = [ "home", "portfolio", "CV", "about" ];

function addButton(buttonTags, menuElement, i) {
	if (i < 0)
		return;
	var button = $("<li/>", {
		html : buttonTags[i],
		name: buttonTags[i].toLowerCase(),
		class : "link",
	});
	button.hide();
	$(menuElement).append(button);
	button.fadeIn(120, function() {
		addButton(buttonTags, menuElement, --i);
	});

};

function loadSubMenu(button) {
	var subTags = submenu[button];
	$("#subMenu ul").fadeOut(200, function(){
		$("#subMenu ul").empty();
		$("#subMenu ul").fadeIn(0,function(){
			addButton(subTags, "#subMenu ul", subTags.length - 1);
		});
	});
}

function loadContent(button) {
	var content = $("#content");
	var old = content.html();
	$("#footer").fadeOut(100);
	content.fadeOut(100, function() {
		content.empty();
		content.load(button.toLowerCase() + ".html");
		content.fadeIn("fast");
		$("#footer").fadeIn("fast");
	});
}

function buildMenu() {
	var current = "home";

	// fade in buttons
	addButton(buttonTags.reverse(), "#mainMenu ul", buttonTags.length - 1);

	$("#mainMenu ul").on("click", "li", function() {
		// alert("derp");
		var i = buttonTags.indexOf($(this).text());
		if (i >= 0) {
			// alert(buttonTags[i]);
			current = buttonTags[i];
			loadContent(buttonTags[i]);
			loadSubMenu(buttonTags[i]);
		}
	});
	$("#subMenu ul").on("click", "li", function(){
		var i = submenu[current].indexOf($(this).text());
		if (i >= 0) {
			// alert(buttonTags[i]);
			loadContent(buttonTags[i]);
		}
	});
	$("#mainMenu ul li:first").click();

};

$(document).ready(buildMenu);
