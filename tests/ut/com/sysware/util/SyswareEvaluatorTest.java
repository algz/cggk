package ut.com.sysware.util;

import java.util.HashMap;

import net.sourceforge.jeval.EvaluationException;
import net.sourceforge.jeval.Evaluator;

import org.junit.Test;

import com.sysware.util.SyswareEvaluator;


public class SyswareEvaluatorTest {

	@Test
	public void test(){
		HashMap<String, Object> hmap = new HashMap<String, Object>();
		hmap.put("i2", "ab");
		hmap.put("i1", "abc");
		System.out.println(SyswareEvaluator.evaluate("i1 == i2", hmap));
		System.out.println(SyswareEvaluator.evaluate("123.4 == 123.4",hmap));
		System.out.println("-----------");
		/*
		 * This sample shows the basic usage of the JEval Evaluator class.
		 * Calling the default contructor will set he quoteCharater to single
		 * quote. This constructor will also load all math variables, math
		 * functions and string variables.
		 */
		Evaluator evaluator = new Evaluator();

		try {

			/**
			 * Add the variables to our instance of the Evaluator class.
			 */
			// evaluator.putVariable("a", "'Hello'");
			// evaluator.putVariable("b", "'World'");
			//
			// /**
			// * This sample simply outputs the variables.
			// */
			// System.out.println(evaluator.evaluate("#{a}"));
			// System.out.println(evaluator.evaluate("#{b}"));
			//
			// /**
			// * This sample outputs a preloaded math varibles.
			// */
			// System.out.println(evaluator.evaluate("#{PI}"));
			//
			// /**
			// * This sample adds the variables together to form a sentence.
			// */
			// System.out.println(evaluator.evaluate("#{a} + ' ' + #{b} +
			// '!'"));
			//
			// System.out.println(evaluator.evaluate("12<1")) ;
			// /**
			// * This sample clears the variables.韦，， This call will not clear
			// * preloaded variables.
			// */
			// evaluator.clearVariables();
			// /**
			// * This sample shows the use of a custom variable resolver.
			// */
			// // evaluator.setVariableResolver(new MockVariableResolver());
			// // System.out.println(evaluator
			// // .evaluate("#{MockVariable1} + #{MockVariable2}"));
			//			
			// /**
			// * This sample shows an invalid expression. The variables were
			// just
			// * cleared, therefor the variable "a" no longer exists.
			// */
			// System.out.println("An exception is expected in the "
			// + "next evaluation.");
			evaluator.putVariable("a", "12");
			evaluator.putVariable("b", "9");
			evaluator.putVariable("c", "25");
			evaluator.putVariable("d", "2");

			System.out.println(evaluator.evaluate("(#{c} > #{d}) && (1 == 1)"));
		} catch (EvaluationException ee) {
			System.out.println(ee);
		}
	}
}
