(function(){
  "use strict";

  var userId;
  var username;
  var socket;

  $(document).ready(function () {
    // $("#usernameContainer").hide();
  });

  window.onload = hub.emit("page loaded", null);

  hub.listen("main map loaded", function (mapName) {
    socket = io();
    var markerCoords = [];

    cookieCheck(); //if they have no username, add null and if they have no userId, add one

    if(needsUsername()) {
      $("#usernameContainer").fadeIn("slow");
    }

    $.get('/allClaps', function(data) {
      console.log("retrieved all claps");
      var claps = JSON.parse(data).sort(sortClaps);
      var accessDOM = '';
      var clapLoad = claps.length > 50 ? 50 : claps.length;
      for(var i = 0 ; i < clapLoad; i++) {
        console.log("clap", claps[i]);
        markerCoords.push(claps[i]);
        // geolocation.addMarker(claps[i]);
        hub.emit("new clap", claps[i], mapName);
        accessDOM += addClap(claps[i]);
      }
      $("#claps").prepend(accessDOM);
      // geolocation.addAllMarkers(markerCoords);
    });

    socket.on('new clap', function(data){ //socket listener
      data = JSON.parse(data);
      var clapAdd = $(addClap(data));
      clapAdd.hide().prependTo("#claps").fadeIn("slow");
      hub.emit("new clap", data, mapName);
    });

    socket.on('delete clap', function(clapId){ //socket listener
      $("#" + clapId).fadeOut("slow", function() {
        $("#" + clapId).remove();
      });
    });

  $('#submitButton').click(function() {
    var clapData = {};
    clapData.userId = document.cookie.split("userId=").pop().split(";").shift();
    clapData.username = document.cookie.split("username=").pop().split(";").shift();
    clapData.message = $('#newClapInput').val();

    hub.emit("coords needed");
    hub.listen("coords sent", function(lat, lon) {
      console.log("lat recieved", lat);
      console.log("lon recieved", lon);
      clapData.lat = lat;
      clapData.lon = lon;
      console.log("claps", clapData);
      if(clapData.message.length > 0) {

        $.post( '/addClap', JSON.stringify(clapData), function(data) {
          var newClap = JSON.parse(data);
          socket.emit('new clap', data);
          hub.emit("new clap", data, mapName);
        });

        $('#newClapInput').val('');
      } else {
        alert("Provide your egotistical ramblings in the text box.");
      }
    });
  });
});

  $('#submitUsername').click(function() {
    var usernameText = $('#usernameInput').val();

    if(usernameText.length < 1) {
      alert("Please enter a username");
      return;
    }

    if(!usernameText.match(/^[a-z0-9]+$/i)) {
      alert("Alphanum only please");
      $('#usernameInput').val('');
      return;
    }

    document.cookie = "username=" + usernameText + ";";
    $("#usernameContainer").fadeOut("slow", function() {
        $("#usernameContainer").remove();
    });
  });

  $('#denyUsername').click(function() {
    document.cookie = "username=###";
    $("#usernameContainer").fadeOut("slow", function() {
        $("#usernameContainer").remove();
    });
  });

  $('#newClapInput').keypress(function(e){
    if(e.keyCode == 13) {
      $('#submitButton').click();
      return false; //prevents a linebreak being added by enter key
    }
  });

  $('#usernameInput').keypress(function(e){
    if(e.keyCode == 13) {
      $('#submitUsername').click();
      return false; //prevents a linebreak being added by enter key
    }
  });

  $('body').on('click','.hashClick', function() {
    console.log($(this).text());
  });

  $('body').on('click','.delButtons', function() {
    var clapId = $(this).parent().attr("id");
    $.post('/delete', clapId, function() {
      socket.emit('delete clap', clapId);
    });
  });
}());
