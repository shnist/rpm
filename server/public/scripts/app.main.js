require(["jquery", "./scripts/examples.js"], function($, examples) {
  $(document).ready(function(e) {

    console.log('examples', examples);
    examples.bind();
    
    console.log('home');
    
    var trigger = $('#e3-buttonConnect');
    
    console.log('home', trigger);
    
    trigger.click();
  });
});