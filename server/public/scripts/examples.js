define(function() {
  
  var e1 = null;
  var e2 = null;
  var e3 = null;
  function Events() {
    
  }
  
  Events.bind = function() {
    $('#e3-buttonConnect').click(function(e) {
      e.preventDefault();
      
      $('#e3-exampleConnection .alert').addClass('hide');    
      $('#e3-exampleConnection .alert-info').removeClass('hide');
      $('#e3-exampleConnection .alert-info').html('Trying to connect to your Arduino…');      
      require(['rpm_duino'], function(example) {
        example.handle();
      });      
    });
    
    
  };
  
  return Events;
});