// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  
  var streams = {
    streamsList: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"],
    streamData: [],
    getStreamData: function() {
      this.streamsList.forEach(function(stream, index) {
        $.ajax({
          type: 'GET',
          url: 'https://api.twitch.tv/kraken/streams/' + stream,
          headers: {
            'Client-ID': 'qxakknksxswh3c64evbw4zoc0kiuomk'
          },
          success: function(json) {
            json.stream ? streams.streamData.push({'streamName': json.stream.channel.display_name, 'streamGame': json.stream.channel.game, 'streamStatus': json.stream.channel.status, 'streamLogo': json.stream.channel.logo, 'streamUrl': json.stream.channel.url}) : 
                        $.ajax({
                          type: 'GET',
                          url: 'https://api.twitch.tv/kraken/channels/' + stream,
                          headers: {
                            'Client-ID': 'qxakknksxswh3c64evbw4zoc0kiuomk'
                          },
                          success: function(json2) {
                            streams.streamData.push({'streamName': json2.display_name, 'streamStatus': 'Offline', 'streamLogo': json2.logo, 'streamUrl': json2.url});
                          }
                        });
                        
          }
        }).fail(function() {
          streams.streamData.push({'streamName': streams.streamsList[index], 'streamStatus': 'Account Closed', 'streamUrl': 'https://www.twitch.tv/' + streams.streamsList[index], 'streamLogo': 'https://web-cdn.ttvnw.net/images/xarth/dead_glitch.png'});
        // }).done(function(){
        //   view.displayStreams();
        });
      }, this);
    }
    
  };
  
  var view = {
    displayStreams: function() {
      var streamsUl = document.querySelector('ul');
      streamsUl.innerHTML = '';
      streams.streamData.forEach(function(item) {
        var streamLi = document.createElement('li');
        var html = '';
        var image = '<img src="' + item.streamLogo + '">';
        var link = '<a href="' + item.streamUrl + '" target="_blank">' + item.streamName + '</a>';
        var status = '<span> - ' + item.streamStatus + '</span>';
        html = image + link;
        if (item.streamGame !== undefined) {
          var game = '<span> - ' + item.streamGame + '&nbsp;</span>';
          html += game;
        }
        html += status;
        streamLi.innerHTML = html;
        streamsUl.appendChild(streamLi);
        console.log(streamLi);
      }, this);
    }
  };

  $('#request').on('click', function() {
    view.displayStreams();
  });
  
  streams.getStreamData();
});
