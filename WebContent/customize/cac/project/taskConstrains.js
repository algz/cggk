/*
 * 根据项目需要，增加到inputJS.js的 ['xietong']模块中，必须放置到最后 ！
 */

TaskBasicForm.allowBlank=false;
updateTaskBasic.allowBlank=false;

//计划开始结束时间的父子约束(父约束子)
//更新时约束
updateTaskBasic.constrain = function(obj) {
	if (obj.start != null) {
		try {
			updateTaskBasic.fatherStart = obj.start;
			updateTaskBasic.start.setMinValue(updateTaskBasic.fatherStart);
			updateTaskBasic.end.setMinValue(updateTaskBasic.fatherStart);
			updateTaskBasic.fatherStart = null;

		} catch (e) {
		}
	}
	if (obj.end != null) {
		try {
			updateTaskBasic.fatherEnd = obj.end;
			updateTaskBasic.start.setMaxValue(updateTaskBasic.fatherEnd);
			updateTaskBasic.end.setMaxValue(updateTaskBasic.fatherEnd);
			updateTaskBasic.fatherEnd = null;
		} catch (e) {
		}
	}
}
//计划开始结束时间的父子约束(父约束子)
//创建时约束
TaskBasicForm.constrain = function(obj) {
	if (obj.start != null) {
		try {
			TaskBasicForm.fatherStart = obj.start;
			TaskBasicForm.start.setMinValue(TaskBasicForm.fatherStart);
			TaskBasicForm.end.setMinValue(TaskBasicForm.fatherStart);
			TaskBasicForm.fatherStart = null;

		} catch (e) {
		}
	}
	if (obj.end != null) {
		try {
			TaskBasicForm.fatherEnd = obj.end;
			TaskBasicForm.start.setMaxValue(TaskBasicForm.fatherEnd);
			TaskBasicForm.end.setMaxValue(TaskBasicForm.fatherEnd);
			TaskBasicForm.fatherEnd = null;
		} catch (e) {
		}
	}
}