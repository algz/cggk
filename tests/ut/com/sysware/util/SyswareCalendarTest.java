package ut.com.sysware.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import junit.framework.Assert;

import org.junit.Test;

import com.sysware.util.SyswareCalendar;

public class SyswareCalendarTest {

	@Test
	public void getNumDaysInMonthTest() throws ParseException{
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM");
		
		int expected = 31;
		int actual = SyswareCalendar.getNumDaysInMonth(sf.parse("2010-12"));
		Assert.assertEquals(expected, actual);
		
		expected = 30;
		actual = SyswareCalendar.getNumDaysInMonth(sf.parse("2010-11"));
		Assert.assertEquals(expected, actual);
		
		expected = 31;
		actual = SyswareCalendar.getNumDaysInMonth(sf.parse("2010-10"));
		Assert.assertEquals(expected, actual);
	}

	/**
	 * 计算工作日
	 */
	@Test
	public void getWorkingDays() {
		Calendar early = Calendar.getInstance();
		early.set(2010, 05 - 1, 01);

		Calendar late = Calendar.getInstance();
		late.set(2010, 05 - 1, 31);

		int num = SyswareCalendar.getWorkingDays(early, late);
		Assert.assertEquals(21, num);
	}

	/**
	 * 不跨年的情况
	 */
	@Test
	public void getTotalDays() {
		Calendar early = Calendar.getInstance();
		early.set(2010, 05 - 1, 01);

		Calendar late = Calendar.getInstance();
		late.set(2010, 05 - 1, 31);

		Assert.assertEquals(31, SyswareCalendar.getTotalDays(early, late));
	}

	/**
	 * 跨年的情况
	 */
	@Test
	public void getTotalDaysCrossYears() {
		Calendar early = Calendar.getInstance();
		early.set(2009, 12 - 1, 01); // 2009-12-1

		Calendar late = Calendar.getInstance();
		late.set(2010, 01 - 1, 31); // 2010-1-31

		Assert.assertEquals(31 * 2, SyswareCalendar.getTotalDays(early, late));
	}

	@Test
	public void getWeekWorkingDaysBeforeOnTuesday() {
		Calendar cal = Calendar.getInstance();
		// 2010年6月29日，星期二
		cal.set(2010, 06 - 1, 29);
		Assert.assertEquals(2, SyswareCalendar.getWeekWorkingDaysBefore(cal));
	}

	@Test
	public void getWeekWorkingDaysBeforeOnSaturday() {
		Calendar cal = Calendar.getInstance();
		// 2010年6月26日，星期六
		cal.set(2010, 06 - 1, 26);
		Assert.assertEquals(5, SyswareCalendar.getWeekWorkingDaysBefore(cal));
	}

	@Test
	public void getWeekWorkingDaysBeforeOnSunday() {
		Calendar cal = Calendar.getInstance();
		// 2010年6月27日，星期日
		cal.set(2010, 06 - 1, 27);
		Assert.assertEquals(0, SyswareCalendar.getWeekWorkingDaysBefore(cal));
	}

	@Test
	public void getWeekWorkingDaysAfterOnTuesday() {
		Calendar cal = Calendar.getInstance();

		// 2010年6月29日，星期二
		cal.set(2010, 06 - 1, 29);
		Assert.assertEquals(4, SyswareCalendar.getWeekWorkingDaysAfter(cal));
	}

	@Test
	public void getWeekWorkingDaysAfterOnSaturday() {
		Calendar cal = Calendar.getInstance();

		// 2010年6月26日，星期六
		cal.set(2010, 06 - 1, 26);
		Assert.assertEquals(0, SyswareCalendar.getWeekWorkingDaysAfter(cal));
	}

	@Test
	public void getWeekWorkingDaysAfterOnSunday() {
		Calendar cal = Calendar.getInstance();

		// 2010年6月27日，星期日
		cal.set(2010, 06 - 1, 27);
		Assert.assertEquals(5, SyswareCalendar.getWeekWorkingDaysAfter(cal));
	}

