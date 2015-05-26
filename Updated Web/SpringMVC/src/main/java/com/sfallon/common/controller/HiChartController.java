package com.sfallon.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HiChartController {
	@RequestMapping(value = "/hiChart", method = RequestMethod.GET)
	public ModelAndView wordCloud() {
		ModelAndView model = new ModelAndView("hiChart");	
		return model;
	}
	

}
