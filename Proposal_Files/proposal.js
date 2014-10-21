$(document).ready(function()
{
	var fadeTime = 5000;
	var waitToWalk = 0;
	document.getElementById('rescue').play();
	$('.stand').fadeIn(fadeTime);
	setTimeout(function()
	{
		walk(230, 5000);
	}, fadeTime+waitToWalk);
})

function walk(walkAmount, duration)
{
	$('.walk').show();
	$('.stand').css("display", "none");
	$('#linkWalk').animate({ "left": "+=" + walkAmount + "px" }, 5000 );
	$('#zeldaWalk').animate(
		{ "left": "-=" + walkAmount + "px" }, 
		{
			duration: duration,
			complete: function()
			{
				stand();
			}
		}
		);
}

var heartShown = false;

function stand()
{
	var linkPosition = $("#linkWalk").position();
	var zeldaPosition = $("#zeldaWalk").position();

	//Update standing div css to absolute position
	// with current position of walking divs
	$(".stand").css("float", "none");
	$(".stand").css("position", "absolute");
	$("#linkStand").css("left", linkPosition.left);
	$("#zeldaStand").css("left", zeldaPosition.left);

	$(".stand").show();
	$(".walk").hide();

	if (!heartShown)
	{
		$("#heart").fadeIn(
			{
				duration: 3000,
				complete: function()
				{
					setTimeout(function()
					{
						heartShown = true;
						heartFadeAndWalk();
					}, 1000);
				}
			});
	}
	else
	{
		setTimeout(function() {
			pickUp();
		}, 2000);
	}
}

function heartFadeAndWalk()
{
	$("#heart").fadeOut(
		{
			duration: 3000,
			complete: function()
			{
				walk(28, 2000);
			}
		});
}

function pickUp()
{
	document.getElementById('rescue').pause();
	$('.stand').hide();
	$('#pickUp').show();
	document.getElementById('fanfare').play();
}