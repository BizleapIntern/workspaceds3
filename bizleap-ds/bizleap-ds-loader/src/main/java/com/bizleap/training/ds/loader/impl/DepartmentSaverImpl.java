package com.bizleap.training.ds.loader.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bizleap.commons.domain.Company;
import com.bizleap.commons.domain.Department;
import com.bizleap.commons.domain.exception.ServiceUnavailableException;
import com.bizleap.commons.domain.utils.Printer;
import com.bizleap.training.ds.loader.DataManager;
import com.bizleap.training.ds.loader.DepartmentSaver;
import com.bizleap.training.ds.service.DepartmentService;

@Service("departmentSaver")
public class DepartmentSaverImpl implements DepartmentSaver {
	private static Logger logger = Logger.getLogger(DepartmentSaverImpl.class);
	private static Printer printer = new Printer(logger);
	private List<Department> departmentList;
	Map<String, Department> departmentMapFile;
	Map<String, Department> departmentMapDB;
	Department departmentFile;

	@Autowired
	DepartmentService departmentService;

	@Autowired
	DataManager dataManager;

	private void initializeMap() {
		departmentMapFile = new HashMap<String, Department>();
		departmentMapDB = new HashMap<String, Department>();

		// create a file map
		for (Department department : getDepartmentList()) {
			departmentMapFile.put(department.getBoId(), department);
		}
	}

	@Override
	public void savePass1() throws ServiceUnavailableException, IOException {
		initializeMap();
		printer.line("Saving is started");

		for (Department department : getDepartmentList()) {
			departmentMapFile.put(department.getBoId(), department);
			Department departmenttosave = new Department();
			departmenttosave.setBoId(department.getBoId());
			departmenttosave.setName(department.getName());
			departmenttosave.setEmail(department.getEmail());
			departmenttosave.setPhone(department.getPhone());
			// departmenttosave.setEmployeeList(dataManager.getEmployeeList());
			departmentService.saveDepartment(departmenttosave);
		}

		printer.line("Saving is completed");
	}

	private Department getDepartmentFromDB(String boId) throws ServiceUnavailableException {// null
		Department department = departmentMapDB.get(boId);
		if (department == null) {
			department = departmentService.findByDepartmentBoIdSingle(boId);
			departmentMapDB.put(boId, department);
		}
		return department;

	}

	private Department getDepartmentFromFile(String boId) {// not null

		if (departmentMapFile.get(boId) != null)
			return departmentMapFile.get(boId);
		return null;

	}

	@Override
	public void savePass2() throws ServiceUnavailableException, IOException {
		for (Department department : departmentMapFile.values()) {
			Department departmentFile = getDepartmentFromFile(department.getBoId());
			// logger.info("BOid"+departmentFile);
			Department departmentDB = getDepartmentFromDB(department.getBoId());
			// logger.info("BoID::"+departmentDB.getParentDepartment().getBoId());
			if (departmentFile.getParentDepartment()!= null) {
				
				departmentDB.setParentDepartment(getDepartmentFromDB(departmentFile.getParentDepartment().getBoId()));
				//departmentDB.setWorkForCompany(getDepartmentFromDB(departmentFile.getWorkForCompany().getBoId());
				
				
			}
			

			

			// logger.info(departmentDB);
		 departmentService.saveDepartment(departmentDB);
		}
	}

	@Override
	public void setDepartmentList(List<Department> departmentList) {
		this.departmentList = departmentList;

	}

	@Override
	public List<Department> getDepartmentList() {
		if (departmentList == null)
			this.departmentList = new ArrayList<Department>();
		return departmentList;
	}

}
