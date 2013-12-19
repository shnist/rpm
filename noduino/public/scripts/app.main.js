var p = 'scripts/vendor/';
require(["jquery", p + "dropdown.js", p + "prettify.js", "./scripts/examples.js"], function($, dd, pf, examples) {
  $(document).ready(function(e) {
    prettyPrint();
    console.log('examples', examples);
    examples.bind();
    
    console.log('home');
    
    var trigger = $('#e3-buttonConnect');
    
    console.log('home', trigger);
    
    trigger.click();
  });
});