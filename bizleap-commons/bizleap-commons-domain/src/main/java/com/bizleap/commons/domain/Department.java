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
	@JoinColumn(name = "companyId")
	private Company workForCompany;

	@OneToMany(mappedBy = "workForDepartment", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Employee> employeeList;

	@OneToMany(mappedBy = "parentDepartment", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Department> subDepartmentList;

	@ManyToOne
	@JoinColumn(name = "parentDepartmentId")
	private Department parentDepartment;

	public Department() {
		super();
	}

	public Department(String boId) {
		super(boId);
	}

	public List<Department> getSubDepartmentList() {
		return subDepartmentList;
	}

	public void setSubDepartmentList(List<Department> subDepartmentList) {
		this.subDepartmentList = subDepartmentList;
	}

	public Department getParentDepartment() {
		return parentDepartment;
	}

	public void setParentDepartment(Department parentDepartment) {
		this.parentDepartment = parentDepartment;
	}

	public Company getWorkForCompany() {
		return workForCompany;
	}

	public void setWorkForCompany(Company workForCompany) {
		this.workForCompany = workForCompany;
	}

	public List<Employee> getEmployeeList() {
		if (employeeList == null)
			this.employeeList = new ArrayList<Employee>();
		return employeeList;
	}

	public void setEmployeeList(List<Employee> employeeList) {
		this.employeeList = employeeList;
	}

	public static Department parseDepartment(String line) {
		String[] tokens = line.split(",");
		Department department = new Department(tokens[0]);
		department.setName(tokens[1]);
		department.setEmail(tokens[2]);
		department.setPhone(tokens[3]);
		department.setWorkForCompany(new Company(tokens[4]));
		try {
			department.setParentDepartment(new Department(tokens[5]));
		} catch (Exception ArrayIndexOutOfBoundsException) {
			department.setParentDepartment(null);
		}
		return department;
	}

	public String toString() {
		String workForCompanyBoId = workForCompany != null ? workForCompany.getBoId() : "";
		String parentDepartmentBoId = parentDepartment != null ? parentDepartment.getBoId() : "";
		
		return new ToStringBuilder(this).appendSuper(super.toString())
				.append("workForCompany", workForCompanyBoId)
				.append("workForDepartment", parentDepartmentBoId).toString();
	}
}