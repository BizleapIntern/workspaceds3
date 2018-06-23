package com.bizleap.training.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.bizleap.commons.domain.Company;
import com.bizleap.commons.domain.Department;
import com.bizleap.commons.domain.Employee;
import com.bizleap.commons.domain.exception.ServiceUnavailableException;
import com.bizleap.training.ds.service.CompanyService;
import com.bizleap.training.ds.service.DepartmentService;
import com.bizleap.training.ds.service.EmployeeService;

@Controller
public class EntityController {

	static Logger logger = Logger.getLogger(EntityController.class);

	@Autowired
	@Qualifier("companyService")
	private CompanyService companyService;

	@Autowired
	@Qualifier("employeeService")
	private EmployeeService employeeService;

	@Autowired
	@Qualifier("departmentService")
	private DepartmentService departmentService;

	@RequestMapping(value = "search/{entityType}", method = RequestMethod.GET)
	public String search(@RequestParam("input") String input,
			@PathVariable("entityType") String entityType, Model model) {
		if (entityType.equals("COMPANY")) {
			return getAllCompany(entityType, model);
		} else if (entityType.equals("EMPLOYEE")) {
			return getAllEmployee(entityType, model);
		} else if (entityType.equals("DEPARTMENT")) {
			return getAllDepartment(entityType, model);
		} else {
			model.addAttribute("status", "ERROR");
			model.addAttribute("init", false);
			return "result";
		}
	}

	private String getAllCompany(String entityType, Model model) {
		List<Company> companyList = new ArrayList<Company>();
		try {
			companyList = companyService.getAllCompany();
			if (!CollectionUtils.isEmpty(companyList)) {
				model.addAttribute("type",entityType);
				model.addAttribute("companyList", companyList);
			}
		} catch (ServiceUnavailableException e) {
			logger.error("Get All Companys Error ", e);
			model.addAttribute("status", "ERROR");
			model.addAttribute("init", false);
			return "result";
		}
		return "entityContent";
	}

	private String getAllEmployee(String entityType, Model model) {
		List<Employee> employeeList = new ArrayList<Employee>();
		try {
			employeeList = employeeService.getAllEmployee();
			if (!CollectionUtils.isEmpty(employeeList)) {
				model.addAttribute("type",entityType);
				model.addAttribute("employeeList", employeeList);
			}
		} catch (ServiceUnavailableException e) {
			logger.error("Get All Employees Error ", e);
			model.addAttribute("status", "ERROR");
			model.addAttribute("init", false);
			return "result";
		}
		return "entityContent";
	}

	private String getAllDepartment(String entityType, Model model) {
		List<Department> departmentList = new ArrayList<Department>();
		try {
			departmentList = departmentService.getAllDepartment();
			if (!CollectionUtils.isEmpty(departmentList)) {
				model.addAttribute("type", entityType);
				model.addAttribute("departmentList", departmentList);
			}
		} catch (ServiceUnavailableException e) {
			logger.error("Get All Departments Error", e);
			model.addAttribute("status", "ERROR");
			model.addAttribute("init", false);
			return "result";
		}
		return "entityContent";
	}
}