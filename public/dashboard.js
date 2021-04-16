//lets test
//second test
//third test

$(document).ready(function(){
    $('.tabs').tabs();
    $('.sidenav').sidenav();

    

  });

  function initMap(){
    var options = {
      zoom:13,
      center:{lat:-37.849555146932836,lng:145.11508912830388}
    }
    var map = new google.maps.Map(document.getElementById('map'), options);

    var marker = new google.maps.Marker({
      position: {lat:-37.849555146932836,lng:145.11508912830388},
      map:map,
      title: "Home Base"
    })

  }
//   document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
//   });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

