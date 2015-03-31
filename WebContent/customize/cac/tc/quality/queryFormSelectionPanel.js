

queryFormSelectionPanel = {};

/*设计质量单*/
queryFormSelectionPanel.disignQuality = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '2010080621224500028192904a5b2d6b4d4b8ec2',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080621224500031214ac3b8a078949b596b9',
				anchor : '61.8%',
				fieldLabel : '编号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080621224500032887fa5f0fde024d01aea6',
				anchor : '61.8%',
				fieldLabel : '提出单位'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100806212245000328be0b4f1316f14595bdf2',
				anchor : '61.8%',
				fieldLabel : '产品名称'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008062122450003433d6118e0c0284adfa58f',
				anchor : '61.8%',
				fieldLabel : '图号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008062122450003909490605c7684406b81e6',
				anchor : '61.8%',
				fieldLabel : '承办部门'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080621255400062519d08c5daa0948c5b8a5',
				anchor : '61.8%',
				fieldLabel : '承办人员'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008062122450004218d18e88122784a5fb5e7',
				anchor : '61.8%',
				fieldLabel : '完成情况'
		    }),
		    new Ext.form.DateField({
				allowBlank : true,
				id : '20100806212245000421e4f99e61efc94d94a691',
				anchor : '61.8%',
				format : 'Y-m-d',
				fieldLabel : '年份'
		    })
   ];
};

/*故障信息报告单*/
queryFormSelectionPanel.faultInfo = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '201008051854030004849870f78daed5447f90ba',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080518540300051547427fa5321a41e7b9c8',
				anchor : '61.8%',
				fieldLabel : '编号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805185403000515a87b135de9ef4942bc39',
				anchor : '61.8%',
				fieldLabel : '提出单位'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051856330002501ba1d7b416c4415da33d',
				anchor : '61.8%',
				fieldLabel : '产品名称'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051856330003126b02bfd977c34e26a20f',
				anchor : '61.8%',
				fieldLabel : '图号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051856330003753995ce3ff1f54a23bc6d',
				anchor : '61.8%',
				fieldLabel : '故障分类'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805185854000281520c1003f61b4743b355',
				anchor : '61.8%',
				fieldLabel : '承办部门'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805185854000281182823fc2c3c4460a291',
				anchor : '61.8%',
				fieldLabel : '承办人员'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805185854000296802d60c2a5b548ddb248',
				anchor : '61.8%',
				fieldLabel : '完成情况'
		    }),
		    new Ext.form.DateField({
				allowBlank : true,
				id : '201008051858540003123f246c4366f4463a9340',
				anchor : '61.8%',
				format : 'Y-m-d',
				fieldLabel : '年份'
		    })
   ];
};

/*故障信息问题与改进措施报告单*/
queryFormSelectionPanel.faultInfoUpdate = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '201008051902390005150944906823ed4012a105',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805190239000546513e6b7714df49469516',
				anchor : '61.8%',
				fieldLabel : '编号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051902390005783dc37a09193e462ca2de',
				anchor : '61.8%',
				fieldLabel : '提出单位'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519023900059396ed5585dae84fdb958c',
				anchor : '61.8%',
				fieldLabel : '产品名称'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519023900067129ecee7636b441b7bf86',
				anchor : '61.8%',
				fieldLabel : '图号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519023900071874870a1608a847de8850',
				anchor : '61.8%',
				fieldLabel : '承办部门'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051902390007501282efa1082e4fe896d4',
				anchor : '61.8%',
				fieldLabel : '承办人员'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805190239000765f009c9a012794278abe0',
				anchor : '61.8%',
				fieldLabel : '完成情况'
		    }),
		    new Ext.form.DateField({
				allowBlank : true,
				id : '201008051902390007813bac55936fc24bd4ba3e',
				anchor : '61.8%',
				format : 'Y-m-d',
				fieldLabel : '年份'
		    })
   ];
};

/*故障信息问题纠正措施效果确认单*/
queryFormSelectionPanel.faultInfoAffirm = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '201008051904310003120c7e4c20bf02471da6a3',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051904310003437ac443ca06614f3f8d02',
				anchor : '61.8%',
				fieldLabel : '编号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805190622000671292560bfbfce4d70ad77',
				anchor : '61.8%',
				fieldLabel : '关联编号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805190823000906f5a5ce07117a4030aea3',
				anchor : '61.8%',
				fieldLabel : '承办部门'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051908230009538fc34f7da83d4dcfb0ff',
				anchor : '61.8%',
				fieldLabel : '承办人员'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805190823000953b35dee6dbd054c84b35c',
				anchor : '61.8%',
				fieldLabel : '完成情况'
		    }),
		    new Ext.form.DateField({
				allowBlank : true,
				id : '20100805190823000968a3bc3beed4b4430e8426',
				anchor : '61.8%',
				format : 'Y-m-d',
				fieldLabel : '年份'
		    })
   ];
};

/*场外信息管理*/
queryFormSelectionPanel.boardInfoMg = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '20100805191127000125769b30566b8a4e6d9afb',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805191127000140bc602ed2b5ba4883b264',
				anchor : '61.8%',
				fieldLabel : '信息编号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519112700015688f72a4bbede4733924d',
				anchor : '61.8%',
				fieldLabel : '信息来源'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519112700020353e7f4307be04ca4a3d8',
				anchor : '61.8%',
				fieldLabel : '承办部门'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051911270002340b7486bad2ae44e1807a',
				anchor : '61.8%',
				fieldLabel : '完成情况'
		    }),
		    new Ext.form.DateField({
				allowBlank : true,
				id : '20100805191127000250bc95dc1c00654d028e14',
				anchor : '61.8%',
				format : 'Y-m-d',
				fieldLabel : '年份'
		    })
   ];
};

