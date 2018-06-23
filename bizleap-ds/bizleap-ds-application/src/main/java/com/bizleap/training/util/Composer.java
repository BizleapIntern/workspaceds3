package com.bizleap.training.util;

import java.io.ByteArrayOutputStream;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;

import com.bizleap.training.controller.SiteController;

public class Composer {
	static Logger logger = Logger.getLogger(Composer.class);
	public static <T> String convertToJSONString(T object) {
		  ObjectMapper mapper = new ObjectMapper();
		  // mapper.writeValue(new File("c:\\user.json"), object.getClass());
		  try {
			   ByteArrayOutputStream bufferOutputStream = new ByteArrayOutputStream();
			   mapper.writeValue(bufferOutputStream, object);
			   return bufferOutputStream.toString();
		  } catch (Exception e) {
			  logger.error("Composer:::::::::::::",e);
			  //  e.printStackTrace();
		  }
		  return "";
	}
}
