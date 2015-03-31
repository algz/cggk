/**
 * 屏蔽浏览器状态栏错误消息
 * 需要为每个HTML页面添加，在页面load过程中执行
 */
window.onerror = function(){
	return true;
}
