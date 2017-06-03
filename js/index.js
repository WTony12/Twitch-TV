//At load
$(document).ready(function(){
	//Users Array
	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

	$("#bottomOn").hide();
	$("#bottomOff").hide();

	//Add HTML block;
	var addBlock = function(name, dis, status, logo){
		var html = "<div class=\"row bottomDiv\"><div class=\"col\"><div class=\"row\"><div class=\"col\"><div id=\"logo\" style=\"background-image: url(\'" + logo + "\')\"></div></div><div id=\"name\" class=\"col\"><br><br><a href=\"https://www.twitch.tv/" + name + "\" target=\"_blank\">" + dis + "</a></div></div></div><div id=\"stat\" class=\"col\"><br><br>" + status + "</div></div>";

		return html;
	};
	//Get JSON from twitch API
	var getJson = function(user){
		var stream = -1;
		var status = "";
		//Check if streaming
		var url = "https://wind-bow.gomix.me/twitch-api/streams/"+ user + "?callback=?";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: function(data){
				console.log(data);
				if(data.stream === null)
				{
					stream = 0;
					status = "Offline";
				}
				else
				{
					stream = 1;
					status = data.stream.game;
				}
			}
		});
		//Get User data
		url = "https://wind-bow.gomix.me/twitch-api/users/"+ user + "?callback=?";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: function(data){
				if(data.name === undefined)
				{
					status = "Account Closed";
					$("#bottomAll").append(addBlock(user, user, status, "./Resources/error.png"));
				}
				else if(stream === 0)
				{
					$("#bottomAll").append(addBlock(data.name, data.display_name, status, data.logo));
					$("#bottomOff").append(addBlock(data.name, data.display_name, status, data.logo));
				}
				else if(stream === 1)
				{
					$("#bottomAll").append(addBlock(data.name, data.display_name, status, data.logo));
					$("#bottomOn").append(addBlock(data.name, data.display_name, status, data.logo));
				}
			}
		});
	};
	//All is clicked
	$("#all").on("click", function(){
		$("#bottomOn").hide();
		$("#bottomOff").hide();
		$("#bottomAll").show();
	});
	//On is clicked
	$("#on").on("click", function(){
		$("#bottomAll").hide();
		$("#bottomOff").hide();
		$("#bottomOn").show();
	});
	//Off is clicked
	$("#off").on("click", function(){
		$("#bottomAll").hide();
		$("#bottomOn").hide();
		$("#bottomOff").show();
	});

	users.forEach(function(user){
		getJson(user);
	});
});
