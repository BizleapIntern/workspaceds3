package com.bizleap.training.json;

import org.json.simple.JSONObject;

public class JSon extends JSONObject{
	private static final long serialVersionUID = 1L;
		
	@SuppressWarnings("unchecked")
	public void put(String key,Object value){
		super.put(key, value);
	}
	
	public String getString(String key){
		return super.get(key).toString();
	}
	
	@SuppressWarnings("unchecked")
	public void setStatus(boolean status){
		super.put("status", status);
	}
	
	@SuppressWarnings("unchecked")
	public void setMessage(String message){
		super.put("message", message);
	}
	
	public boolean isStatus(){
		return (boolean) (super.get("status")==null ? false : super.get("status"));
	}

	@Override
	public String toJSONString() {
		return super.toJSONString();
	}
}
