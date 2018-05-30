package com.bizleap.training.ds.loader;

import java.io.IOException;
import java.util.List;

import com.bizleap.commons.domain.Department;
import com.bizleap.commons.domain.exception.ServiceUnavailableException;

public interface DepartmentSaver {
	public void savePass1() throws ServiceUnavailableException, IOException;
	public void savePass2() throws ServiceUnavailableException, IOException;
	public void setDepartmentList(List<Department> departmentList);
	public Department getDepartmentFromDB(Department department) throws ServiceUnavailableException;
	public Department getDepartmentFromFile(Department department);
	public List<Department> getDepartmentList();
	public List<Department> toDBList(List<Department> departmentList) throws ServiceUnavailableException;
}