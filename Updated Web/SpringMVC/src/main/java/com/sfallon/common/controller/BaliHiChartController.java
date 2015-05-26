package com.sfallon.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BaliHiChartController {
	@RequestMapping(value = "/baliHiChart", method = RequestMethod.GET)
	public ModelAndView wordCloud() {
		ModelAndView model = new ModelAndView("baliHiChart");	
		return model;
	}
	

}
