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
import com.bizleap.training.ds.service.DepartmentService;

public class DepartmentServiceImplTest extends ServiceTest {
	
	@Autowired
	@Qualifier("departmentService")
	private DepartmentService departmentService;

	static Logger logger = Logger.getLogger(DepartmentServiceImplTest.class);

	@Ignore
	@Test
	public void testFindByDepartmentyBoId() throws ServiceUnavailableException {

		assertNotNull(departmentService.findByDepartmentBoId("DEPT03"));
		//logger.info("Employee list: " + employeeService.findByEmployeeBoId("PER03"));
		assertTrue(CollectionUtils.isNotEmpty(departmentService.findByDepartmentBoId("DEPT03")));
	}

	@Ignore
	@Test
	public void testGetAllDepartment() throws IOException, ServiceUnavailableException {
		assertEquals(6, departmentService.getAllDepartment().size());
		//logger.info("Employee Count : "+employeeService.getAllEmployee().size());
	}
}