	@Test
	public void getCalendarWithDurationSunday(){
		Calendar cal = Calendar.getInstance();

		// 2010年6月6日，星期日
		cal.set(2010, 06 - 1, 6);
		
		Calendar before = SyswareCalendar.getCalendarWithDuration(cal, 10);
		
		// 2010年6月27日，星期日
		Assert.assertEquals(2010, before.get(Calendar.YEAR));
		Assert.assertEquals(06 - 1, before.get(Calendar.MONTH));
		Assert.assertEquals(18, before.get(Calendar.DATE));
		
		cal.clear();
		cal.set(2010, 06 - 1, 6);
		before.clear();
		before = SyswareCalendar.getCalendarWithDuration(cal, 7);
		
		// 2010年6月15日，星期二
		Assert.assertEquals(2010, before.get(Calendar.YEAR));
		Assert.assertEquals(06 - 1, before.get(Calendar.MONTH));
		Assert.assertEquals(15, before.get(Calendar.DATE));
	}
	
	@Test
	public void getCalendarWithDurationSaturday(){
		Calendar cal = Calendar.getInstance();

		// 2010年6月12日，星期六
		cal.set(2010, 06 - 1, 12);
		
		Calendar before = SyswareCalendar.getCalendarWithDuration(cal, 10);
		
		// 2010年6月25日，星期五
		Assert.assertEquals(2010, before.get(Calendar.YEAR));
		Assert.assertEquals(06 - 1, before.get(Calendar.MONTH));
		Assert.assertEquals(25, before.get(Calendar.DATE));
		
		cal.clear();
		cal.set(2010, 06 - 1, 12);
		before.clear();
		before = SyswareCalendar.getCalendarWithDuration(cal, 7);
		
		// 2010年6月25日，星期五
		Assert.assertEquals(2010, before.get(Calendar.YEAR));
		Assert.assertEquals(06 - 1, before.get(Calendar.MONTH));
		Assert.assertEquals(22, before.get(Calendar.DATE));
	}
	
	@Test
	public void getCalendarWithDurationWednesday(){
		Calendar cal = Calendar.getInstance();

		// 2010年6月16日，星期三
		cal.set(2010, 06 - 1, 16);
		// 往后10工作日
		Calendar before = SyswareCalendar.getCalendarWithDuration(cal, 10);
		
		// 2010年6月29日，星期二
		Assert.assertEquals(2010, before.get(Calendar.YEAR));
		Assert.assertEquals(06 - 1, before.get(Calendar.MONTH));
		Assert.assertEquals(29, before.get(Calendar.DATE));
		
		cal.clear();
		cal.set(2010, 06 - 1, 16);
		before.clear();
		// 往后7工作日
		before = SyswareCalendar.getCalendarWithDuration(cal, 7);
		
		// 2010年6月24日，星期四
		Assert.assertEquals(2010, before.get(Calendar.YEAR));
		Assert.assertEquals(06 - 1, before.get(Calendar.MONTH));
		Assert.assertEquals(24, before.get(Calendar.DATE));
		
		//=============================================================
		// 负数
		cal.clear();
		cal.set(2010, 06 - 1, 16);
		before.clear();
		// 往前10工作日
		before = SyswareCalendar.getCalendarWithDuration(cal, -10);
		
		// 2010年6月3日，星期四
		Assert.assertEquals(2010, before.get(Calendar.YEAR));
		Assert.assertEquals(06 - 1, before.get(Calendar.MONTH));
		Assert.assertEquals(3, before.get(Calendar.DATE));
		
		
		cal.clear();
		cal.set(2010, 06 - 1, 16);
		before.clear();
		// 往前7工作日
		before = SyswareCalendar.getCalendarWithDuration(cal, -7);
		
		// 2010年6月8日，星期二
		Assert.assertEquals(2010, before.get(Calendar.YEAR));
		Assert.assertEquals(06 - 1, before.get(Calendar.MONTH));
		Assert.assertEquals(8, before.get(Calendar.DATE));
	}
	
	@Test
	public void calculateEndDate()
	{
		int dura = 2;
		Calendar start = Calendar.getInstance();
		start.set(2010, 07 - 1, 19);
		
		Calendar end = SyswareCalendar.getCalendarWithDuration(start, dura);
		Calendar expected = Calendar.getInstance();
		expected.set(2010, 07 - 1, 20);
		
		Assert.assertEquals(expected, end);
	}
}
