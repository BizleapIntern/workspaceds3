package com.bizleap.training.ds.loader.impl.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.log4j.Logger;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.bizleap.commons.domain.exception.ServiceUnavailableException;
import com.bizleap.training.ds.service.EmployeeService;

public class EmployeeServiceImplTest extends ServiceTest {
	
	@Autowired
	@Qualifier("employeeService")
	private EmployeeService employeeService;

	static Logger logger = Logger.getLogger(EmployeeServiceImplTest.class);

	//@Ignore
	@Test
	public void testFindByEmployeeyBoId() throws ServiceUnavailableException {

		assertNotNull(employeeService.findByEmployeeBoId("PER03"));
		//logger.info("Employee list: " + employeeService.findByEmployeeBoId("PER03"));
		assertTrue(CollectionUtils.isNotEmpty(employeeService.findByEmployeeBoId("PER03")));
	}

	//@Ignore
	@Test
	public void testGetAllEmployee() throws IOException, ServiceUnavailableException {
		assertEquals(8, employeeService.getAllEmployee().size());
		//logger.info("Employee Count : "+employeeService.getAllEmployee().size());
	}
}