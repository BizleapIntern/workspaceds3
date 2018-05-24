package com.bizleap.commons.domain.enums;

public enum EntityType {
	COMPANY("Company","COMP"),
	EMPLOYEE("Employee","EMPL"),
	USER("User","USER"),
	DEPARTMENT("Department","DEPT");
	
	private String value;
	private String boIdPrefix;
	
	private EntityType(String value,String boIdPrefix) {
		this.setValue(value);
		this.setBoIdPrefix(boIdPrefix);
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getBoIdPrefix() {
		return boIdPrefix;
	}

	public void setBoIdPrefix(String boIdPrefix) {
		this.boIdPrefix = boIdPrefix;
	}
}