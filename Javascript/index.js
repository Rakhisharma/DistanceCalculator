function getDistance() {
    var firstPostalcode = document.getElementById("postalCode1").value;
    // console.log(firstPostalcode)
    var secondPostalcode = document.getElementById("postalCode2").value;
    // console.log(secondPostalcode)
    var calculatedistance = {"postcodes" : [firstPostalcode,secondPostalcode]}
        // console.log(calculatedistance);
        $.ajax({  
            type: "POST",  
            url: "https://api.postcodes.io/postcodes",  
            contentType: 'application/json',
            data: JSON.stringify(calculatedistance),  //postcodes expect data in JSON format!
            success: function(dataString) {  
                console.log(dataString)
                var Latitude0 = dataString.result[0].result.latitude;
                var Longitude0 =  dataString.result[0].result.longitude;
                var Latitude1 = dataString.result[1].result.latitude;
                var Longitude1 =  dataString.result[1].result.longitude;
                
                if(Latitude0 && Longitude0 && Latitude1 && Longitude0 != null){
                    var distanceFrom = new google.maps.LatLng(Latitude0, Longitude0);
                    var distanceTo   = new google.maps.LatLng(Latitude1, Longitude1);
                    var dist = google.maps.geometry.spherical.computeDistanceBetween(distanceFrom, distanceTo);
                    dist *= 0.000621371192;
                    alert(dist + "miles");
                } else {
                    alert('Please enter correct postal code');
                }
            },
            fail: function(error)
            {
                console.log("REQUEST FAIL!!")
                console.log(error)
            }  
        });
    }
    
    // UK codes(For testing purpose only)- SW1A 1AA, RG1 3YL, W8 4AA
    // For more postal codes- https://www.doogal.co.uk/ShowMap.php?postcode=W8%204AA