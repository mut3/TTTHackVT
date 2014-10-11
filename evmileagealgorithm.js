
function calculateSomeStuff() 
{
	var percentLeft = document.getElementById("percent_left").value;
	var milesPerCharge = document.getElementById("mp_charge").value;
	//var pricePerGallon = document.getElementById("price_per_gallon").value;

	if (percentLeft <= 0 || milesPerCharge <= 0) 
	{
		alert("Please enter a value higher than 0!");
    } 
	else 
	{
        var milesLeft = milesPerCharge / percentLeft;
        var costOfPreviousTrip = ((100-percentLeft)*15*3.44);
    }
        if (milesLeft === undefined || costOfPreviousTrip === undefined) 
		{
            milesLeft = 0;
            costOfPreviousTrip = 0;
		}
 // parse and format the output
    var pmpc = parseFloat(milesPerCharge).toFixed(2);
	document.getElementById("your_miles").innerText = pmpc;
	
	var pcopt = parseFloat(costOfPreviousTrip).toFixed(2);
	var output = "$" + pcopt;
	document.getElementById("cost_of_ptrip").innerText = output;
 }


  // initialize
function init() 
{
    document.getElementById("calculate").onclick = calculateMpg;
}
 window.onload = init;
