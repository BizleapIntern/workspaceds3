package com.bizleap.training.ds.loader.impl;

import java.io.IOException;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bizleap.commons.domain.Company;
import com.bizleap.commons.domain.Department;
import com.bizleap.commons.domain.utils.Printer;
import com.bizleap.commons.domain.exception.ServiceUnavailableException;

import com.bizleap.training.ds.loader.CompanySaver;
import com.bizleap.training.ds.loader.DepartmentSaver;

import com.bizleap.training.ds.service.CompanyService;
import com.bizleap.training.ds.service.DepartmentService;

@Service("companySaver")
public class CompanySaverImpl implements CompanySaver {
	private static Logger logger = Logger.getLogger(CompanySaverImpl.class);
	private static Printer printer = new Printer(logger);

	@Autowired
	CompanyService companyService;
	
	@Autowired
	DepartmentSaver departmentSaver;
	
	@Autowired
	DepartmentService departmentService;
	
	List<Company> companyList;

	/*@Override
	public void savePass1() throws ServiceUnavailableException, IOException {
		int count = 0;
		logger.info("Total company size :" + getCompanyList().size());
		for (Company company : getCompanyList()) {
			logger.info(company);

			company.setDepartmentList(toDBList(departmentService.getAllDepartment()));
			companyService.saveCompany(company);
			count++;
		}
		printer.line("The system saves " + count + " companies successfully.");
	}*/
	
	@Override
	public void savePass1() throws ServiceUnavailableException, IOException {
		int count = 0;
		
		for (Company company : getCompanyList()) {
			//set Company to Department bidirectional relationship with database object
			company.setDepartmentList(departmentSaver.toDBList(company.getDepartmentList()));
			for(Department department:company.getDepartmentList()) {
				department.setWorkForCompany(company);
			}
			companyService.saveCompany(company);
			count++;
		}
		printer.line("The system saves " + count + " companies successfully.");
	}

	@Override
	public void setCompanyList(List<Company> companyList) {
		this.companyList = companyList;
	}
	
	@Override
	public List<Company> getCompanyList() {
		return this.companyList;
	}
}