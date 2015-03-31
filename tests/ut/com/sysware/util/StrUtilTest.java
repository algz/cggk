package ut.com.sysware.util;

import org.junit.Assert;
import org.junit.Test;

import com.sysware.util.StrUtil;


public class StrUtilTest {

	@Test
	public void trimLastTest(){
		String src = "abc/";
		String expected = "abc";
		String actual = StrUtil.trim(src, "/");
		Assert.assertEquals(expected, actual);
		
		
		src = "abc/d";
		expected = "abc/d";
		actual = StrUtil.trim(src, "/");
		Assert.assertEquals(expected, actual);
		
		
		src = "/abc/";
		expected = "abc";
		actual = StrUtil.trim(src, "/");
		Assert.assertEquals(expected, actual);
		
		src = "a/abc/";
		expected = "a/abc";
		actual = StrUtil.trim(src, "/");
		Assert.assertEquals(expected, actual);
		
		src = "/";
		expected = "";
		actual = StrUtil.trim(src, "/");
		Assert.assertEquals(expected, actual);
		
		src = "///";
		expected = "";
		actual = StrUtil.trim(src, "/");
		Assert.assertEquals(expected, actual);
		
		src = "abcabc";
		expected = "";
		actual = StrUtil.trim(src, "abc");
		Assert.assertEquals(expected, actual);
		
		src = "abc abc";
		expected = " ";
		actual = StrUtil.trim(src, "abc");
		Assert.assertEquals(expected, actual);
	}
	@Test
	public void isNullOrEmptyTest(){
    String str="";
    boolean expected=true;
    boolean actual=StrUtil.isNullOrEmpty(str);
    Assert.assertEquals(expected, actual);
    
    str="abc";
    expected=false;
    actual=StrUtil.isNullOrEmpty(str);
    Assert.assertEquals(expected, actual);
    
//    str=" ";
//    expected=true;
//    actual=StrUtil.isNullOrEmpty(str);
//    Assert.assertEquals(expected, actual);
    
    str=null;
    expected=true;
    actual=StrUtil.isNullOrEmpty(str);
    Assert.assertEquals(expected, actual);
	}
	@Test
	public void getIsZhongWenTest(){
		String str="郭靖";
		boolean expected=true;
		boolean actual=StrUtil.getIsZhongWen(str);
		Assert.assertEquals(expected, actual);
		
		str="abc/c*";
		expected=false;
	    actual=StrUtil.getIsZhongWen(str);
	    Assert.assertEquals(expected, actual);
	    
	    str="";
		expected=false;
	    actual=StrUtil.getIsZhongWen(str);
	    Assert.assertEquals(expected, actual);
	}
	@Test
	public void trimAllBlankTest(){
	  	String str="a b  cd";
	  	String expected="abcd";
	  	String actual=StrUtil.trimAllBlank(str);
	  	Assert.assertEquals(expected, actual);
	  	
		 str="你好 啊  ab";
	  	 expected="你好啊ab";
	  	 actual=StrUtil.trimAllBlank(str);
	  	Assert.assertEquals(expected, actual);
	}
}
