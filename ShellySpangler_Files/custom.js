//$(document).ready(function() {
//	$("#shelSpangler").toggle( "bounce", { times: 3 }, "slow" );
//});
var pulsate;
function pulsateLink(interval){
    $("#shelSpangler").effect("bounce", "fast");
    pulsate = setTimeout(function() {
        pulsateLink(interval);
    }, interval);
}; 	

function disappear(num)
{
	var disappearInterval = 1000;
	var elementsToHide = 73;
	try
	{
		if(num < elementsToHide+1)
		{
			$("#disappear"+num).css("display", "none");
			$(".disappear"+num).css("display", "none");
		}
		else
		{
			$("#shelSpangler").css("font-size", "300%");
			clearTimeout(pulsate);
			pulsateLink(0);
		}
	}
	catch (ex)
	{}
	if(num < elementsToHide+1)
	{
		setTimeout(function()
		{
			disappear(num+1);
		}, disappearInterval);
	}
};