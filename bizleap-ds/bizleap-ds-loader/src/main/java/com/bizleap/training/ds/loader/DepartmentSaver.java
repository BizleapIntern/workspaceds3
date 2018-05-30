package com.bizleap.training.ds.loader;

import java.io.IOException;
import java.util.List;

import com.bizleap.commons.domain.Department;
import com.bizleap.commons.domain.exception.ServiceUnavailableException;

public interface DepartmentSaver {
	public void savePass1() throws ServiceUnavailableException, IOException;
	public void savePass2() throws ServiceUnavailableException, IOException;
	public void setDepartmentList(List<Department> departmentList);
	public List<Department> getDepartmentList();
	public Department getDepartmentFromDB(Department department) throws ServiceUnavailableException;
	public List<Department> toDBList(List<Department> departmentListFile) throws ServiceUnavailableException;
}