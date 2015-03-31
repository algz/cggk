package com.sysware.customize.hd.investment.user;

/**
 * 320单点登录实现
 * zhaodw
 */
import javax.faces.context.FacesContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.xerces.impl.dv.util.Base64;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;  
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.base.user.UserSerivce;
import com.luck.itumserv.entity.Guser;
import com.luck.itumserv.services.security.Authenticator;
import com.luck.itumserv.services.security.Identity;
import com.sysware.util.EdmSession;

@Name("singleLogin")
public class SingleLoginUtil {
	@In(value = "base_user_UserSerivce", create = true)
	UserSerivce userSerivce;
	 @In
	 Identity identity;
	@In(value = "auth", create = true)
	Authenticator auth;
	//用户登录名称
	String username;
	private String  password;
	/**
	 * 320单点登录实现
	 * 
	 * @return 用户验证结果
	 */
	@WebRemote
	public boolean doLogin() {
		boolean result = true;
		FacesContext facesContext = FacesContext.getCurrentInstance();
		HttpServletRequest request = ((HttpServletRequest)facesContext.getExternalContext().getRequest
		        ());
		HttpServletResponse response = ((HttpServletResponse)facesContext.getExternalContext().getResponse());
//		单点登录Base64解密username
//		System.out.println(Base64.encode("jsjhy".getBytes()));
		this.username = new String(Base64.decode(username));
		Guser user1 = userSerivce.getUserByLoginName(username);
		if(user1==null)
			result =  false;
		else{
			    this.identity.setUsername(this.username); 
			    this.identity.login();
			    result = this.identity.isLoggedIn();

			    if (result) { 
			      response = 
			        ((HttpServletResponse)facesContext.getExternalContext().getResponse
			        ());
			      Cookie user = new Cookie("userid", identity.getLoginUser().getUserid
			        ().toString());
			      user.setPath("/");
			      response.addCookie(user); 
			      identity.getLoginUser().setIp(request.getRemoteAddr());

			      EdmSession.record(this.username.toLowerCase(),request.getSession().getId());
			    }
		}
		request.getSession().setAttribute("result", result);
		return result; 
	}
 
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
