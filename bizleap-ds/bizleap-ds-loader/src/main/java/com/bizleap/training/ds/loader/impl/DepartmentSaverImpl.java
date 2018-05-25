package com.bizleap.training.ds.loader.impl;

import java.io.IOException;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bizleap.commons.domain.Department;
import com.bizleap.commons.domain.exception.ServiceUnavailableException;
import com.bizleap.commons.domain.utils.Printer;
import com.bizleap.training.ds.loader.DepartmentSaver;
import com.bizleap.training.ds.service.DepartmentService;

@Service("departmentSaver")
public class DepartmentSaverImpl implements DepartmentSaver{
	private static Logger logger = Logger.getLogger(CompanySaverImpl.class);
	private static Printer printer = new Printer(logger);
	
	@Autowired
	DepartmentService departmentService;
	List<Department> departmentList;
	
	@Override
	public void savePass1() throws ServiceUnavailableException, IOException {
		
		printer.line2("Saving Departemnt");
		for(Department department:getDepartmentList()) {
			department.setWorkForCompany(null);
			department.setParentDepartment(null);
			department.setSubDepartmentList(null);
			departmentService.saveDepartment(department);
		}
		printer.line("Saving completed.");
	}
	

	@Override
	public void savePass2() throws ServiceUnavailableException, IOException {
		
	}
	
	@Override
	public void setDepartmentList(List<Department> departmentList) {
		this.departmentList=departmentList;
	}
	
	@Override
	public List<Department> getDepartmentList() {
		return this.departmentList;
	}
}
