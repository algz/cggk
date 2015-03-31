var materialQuotaView = {};

materialQuotaView.tabs = function() {

	// 材料定额
	var materialQuotaTab = materialQuota.tabPanel();
	// 1成品清单定额
	var inventoryTab = inventory.tabPanel();
	// 2备件清册
	var inventoryOneTab = inventoryOne.tabPanel();
	// 3设备清册
	var inventoryTwoTab = inventoryTwo.tabPanel();
	// 4工具清册
	var inventoryThreeTab = inventoryThree.tabPanel();
	// 5标准件清册
	var inventoryFourTab = inventoryFour.tabPanel();

	return [ materialQuotaTab, inventoryTab, inventoryOneTab, inventoryTwoTab,
			inventoryThreeTab, inventoryFourTab ];
}