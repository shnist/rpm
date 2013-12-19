define(function() {
  function Example3() {

  }

  Example3.handle = function() {

    require(['scripts/libs/Noduino.js', 'scripts/libs/Noduino.Socket.js', 'scripts/libs/Logger.js'], function(NoduinoObj, Connector, Logger) {

      var Noduino = new NoduinoObj({debug: false, host: 'http://localhost:8090'}, Connector, Logger);
      var toggleSwitch = false; //assuming true = "play" & false = "capture"
      
      //button to trigger an action
      Noduino.connect(function(err, board) {
          
          board.withButton({pin: 6}, function(err, Button) {
            // console.log('Button 1');
            //i is used for debugging
            var i = 0;
            var success;
            var error;
            var url;
            console.log('Button 1', Button);
            Button.on('push', function(B) {
                // console.log('button 1 event', B);
                url = 'http://localhost:3010/';
                

                switch(toggleSwitch){
                  case true :
                    // console.log('pin 6 & start playing', i++);
                    window.location = url + '?state=true';
                  break;
                  case false :
                    // console.log('pin 6 & start recording', i++);
                    window.location = url + '?state=false';
                  break
                }

            });
          });


          //toggle switch for play or record functionality
          board.withButton({pin: 10}, function(err, Button) {
            console.log('Button 2', Button);
            //i is used for debugging
            var i = 0;

            Button.on('change', function(B) {
                // console.log('button 2 event', B);
                if(B.pushed === true){
                  console.log('event should be true', B.pushed, 'so toggleSwitch is currently set to', toggleSwitch);
                  toggleSwitch = false;
                  console.log('after the event expect toggle to be false = ', toggleSwitch);
                }else{
                  console.log('event should be false', B.pushed, 'so toggleSwitch is currently set to', toggleSwitch);
                  toggleSwitch = true;
                  console.log('after the event expect toggle to be true = ', toggleSwitch);
                }
            });
          });
      });
    });

  };

  return Example3;
});