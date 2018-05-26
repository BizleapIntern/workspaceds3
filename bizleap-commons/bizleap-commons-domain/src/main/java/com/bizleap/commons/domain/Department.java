package com.bizleap.commons.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.ToStringBuilder;

@Entity
@Table(name = "department")
public class Department extends AbstractEntity {
	
	@ManyToOne
	@JoinColumn(name="companyId")
	private Company workForCompany;
	
	@ManyToOne
	@JoinColumn(name="parentDepartmentId")
	private Department parentDepartment;
	
	@OneToMany(mappedBy="parentDepartment", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private List<Department> subdepartmentList;
	
	@OneToMany(mappedBy="workForDepartment", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private List<Employee> employeeList;

	public Department() {
		super();
	}
	
	public Department(String boId) {
		super(boId);
	}
	
	public Company getWorkForCompany() {
		return workForCompany;
	}

	public void setWorkForCompany(Company workForCompany) {
		this.workForCompany = workForCompany;
	}
	
	public List<Employee> getEmployeeList() {
		if (employeeList==null)
			this.employeeList=new ArrayList<Employee>();
		return employeeList;
	}

	public void setEmployeeList(List<Employee> employeeList) {
		this.employeeList = employeeList;
	}
	
	public static Department parseDepartment(String line) {
			String[] tokens=line.split(",");
			Department department=new Department(tokens[0]);
			department.setName(tokens[1]);
			department.setEmail(tokens[2]);
			department.setPhone(tokens[3]);
			department.setWorkForCompany(new Company(tokens[4]));
			try{
				department.setParentDepartment(new Department (tokens[5]));
			}catch (Exception ArrayIndexOutOfBoundException) {
			department.setParentDepartment(null);
			}
			return department;
	}

	public String toString() {
		String parentDepartmentBoID=parentDepartment!=null? parentDepartment.getBoId():" ";
		String workForCompanyBoId=workForCompany!=null? workForCompany.getBoId():"";
		
		return new ToStringBuilder(this)
				.appendSuper(super.toString())
				.append("workForCompany",workForCompanyBoId)
				.append("Work for Department ",parentDepartmentBoID)
				.toString();
	}

	public Department getParentDepartment() {
		return parentDepartment;
	}

	public void setParentDepartment(Department parentDepartment) {
		this.parentDepartment = parentDepartment;
	}

	public List<Department> getSubdepartmentList() {
		if(subdepartmentList==null)
			this.subdepartmentList=new ArrayList<Department>();
		return subdepartmentList;
	}

	public void setSubdepartmentList(List<Department> subdepartmentList) {
		this.subdepartmentList = subdepartmentList;
	}
}