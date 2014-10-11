$( "#destinationSearchContainer").focusin(function() {
	$( ".popdownMenu").css('display','block');
});

$( "#destinationSearchContainer").focusout(function() {
	if ($("#destinationSearch").val() == "") {
		$( ".popdownMenu").css('display','none');
	}
});