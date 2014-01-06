// menu stuff

var home = "home";

var portfolio = "portfolio";
var programming = "portfolio_programming";
var visual = "portfolio_visual_design";
var misc = "portfolio_miscallaneous";

var cv = "cv";

var about = "about";
var contact = "contact";

/* text on button / internal name */
var submenu = {
	home : [ [ "herp", home ], [ "derp", home ], [ "nerp", home ] ],
	portfolio : [ [ "Programming", programming ], [ "Visual", visual ], [ "Misc", misc ] ],
	cv : [ [ "linkedIn", cv ] ],
	about : [ [ "who am I?", about ], [ "Contact", contact ] ]
};

var buttonTags = [ [ "Home", home ], [ "Portfolio", portfolio ], [ "CV", cv ], [ "About", about ] ];

function addButton(buttonTags, menuElement, i) {
	if (i >= buttonTags.length)
		return;
	var button = $("<li/>", {
		html : buttonTags[i][0],
		name : buttonTags[i][1].toLowerCase(),
		class : "link",
	});
	button.hide();
	$(menuElement).append(button);
	button.fadeIn(120, function() {
		addButton(buttonTags, menuElement, ++i);
	});

};

function loadSubMenu(button) {
	var subTags = submenu[button];
	$("#subMenu ul").fadeOut(200, function() {
		$("#subMenu ul").empty();
		$("#subMenu ul").fadeIn(0, function() {
			addButton(subTags, "#subMenu ul", 0);
		});
	});
}

function loadContent(button) {
	var content = $("#content");
	var old = content.html();
	$("#footer").fadeOut(100);
	content.fadeOut(100, function() {
		content.empty();
		content.load("content/" + button.toLowerCase() + ".php");
		content.fadeIn("fast");
		$("#footer").fadeIn("fast");
	});
}

function buildMenu() {

	// fade in buttons
	addButton(buttonTags, "#mainMenu ul", 0);

	$("#mainMenu ul").on("click", "li", function() {
		// alert("derp");
		var clickedMenuItem = $(this).attr("name");
		if (clickedMenuItem.length > 0) {
			// alert(buttonTags[i]);
			loadContent(clickedMenuItem);
			loadSubMenu(clickedMenuItem);
		}
	});
	$("#subMenu ul").on("click", "li", function() {
		var clickedSubMenuItem = $(this).attr("name");
		if (clickedSubMenuItem.length > 0) {
			// alert(buttonTags[i]);
			loadContent($(this).attr("name"));
		}
	});
	$("#mainMenu ul li:first").click();

};

$(document).ready(buildMenu);

/* handle contact scheme submission */
$(document).ready(function() {
	$("#content").on("submit", "#contact", function() {
		var name = $(this).find("input[name='name']").val();
		var mail = $(this).find("input[name='mail']").val();
		var message = $(this).find("textarea[name='message']").val();
		alert(name + "\n" + mail + "\n" + message);
		$.post("sendMail.php", {
			name : name,
			mail : mail,
			message : message,
		}, function() {
			alert("posted");
		});

		return false;
	});
});

/* handle login */
$(document).ready(function() {
	$("#loginToggle").click(function() {
		$("#login").load("content/" + "login.php", function() {
			$("#login").fadeToggle("fast");
		});
	});
	$("#login").on("submit", "form", function() {
		var username = $("input[name='username']").val();
		var password = $("input[name='password']").val();

		$.post("authenticate.php", {
			username : username,
			password : password,
		}, function() {
			alert("logging in");
		});
		return false;
	});
});
