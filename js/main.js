/***********************************************************************************
 * 
 * This is a Apache REST API test page
 * 
 * Author: Mikael Hasselmalm
 * rev. 2018-09-01
 * 
 * *********************************************************************************/
"use strict";

var URL = "http://localhost/apache_restapi/carlist.php/workouts/";

//
// DOM onload
document.addEventListener("DOMContentLoaded", function(){ // Wait for DOM tree to get parsed

  //
  // Click on delete car button - DELETE
    document.getElementById("workoutlist").addEventListener("click", function(ev){ 
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("DELETE", URL+"/"+ev.target.id, true);
        xmlhttp.send();

        xmlhttp.onload = function() {
            location.reload();
        }
    })

  //
  // Click on add car button - POST
    document.getElementById("add").addEventListener("click", function(ev){
        let type = document.getElementById("workout_type").value;
        let name = document.getElementById("workou_name").value;
        if( !(type != '' && name != '') ) location.reload();
        let json =  {"workout_type": type, "workout_name": name};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", URL, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send( JSON.stringify(json) );

        xmlhttp.onload = function() {
            location.reload();
        }
  })

  //
  // Click on update car button - PUT
    document.getElementById("update").addEventListener("click", function(ev){
        let id = document.getElementById("idno").value;
        let brand = document.getElementById("brando").value;
        let model = document.getElementById("modelo").value;
        let year = document.getElementById("yearo").value;
        if( !(id != '' && brand != '' && model != '' && year != '') ) location.reload();

        let json =  {"car": brand, "model": model, "year": year};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", URL+"/"+id, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send( JSON.stringify(json) );

        xmlhttp.onload = function() {
//        var jsonData = JSON.parse( this.responseText );
//        for(var i=0; i < jsonData.length; i++){
//                   document.getElementById("carlist").innerHTML += "<td>"+jsonData[i].ID+"</td><td>"+jsonData[i].Car+"</td><td>" + jsonData[i].Model + "</td><td>" + jsonData[i].Year + "</td>";    
//        }
            location.reload();
        }  
  })

  //
  // Show all cars in table - GET
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {

                var jsonData = JSON.parse(xmlhttp.responseText);
                for(var i=0; i < jsonData.length; i++){

                   document.getElementById("workoutlist").innerHTML += "</td><td>"+jsonData[i].workout_date+"</td><td>" + jsonData[i].workout_type + "</td><td>" + jsonData[i].workout_name + "</td><td><button id='"+jsonData[i].workout_id+"'>Delete #"+jsonData[i].workout_id+"</button></td>";    
                }
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", URL, true);
    xmlhttp.send();

}); 
