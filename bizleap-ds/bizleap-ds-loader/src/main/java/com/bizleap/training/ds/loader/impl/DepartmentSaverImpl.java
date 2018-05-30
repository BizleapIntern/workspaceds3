package com.bizleap.training.ds.loader.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.bizleap.commons.domain.Department;
import com.bizleap.commons.domain.Employee;
import com.bizleap.commons.domain.exception.ServiceUnavailableException;
import com.bizleap.commons.domain.utils.Printer;
import com.bizleap.training.ds.loader.DataManager;
import com.bizleap.training.ds.loader.DepartmentSaver;
import com.bizleap.training.ds.service.DepartmentService;
import com.bizleap.training.ds.service.EmployeeService;

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
	EmployeeService employeeService;

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

	/*@Override
	public void savePass1() throws ServiceUnavailableException, IOException {
		initializeMap();
		printer.line("Saving is started");

		for (Department department : getDepartmentList()) {
			departmentMapFile.put(department.getBoId(), department);
			Department departmentToSave = new Department();
			departmentToSave.setBoId(department.getBoId());
			departmentToSave.setName(department.getName());
			departmentToSave.setEmail(department.getEmail());
			departmentToSave.setPhone(department.getPhone());
			departmentToSave.setWorkForCompany(department.getWorkForCompany());
			
			departmentService.saveDepartment(departmentToSave);
		}
		
		for(Employee employee:dataManager.getEmployeeList()) {
			Employee toSaveEmployee=new Employee();
			toSaveEmployee.setBoId(employee.getBoId());
			toSaveEmployee.setName(employee.getName());
			toSaveEmployee.setAge(employee.getAge());
			toSaveEmployee.setTitle(employee.getTitle());
			toSaveEmployee.setSalary(employee.getSalary());
			toSaveEmployee.setEmail(employee.getEmail());
			toSaveEmployee.setPhone(employee.getPhone());
			toSaveEmployee.setWorkForDepartment(getDepartmentFromDB(employee.getWorkForDepartment().getBoId()));
			
			employeeService.saveEmployee(toSaveEmployee);
		}

		printer.line("Saving is completed");
	}*/
	
	@Override
	public Department getDepartmentFromDB(Department department) throws ServiceUnavailableException {
		if(department==null || department.getBoId()==null)
			return null;
			
		Department newDepartment = departmentMapDB.get(department.getBoId());
		if (newDepartment == null) {
			newDepartment = departmentService.findByDepartmentBoIdSingle(department.getBoId());
			departmentMapDB.put(newDepartment.getBoId(), newDepartment);
		}
		return newDepartment;

	}
	
	@Override
	public Department getDepartmentFromFile(Department department) {

		if (departmentMapFile.get(department.getBoId()) != null)
			return departmentMapFile.get(department.getBoId());
		return null;

	}
	

	@Override
	public void savePass1() throws ServiceUnavailableException, IOException {
		initializeMap();
		printer.line("Saving is started");

		for (Department department : getDepartmentList()) {
			departmentMapFile.put(department.getBoId(), department);
			Department departmentToSave = new Department();
			departmentToSave.setBoId(department.getBoId());
			departmentToSave.setName(department.getName());
			departmentToSave.setEmail(department.getEmail());
			departmentToSave.setPhone(department.getPhone());
			
			//now set employeeList for both directions
			departmentToSave.setEmployeeList(department.getEmployeeList());
			for(Employee employee:department.getEmployeeList()) {
				employee.setWorkForDepartment(departmentToSave);
			}
			
			departmentService.saveDepartment(departmentToSave);
		}
		printer.line("Saving is completed");
	}

	@Override
	public void savePass2() throws ServiceUnavailableException, IOException {
		for (Department department : departmentMapFile.values()) {
			Department departmentFile = getDepartmentFromFile(department);
			Department departmentDB = getDepartmentFromDB(department);
			if (departmentFile.getParentDepartment() != null) {

				departmentDB.setParentDepartment(getDepartmentFromDB(departmentFile.getParentDepartment()));
				departmentDB.setSubDepartmentList(toDBList(departmentFile.getSubDepartmentList()));
				//departmentDB.setWorkForCompany(getDepartmentFromDB(departmentFile.getWorkForCompany().getBoId()));
			}
			departmentService.saveDepartment(departmentDB);
		}
	}
	
	@Override
	public List<Department> toDBList(List<Department> departmentListFile) throws ServiceUnavailableException {
		if(CollectionUtils.isEmpty(departmentListFile))
			return null;
		
		List<Department> databaseList = new ArrayList<Department>();
		for (Department department : departmentListFile) {
			databaseList.add(getDepartmentFromDB(department));
		}
		return databaseList;
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
