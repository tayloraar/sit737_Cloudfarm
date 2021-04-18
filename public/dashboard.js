

$(document).ready(function(){
    $('.tabs').tabs();
    $('.sidenav').sidenav();
   
    $.get("/mapSet", function(mapsAPI){
      // console.log(mapsAPI);
      $("#scripts").append(`<script async
      src="https://maps.googleapis.com/maps/api/js?key=${mapsAPI}&callback=initMap">
  </script>`)
    })

  });

    function writeGoogle (){
    
console.log(process.env.MAPSAPI);
    }


  function initMap(){
    var options = {
      zoom:13,
      center:{lat:-37.849555146932836,lng:145.11508912830388}
    }
    var map = new google.maps.Map(document.getElementById('map'), options);

    var marker = new google.maps.Marker({
      position: {lat:-37.849555146932836,lng:145.11508912830388},
      map:map,
      title: "Home Base",
      icon: 'http://maps.google.com/mapfiles/kml/shapes/parks.png'
    })

  }

  // const fetchMap = async =>{
  //   src= `https://maps.googleapis.com/maps/api/js?key=${mapsAPI}&callback=initMap`
  // }
     
 
//   document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
//   });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

