<?php
//
// Apache HTTP Server, Web Service Test Example
// Written by Mikael Hasselmalm / Mid Sweden University in February 2017
//
// curl request:
// curl -i -X GET http://localhost/apache_restapi/carlist.php/cars
// curl -i -X GET http://localhost/apache_restapi/carlist.php/cars/1
// curl -i -X POST -d '{"car":"Volvo","model":"142", "year":1971}' http://localhost/apache_restapi/carlist.php/cars
// curl -i -X PUT -d '{"car":"Volvo","model":"142", "year":1971}' http://localhost/apache_restapi/carlist.php/cars/0
// curl -i -X DELETE http://localhost/apache_restapi/carlist.php/cars/1
//
// POST            Creates a new resource.
// GET             Retrieves a resource.
// PUT             Updates an existing resource.
// DELETE          Deletes a resource.
//
// Database name: testrest, Username: testrest, Password: 8ball, Table: Cars 
// ------------------------------------------------------------------------------------
// | ID (int, AI, PRIMARY KEY) | Car (varchar(50)) | Model (varchar(50)) | Year (int) |
// ------------------------------------------------------------------------------------

//
// Get HTTP method, path and input of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

if($request[0] != "workouts"){ 
	http_response_code(404);
	exit();
}

//
// Send return header information
header("Content-Type: text/plain; charset=UTF-8");

$conn = mysqli_connect("localhost", "workoutdiary", "password","workoutdiary") or die("Error connecting to database.");;
$db_connected = mysqli_select_db($conn, "workoutdiary"); // Work with the database named 'testrest' 

//
// HTTP method implementations of GET, POST, PUT and DELETE
switch ($method){
	case "GET":
		$sql = "SELECT workout_id, workout_date, workout_type, workout_name FROM workouts";
		if(isset($request[1])) $sql = $sql . " WHERE workout_id = " . $request[1] . ";";
		break;
	case "PUT":
		$sql = "UPDATE Cars SET Car = '" . $input['car'] . "', Model = '" . $input['model'] . "', Year = '" . $input['year'] . "' WHERE ID = " . $request[1] . ";";
    	break;
	case "POST":
		$sql = "INSERT INTO workouts (workout_type, workout_name) VALUES ('" . $input['workout_type'] . "', " . $input['workout_name'] . ");";
		break;

	case "DELETE":
   		$sql = "DELETE FROM Cars WHERE ID = " . $request[1] . ";";
   		break;
}

//
// Always response with json array of cars except for GET /cars/id
	$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

	$harr = [];
	if($method != "GET") $sql = "SELECT workout_id, workout_date, workout_type, workout_name FROM workouts";
	$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));
    while($row = mysqli_fetch_assoc($result)){
			$row_arr['workout_id'] = $row['workout_id'];
			$row_arr['workout_date'] = $row['workout_date'];
			$row_arr['workout_type'] = $row['workout_type'];
			$row_arr['workout_name'] = $row['workout_name'];
			array_push($harr,$row_arr);
	}
	mysqli_close($conn);
	
	echo json_encode($harr);