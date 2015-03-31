package com.sysware.customize.hd.investment.user;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.jboss.seam.annotations.Name;

import com.luck.itumserv.base.jdbc.SingleConnection;

@Name("hrInUserDaoImpl")
public class HrInUserDaoImpl implements HrInUserDao {

	public String importUser() {
		int code = 0;
		Connection conn = null;
		SingleConnection  sc = SingleConnection.getInstance();
		conn = SingleConnection.getInstance().getConnection();
		String call = "{call Auto_Code_p.User_In_p(?,?)}";
		CallableStatement proc;
		ResultSet rs = null;
	
		try {
			proc = conn.prepareCall(call); 
			proc.registerOutParameter(1, oracle.jdbc.OracleTypes.INTEGER);
			proc.registerOutParameter(2, oracle.jdbc.OracleTypes.VARCHAR);
			proc.execute();
			code =  (Integer) proc.getObject(1); 
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			sc.colseConnection(conn);
		}
		if(code==0)
			return "{success:true}";
		else
			return "{failure:true}";
	}

}
