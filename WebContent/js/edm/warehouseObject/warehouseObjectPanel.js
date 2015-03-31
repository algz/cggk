var warehouseObjectPanel = {
	grid : null,
	warehouseObjectListPanel : null,
	start : 0,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null
}
Ext.util.JSON.d
warehouseObjectPanel.init = function() {
	var structure = {
		
	}
	var products = ['ProductX', 'ProductY'];
	var fields = []
	var columns = []
	var data = []
	var continentGroupRow = []
	var cityGroupRow = [];

	/*
	 * Example method that generates: 1) The column configuration for the grid
	 * 2) The column grouping configuration 3) The data for the store 4) The
	 * fields for the store
	 */
	function generateConfig() {
		var arr, numProducts = products.length;

		Ext.iterate(structure, function(continent, cities) {

					continentGroupRow.push({
								header : continent,
								align : 'center',
								colspan : cities.length * numProducts
							});
					Ext.each(cities, function(city) {
						cityGroupRow.push({
									header : city,
									colspan : numProducts,
									align : 'center'
								});
						Ext.each(products, function(product) {
									// fields.push({
									// type : 'int',
									// name : city + product
									// });
									columns.push({
												dataIndex : city + product,
												header : product,
												renderer : Ext.util.Format.usMoney
											});
								});
							// arr = [];
							// for (var i = 0; i < 20; ++i) {
							// arr.push((Math.floor(Math.random() * 11) + 1)
							// * 100000);
							// }
							// data.push(arr);
					});
				})
	}
	// Run method to generate columns, fields, row grouping
	generateConfig();

	/*
	 * continentGroupRow at this point is: [ {header: 'Asia', colspan: 4, align:
	 * 'center'}, {header: 'Europe', colspan: 6, align: 'center'} ]
	 * 
	 * cityGroupRow at this point is: [ {header: 'Beijing', colspan: 2, align:
	 * 'center'}, {header: 'Tokyo', colspan: 2, align: 'center'}, {header:
	 * 'Berlin', colspan: 2, align: 'center'}, {header: 'London', colspan: 2,
	 * align: 'center'}, {header: 'Paris', colspan: 2, align: 'center'} ]
	 */
	var group = new Ext.ux.grid.ColumnHeaderGroup({
				rows : [cityGroupRow]
			});
	// var group = new Ext.ux.grid.ColumnHeaderGroup({
	// rows : [continentGroupRow, cityGroupRow]
	// });

	/*
	 * fields at this point is: [ {type: 'int', name: 'BeijingProductX'}, {type:
	 * 'int', name: 'BeijingProductY'}, {type: 'int', name: 'TokyoProductX'},
	 * {type: 'int', name: 'TokyoProductY'}, {type: 'int', name:
	 * 'BerlinProductX'}, {type: 'int', name: 'BerlinProductY'}, {type: 'int',
	 * name: 'LondonProductX'}, {type: 'int', name: 'LondonProductY'}, {type:
	 * 'int', name: 'ParisProductX'}, {type: 'int', name: 'ParisProductY'} ]
	 * 
	 * columns at this point is: [ {dataIndex: 'BeijingProductX', header:
	 * 'ProductX'}, {dataIndex: 'BeijingProductY', header: 'ProductY'},
	 * {dataIndex: 'TokyoProductX', header: 'ProductX'}, {dataIndex:
	 * 'TokyoProductY', header: 'ProductY'}, {dataIndex: 'BerlinProductX',
	 * header: 'ProductX'}, {dataIndex: 'BerlinProductY', header: 'ProductY'},
	 * {dataIndex: 'LondonProductX', header: 'ProductX'}, {dataIndex:
	 * 'LondonProductY', header: 'ProductY'}, {dataIndex: 'ParisProductX',
	 * header: 'ProductX'}, {dataIndex: 'ParisProductY', header: 'ProductY'} ]
	 */
	warehouseObjectPanel.grid = new Ext.grid.GridPanel({
				// renderTo : 'column-group-grid',
				width : 650,
				autoHeight : true,
				store : new Ext.data.ArrayStore({
							fields : fields,
							data : data
						}),
				cm : new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : columns
				}),
				viewConfig : {
					forceFit : true
				},
				plugins : group
			});
	return warehouseObjectPanel.grid;
}
