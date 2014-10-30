$(document).ready(function()
{
	// Fanfare is too loud!
	document.getElementById('fanfare').volume = "0.7";
	storyText(0);
	//TEST STUFF
	//addHeartClickEvent();
	//storyText(0);
	// FOR TESTING ZELDA PAGE
	//$("#htmlBody").css("backgroundColor", "#FFFFFF");
	//$(".zelda").css("display", "visible");
	//heartAttention();
	//zeldaStart(2500);


	//setTimeout(function(){
	//	popTheQuestion(0);
	//},5000);
});

var page1Done = false;
function storyText(lineNumber)
{	
	var page1Lines = 6;
	var totalLines = 14;
	var page1FadeTimeout = 5000;
	var lineFadeTimeout = 0;
	var lineFadeTime = 3000;

	// No more recursion if totalLines has been met
	if (lineNumber < totalLines)
	{
		// If we're done with page 1
		if (lineNumber == page1Lines && page1Done == false)
		{
			page1Done = true;
			//Fade out page 1
			setTimeout(function(){
				$("#page1Text").fadeOut(
				{
					duration: lineFadeTime,
					complete: function(){
						// Show page2TextDiv
						$("#page2Text").show();
						// Pass in same lineNumber to start page 2 because page1Done is true
						storyText(lineNumber);
					}
				}, page1FadeTimeout);
			});
		}
		else
		{
			$("#line"+lineNumber).fadeIn(
			{
				duration: lineFadeTime,
				complete: function(){
					setTimeout(function() {
						storyText(lineNumber+1);
						}, lineFadeTimeout);
				}	
			});	
		}
	}
	else if(lineNumber == totalLines)
	{	
		var introFadeOut = 2500;
		var introFadeOutWait =  5000;
		setTimeout(function(){
			// Fftheme fade out
			$('#ffTheme').animate({volume: 0}, 
				{
					duration: introFadeOut,
					complete: function(){
						// Stop ffTheme
						document.getElementById('ffTheme').pause();
					}
				});
			// Fade out intro text
			$('.line').fadeOut(introFadeOut);
			// Fade background color to white

			$('#htmlBody').animate(
				{backgroundColor: '#FFFFFF'}, 
				{
					duration: introFadeOut,
					complete: function(){
						zeldaStart(introFadeOut);
					}
				});
		}, introFadeOutWait);
	}
}

function zeldaStart(introFadeOut)
{
	$(".zelda").fadeIn(
	{
		duration: introFadeOut,
		complete: function() {
			var fadeTime = 5000;
			var waitToWalk = 0;
			var believe = document.getElementById("believe");
			believe.volume = 0;
			believe.play();
			$('#believe').animate({volume: 1}, 7000); 
			$('.stand').fadeIn(fadeTime);
			setTimeout(function()
			{
				walk(230, 5000);
			}, fadeTime+waitToWalk);
		}
	});

}

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
					heartShown = true;
					popTheQuestion(0);
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
	var fadeDuration = 3000;
	heartDone = true;
	$("#heart").fadeOut(
		{
			duration: fadeDuration,
			complete: function()
			{
				walk(28, 2000);
			}
		});
	$('#messageDisplay').fadeOut(
		{
			duration: fadeDuration,
			complete: function(){
				$('#messageDisplay').text('');
			}
		});
}

function pickUp()
{
	document.getElementById('believe').pause();
	$('.stand').hide();
	$('#pickUp').show();
	document.getElementById('fanfare').play();
	var pickUpPos = $("#pickUp").position();
	$("#carry").css("left", pickUpPos.left);
	$("#carry").css("top", pickUpPos.top);
	setTimeout(function(){
		hotFiance();
	},2000);
}

function runAway(){
	$("#carry").show();
	$("#pickUp").hide();
	$('#triforce').fadeOut(1500);
	$('#carry').fadeOut(1500).animate(
		{ "left": "+=" + 300 + "px" }, 
		{
			duration: 2000,
			queue: false,
			complete: function(){
				$('#outro').show();
				$('#triforce').text('');
				$("#triforce").css("background-repeat", "no-repeat");
				$("#triforce").css("background-position", "center");
				$("#triforce").css("background-image", "url('Proposal_Files/animate.gif')");
				$('#triforce').fadeIn(3000);
				displayFinalMessage(0);
			}
		});
};

var finalMessage = "With a wish in her heart, Shelly reached ";
	finalMessage +=	"out and touched Joe. The two lived and loved forever. "
	finalMessage += "The rest, as they say, is history…";
var finalMessageDelay = 100;
function displayFinalMessage(index){
	if(index < finalMessage.length) 
	{
		var currentMessage = $("#outro").text();
		$("#outro").text(currentMessage+finalMessage[index]);

		setTimeout(function(){
			displayFinalMessage(index+1);
		}, finalMessageDelay);
	}
	else
	{
		setTimeout(function()
		{
			$('#outro').fadeOut(
				{ 
					duration: 2000,
					complete: function()
					{
						$('#outro').text("THE END");
						$('#outro').css("font-size", "1200%");
						$('#outro').fadeIn(2000);
					}
				});
		}, 5000);
	}
}

var heartDone = false;
var heartNormal = true;
function heartAttention() {
	var delay = 500;
	if (!heartDone)
	{
		if (heartNormal)
		{
			$("#heart").attr('class', 'heartAttention');
			heartNormal = false;
		}
		else
		{
			$("#heart").attr('class', 'heartNormal');
			heartNormal = true;
		}

		setTimeout(function()
		{
			heartAttention();
		}, delay);
	}
}

var message = "Will you marry me?";
var messageDelay = 100;
function popTheQuestion(index)
{
	if(index < message.length) 
	{
		var currentMessage = $("#messageDisplay").text();
		$("#messageDisplay").text(currentMessage+message[index]);

		setTimeout(function(){
			popTheQuestion(index+1);
		}, messageDelay);
	}
	else
	{
		questionAsked = true;
		$("#heartText").fadeIn();
		addHeartClickEvent();
		setTimeout(function(){
			heartAttention();
		}, 1000);
	}
}

function hotFiance()
{
	$("#messageDisplay").show();
	$('#messageDisplay').css("font-size", "370%");
	document.getElementById('anyway').play();
	displayHotFianceMessage(0);
}

var hotFianceMessage = "Joe got a hot fiance\'e!";
function displayHotFianceMessage(index)
{
	if(index < hotFianceMessage.length)
	{
		var currentMessage = $("#messageDisplay").text();
		$("#messageDisplay").text(currentMessage+hotFianceMessage[index]);

		setTimeout(function(){
			displayHotFianceMessage(index+1);
		}, messageDelay);
	}
	else
	{
		setTimeout(function()
		{
			runAway();
		}, 2000);
	}
}

var questionAsked = false;
var questionAnswered = false;
function addHeartClickEvent(){
	$("#heartText").click(function()
	{
		if(!questionAnswered)
		{
			questionAnswered = true;	
			answerYes();
		}
	});
	$('#heart').click(function()
	{
		if(!questionAnswered)
		{	
			questionAnswered = true;
			answerYes();
		}
	});
}

function answerYes()
{
	if(questionAsked)
	{
		$('#heart').attr("class", "heartFinal");
		heartFadeAndWalk();
	}

}