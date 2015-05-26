package com.sfallon.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HeatMapController {
	@RequestMapping(value = "/heatmap", method = RequestMethod.GET)
	public ModelAndView heatMap() {
		ModelAndView model = new ModelAndView("heatmap");	
		return model;
	}
	

}