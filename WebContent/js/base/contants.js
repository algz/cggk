var contants = {
	"task" : {
		planning_status : 1,
		unactive_status : 2,
		unaccepted_status : 3,
		workning_status : 4,
		confirmning_status : 5,
		finished_status : 6,
		terminated_status : 7,
		approving_status : 11
	}
}

contants.projectCss = function(status) {
	var str = "icon-planningTask";
	if (status == 1) {
		str = "icon-planningTask";
	} else if (status == 2) {
		str = "icon-unactiveTask";
	} else if (status == 3) {
		str = "icon-unacceptedTask";
	} else if (status == 4) {
		str = "icon-workingTask";
	} else if (status == 5) {
		str = "icon-confirmingTask";
	} else if (status == 6) {
		str = "icon-finishedTask";
	} else if (status == 7) {
		str = "icon-terminatedTask";
	} else if (status == 11) {
		str = "icon-approvingTask";
	}
	return str;
}
contants.taskCss = function(status) {
	var str = "icon-planningProject";
	if (status == 1) {
		str = "icon-planningProject";
	} else if (status == 4) {
		str = "icon-workingProject";
	} else if (status == 5) {
		str = "icon-confirmingProject";
	} else if (status == 6) {
		str = "icon-finishedProject";
	} else if (status == 7) {
		str = "icon-terminatedProject";
	} else if (status == 11) {
		str = "icon-approvingProject";
	}
	return str;
}
contants.user = function() {
	var str = "icon-userload";

	return str;
}