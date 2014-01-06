// menu stuff

var home = "home";

var portfolio = "portfolio";
var programming = "portfolio_programming";
var visual = "portfolio_visual_design";
var misc = "portfolio_miscallaneous";

var cv = "cv";

var about = "about";
var contact = "contact";

/* button creation OOP-style */
var buttonPrototype = {
	name : "home",
	text : "Button",
	parent : null,
	setChildren : function(children) {
		for ( var i = 0; i < children.length; i++) {
			children[i].parent = this;
		}
		this.children = children;
	},
};

function Button(name, text) {
	this.name = name;
	this.text = text;
	this.location = "content/" + this.name + ".php";
}
Button.prototype = buttonPrototype;

/* button factory, abstractions bitch! */
function b(name, text) {
	return new Button(name, text);
}

var btnHome = b(home, "Home");
var btnPortfolio = b(portfolio, "Portfolio");
var btnCV = b(cv, "CV");
var btnAbout = b(about, "About");

btnHome.setChildren([ b(home, "derp"), b(home, "herp"), b(home, "nerp") ]);
btnPortfolio.setChildren([ b(programming, "Programming"), b(visual, "Visual"), b(misc, "Misc") ]);
btnCV.setChildren([ b(cv, "linkedIn") ]);
btnAbout.setChildren([ b(about, "who am I?"), b(contact, "Contact") ]);

var menu = [ btnHome, btnPortfolio, btnCV, btnAbout ];

function addButton(menu, menuElement, i) {
	if (i >= menu.length)
		return;
	var button = $("<li/>", {
		html : menu[i].text,
		name : menu[i].name,
		class : "link",
	});
	button.hide();
	$(menuElement).append(button);
	button.fadeIn(120, function() {
		addButton(menu, menuElement, ++i);
	});

};

function loadSubMenu(button) {
	$("#subMenu ul").fadeOut(200, function() {
		$("#subMenu ul").empty();
		$("#subMenu ul").fadeIn(0, function() {
			addButton(button.children, "#subMenu ul", 0);
		});
	});
}

function loadContent(button) {
	var content = $("#content");
	$("#footer").fadeOut(100);
	content.fadeOut(100, function() {
		content.empty();
		content.load(button.location);
		content.fadeIn("fast");
		$("#footer").fadeIn("fast");
	});
}

function buildMenu() {

	// fade in buttons
	addButton(menu, "#mainMenu ul", 0);

	var activeMenuItem = menu[0];

	$("#mainMenu ul").on("click", "li", function() {
		// alert(buttonTags[i]);
		var clickedMenuItemName = $(this).attr("name");
		for ( var i = 0; i < menu.length; i++) {
			if (clickedMenuItemName == menu[i].name) {
				loadContent(menu[i]);
				loadSubMenu(menu[i]);
				activeMenuItem = menu[i];
				break;
			}
		}
	});
	$("#subMenu ul").on("click", "li", function() {
		var clickedMenuItemName = $(this).attr("name");
		var subMenuButtons = activeMenuItem.children;
		for ( var i = 0; i < subMenuButtons.length; i++) {
			if (clickedMenuItemName == subMenuButtons[i].name) {
				loadContent(subMenuButtons[i]);
				break;
			}
		}
	});

	$("#mainMenu ul li[name='" + menu[0].name + "']").click();
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
