package com.bizleap.commons.domain.enums;

public enum ObjectFullnessLevel {
	
	FULL("Full"), DETAILED("Detailed"), SUMMARY("Summary"); 
	
	private String value;

	private ObjectFullnessLevel(String value) {
		this.value = value;
	}

	public String getValue() {
		return this.value;
	}	
}