/*场外技术通报归口管理*/
queryFormSelectionPanel.boardTecMg = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519144900021864b2684691144fc79b1b',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519144900025069ece5a2e41e4fd2a95e',
				anchor : '61.8%',
				fieldLabel : '技术通报标号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051914490002810f3cfd04e6b04c67a994',
				anchor : '61.8%',
				fieldLabel : '承办部门'
		    }),
		    new Ext.form.DateField({
				allowBlank : true,
				id : '201008051914490002967838cfb98a484458b4d1',
				anchor : '61.8%',
				format : 'Y-m-d',
				fieldLabel : '年份'
		    })
   ];
};


/*评审问题归零管理*/
queryFormSelectionPanel.syndicIssue = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '20100805191655000031c30bb98fd1bf4e569484',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805191655000078efb066364f5f436f8ed0',
				anchor : '61.8%',
				fieldLabel : '评审会名称'
		    })
   ];
};

/*外部审核问题归零管理表*/
queryFormSelectionPanel.outerAuditing = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '20100805191956000390800791af94e9432bace3',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805191956000406df252fc7c2f54ee0b59b',
				anchor : '61.8%',
				fieldLabel : '审核名称'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805191956000468423881865a964841af85',
				anchor : '61.8%',
				fieldLabel : '完成证据'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805191956000484eb9ef2f3f3b34aa392c3',
				anchor : '61.8%',
				fieldLabel : '承办部门'
		    }),
		    new Ext.form.DateField({
				allowBlank : true,
				id : '2010080519195600050020b36dd310004c05832b',
				anchor : '61.8%',
				format : 'Y-m-d',
				fieldLabel : '年份'
		    })
   ];
};

/*内部自我审核问题归零管理表*/
queryFormSelectionPanel.innerAuditing = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519223700023456d10991cfae4782b859',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805192237000250454d54bc93e44b7bba1a',
				anchor : '61.8%',
				fieldLabel : '审核名称'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805192237000281106a1eaec8e54f96944e',
				anchor : '61.8%',
				fieldLabel : '编号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051922370003123d531158d7e848499ec5',
				anchor : '61.8%',
				fieldLabel : '完成证据'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805192237000328f8f32c5257d0479c93fb',
				anchor : '61.8%',
				fieldLabel : '承办部门'
		    }),
		    new Ext.form.DateField({
				allowBlank : true,
				id : '20100805192237000343f988a45dc93146b88c3a',
				anchor : '61.8%',
				format : 'Y-m-d',
				fieldLabel : '年份'
		    })
   ];
};

/*设计更改的控制，数据库的管理*/
queryFormSelectionPanel.controlDatabaseMg = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '20100805192632000687eac7670bb228485ab755',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519263200076532a8a6bf7f9044cba384',
				anchor : '61.8%',
				fieldLabel : '更改单号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805192632000781ae74b37e498547249fef',
				anchor : '61.8%',
				fieldLabel : '图号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519263200081274ecd69751ee4af6966d',
				anchor : '61.8%',
				fieldLabel : '类别'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805192632000859d75b22a9defd429991b3',
				anchor : '61.8%',
				fieldLabel : '作废状态'
		    })
   ];
};

/*偏离申请单数据库的管理*/
queryFormSelectionPanel.departureApplyDatabaseMg = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519322300096828e437a37546412baf77',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805193224000000e67f60bb7b0d4e8db0f0',
				anchor : '61.8%',
				fieldLabel : '偏离申请单号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805193224000015c3ec86a4052346aeaedf',
				anchor : '61.8%',
				fieldLabel : '图号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805193224000093ecc9d520042340c88a6b',
				anchor : '61.8%',
				fieldLabel : '作废状态'
		    })
   ];
};

/*不合格品审理单数据库的管理*/
queryFormSelectionPanel.noEligibleDatabaseMg = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '201008051936110003122844eba1eacd4730acbd',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805193611000359e7950c0d8cd4400ca2cd',
				anchor : '61.8%',
				fieldLabel : '不合格产品单号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '201008051936110003758122a767abe84931b97a',
				anchor : '61.8%',
				fieldLabel : '图号'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519361100043783c50a5842a3417096a0',
				anchor : '61.8%',
				fieldLabel : '作废状态'
		    })
   ];
};

/*机载软件版本清单库*/
queryFormSelectionPanel.softEditionDatabase = function() {
	return [
	        new Ext.form.TextField({
				allowBlank : true,
				id : '20100805193820000234ba7f58715dab49f98a53',
				anchor : '61.8%',
				fieldLabel : '机型'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519382000026595dfb9a3fea84b1392a9',
				anchor : '61.8%',
				fieldLabel : '软件名称'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '2010080519382000028196c6620fe46a4650acfc',
				anchor : '61.8%',
				fieldLabel : '成品名称'
		    }),
		    new Ext.form.TextField({
				allowBlank : true,
				id : '20100805193820000312b6414f10a59e451c9d1f',
				anchor : '61.8%',
				fieldLabel : '成品协议号'
		    })
   ];
};
