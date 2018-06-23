package com.bizleap.training.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class SiteController {

	static Logger logger = Logger.getLogger(SiteController.class);
	private final int PAGE_SIZE = 10;

	@RequestMapping(value = "init", method = RequestMethod.GET)
	public String init(Model model) {
		model.addAttribute("pageSize", PAGE_SIZE);
		model.addAttribute("init", true);
		return "result";
	}

	@RequestMapping(method = RequestMethod.GET)
	public String getHomePage(Model model) {
		return "index";
	}
}