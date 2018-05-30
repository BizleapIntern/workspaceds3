package com.bizleap.training.ds.loader.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

	@Autowired
	DepartmentService departmentService;
	
	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	DataManager dataManager;

	private static Logger logger = Logger.getLogger(CompanySaverImpl.class);
	private static Printer printer = new Printer(logger);
	private List<Department> departmentList;
	
	Map<String, Department> departmentMapDB;
	Map<String, Department> departmentMapFile;
	Map<String, Employee> employeeMapFile;

	private void initialize() {
		departmentMapDB = new HashMap<String, Department>();
		departmentMapFile = new HashMap<String, Department>();
		employeeMapFile=new HashMap<String, Employee>();
		// create a file map
		for (Department department : getDepartmentList()) {
			departmentMapFile.put(department.getBoId(), department);
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
	
//	@Override
//	public void savePass1() throws ServiceUnavailableException, IOException {
//		initialize();
//		printer.line("Saving Department...");
//		for (Department department : getDepartmentList()) {
//			Department toSaveDepartment = new Department();
//			toSaveDepartment.setBoId(department.getBoId());
//			toSaveDepartment.setName(department.getName());
//			toSaveDepartment.setEmail(department.getEmail());
//			toSaveDepartment.setPhone(department.getPhone());
//			toSaveDepartment.setWorkForCompany(department.getWorkForCompany());
//			departmentService.saveDepartment(toSaveDepartment);
//		}
//		for(Employee employee:dataManager.getEmployeeList()) {
//			Employee toSaveEmployee=new Employee();
//			toSaveEmployee.setBoId(employee.getBoId());
//			toSaveEmployee.setName(employee.getName());
//			toSaveEmployee.setAge(employee.getAge());
//			toSaveEmployee.setTitle(employee.getTitle());
//			toSaveEmployee.setSalary(employee.getSalary());
//			toSaveEmployee.setEmail(employee.getEmail());
//			toSaveEmployee.setPhone(employee.getPhone());
//			toSaveEmployee.setWorkForDepartment(getDepartmentFromDB(employee.getWorkForDepartment().getBoId()));
//			employeeService.saveEmployee(toSaveEmployee);
//		}
//		printer.line("Successfully Saved!!");
//	}

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

	public Department getDepartmentFromFile(Department department) {
		return departmentMapFile == null ? null : departmentMapFile.get(department.getBoId());
	}
	
	@Override
	public List<Department> toDBList(List<Department> departmentListFile) throws ServiceUnavailableException{
		if(CollectionUtils.isEmpty(departmentListFile))
			return null;
		List<Department> departmentListDB= new ArrayList<Department>();
		for(Department department:departmentListFile) {
			departmentListDB.add(getDepartmentFromDB(department));
		}
		return departmentListDB;
	}
	
	@Override
	public void savePass1() throws ServiceUnavailableException, IOException {
		initialize();
		printer.line("Saving Department...");
		for (Department department : getDepartmentList()) {
			Department toSaveDepartment = new Department();
			toSaveDepartment.setBoId(department.getBoId());
			toSaveDepartment.setName(department.getName());
			toSaveDepartment.setEmail(department.getEmail());
			toSaveDepartment.setPhone(department.getPhone());
			
			//Now set employeeList for both directions
			toSaveDepartment.setEmployeeList(department.getEmployeeList());
			for(Employee employee: department.getEmployeeList()) {
				employee.setWorkForDepartment(toSaveDepartment);
			}
			
			departmentService.saveDepartment(toSaveDepartment);
		}
		printer.line("Successfully Saved!!");
	}

//	@Override
//	public void savePass2() throws ServiceUnavailableException, IOException {
//		for (Department department : dataManager.getDepartmentList()) {
//			Department departmentFile = getDepartmentFromFile(department.getBoId());
//			Department departmentDB = getDepartmentFromDB(department.getBoId());
//			if (departmentFile.getParentDepartment() != null) {
//				departmentDB.setParentDepartment(getDepartmentFromDB(departmentFile.getParentDepartment().getBoId()));
//			}
//			departmentService.saveDepartment(departmentDB);
//		}
//	}
	
	@Override
	public void savePass2() throws ServiceUnavailableException, IOException {
		for (Department department : dataManager.getDepartmentList()) {
			Department departmentFile = getDepartmentFromFile(department);
			Department departmentDB = getDepartmentFromDB(department);
			if (departmentFile.getParentDepartment() != null) {
				departmentDB.setParentDepartment(getDepartmentFromDB(departmentFile.getParentDepartment()));
				departmentDB.setSubDepartmentList(toDBList(departmentFile.getSubDepartmentList()));
			}
			departmentService.saveDepartment(departmentDB);
		}
	}
}