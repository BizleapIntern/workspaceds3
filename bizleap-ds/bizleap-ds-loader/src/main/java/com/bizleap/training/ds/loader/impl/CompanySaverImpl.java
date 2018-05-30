package com.bizleap.training.ds.loader.impl;

import java.io.IOException;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

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
	DepartmentService departmentService;
	List<Department> departmentList;
	
	@Autowired
	DepartmentSaver departmentSaver;
	
	@Autowired
	CompanyService companyService;
	
	List<Company> companyList;
	
//	@Override
//	public void savePass1() throws ServiceUnavailableException, IOException {
//		int count=0;
//		for(Company company:getCompanyList()) {
//			company.setDepartmentList(toDBList(departmentService.getAllDepartment()));
//			companyService.saveCompany(company);
//			count++;
//		}
//		printer.line("The system saves "+count+" companies successfully.");
//	}
	
	@Override
	public void savePass1() throws ServiceUnavailableException, IOException {
		int count=0;
		for(Company company:getCompanyList()) {
			//Set Company to Department bidirectional relationship with database objects
			company.setDepartmentList(departmentSaver.toDBList(company.getDepartmentList()));
			for(Department department:company.getDepartmentList()) {
				department.setWorkForCompany(company);
			}
			
			companyService.saveCompany(company);
			count++;
		}
		printer.line("The system saves "+count+" companies successfully.");
	}
	
	@Override
	public void setCompanyList(List<Company> companyList) {
		this.companyList=companyList;
	}
	
	public List<Company> getCompanyList() {
		return this.companyList;
	}
}