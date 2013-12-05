define(function() {
  function Example3() {
    
  }
  
  Example3.handle = function() {
    
    require(['scripts/libs/Noduino.js', 'scripts/libs/Noduino.Socket.js', 'scripts/libs/Logger.js'], function(NoduinoObj, Connector, Logger) {
      
      var Noduino = new NoduinoObj({debug: false, host: 'http://localhost:8090'}, Connector, Logger);
      var toggleSwitch = false; //assuming true = "play" & false = "capture"
      var ajaxCall = function(urlString, successFunction, errorFunction){
          $.ajax({
              url: urlString,
              cache: false,
              dataType: "json",

              success: function(data) {
                successFunction();
              },
              error: function(e, xhr){
                errorFunction();
              }

          })
      };

      //button to trigger an action
      Noduino.connect(function(err, board) {   
          board.withButton({pin: 6}, function(err, Button) {
            //i is used for debugging
            var i = 0;
            var success;
            var error;
            var url;

            Button.on('push', function(B) {
                url = 'watevadaurlizblud.html';
                success = function(){
                  console.log('do some shit on success');
                };
                error = function(){
                  console.log("do some shit on fail");
                };

                switch(toggleSwitch){
                  case true :
                    console.log('pin 6 & start playing', i++);
                    ajaxCall(url, success, error);
                  break;
                  case false :
                    console.log('pin 6 & start recording', i++);
                    ajaxCall(url, success, error);
                  break
                }

            });
          });


          //toggle switch for play or record functionality
          board.withButton({pin: 10}, function(err, Button) {
            //i is used for debugging
            var i = 0;

            Button.on('change', function(B) {
                
                if(B.pushed === true){
                  toggleSwitch = false;
                  console.log('event should be true', B.pushed);
                  console.log('expect toggle to be false = ', toggleSwitch);
                }else{
                  toggleSwitch = true;
                  console.log('event should be false', B.pushed);
                  console.log('expect toggle to be true = ', toggleSwitch);
                }
            });
          });
      });
    });
    
  };
  
  return Example3;
});