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
import com.bizleap.training.ds.loader.DataManager;
import com.bizleap.training.ds.loader.impl.test.ServiceTest;

public class DataManagerImplTest extends ServiceTest{		
	
	@Autowired
	@Qualifier("dataManager")
	private DataManager dataManager;
	
	static Logger logger=Logger.getLogger(DataManagerImplTest.class);
	
	//@Ignore
	@Test
	public void testLoad() throws IOException,ServiceUnavailableException {		
		dataManager.load();
		
		assertNotNull(dataManager.getEmployeeList());
		//logger.info("Employee list: "+dataManager.getEmployeeList());
		assertTrue(CollectionUtils.isNotEmpty(dataManager.getEmployeeList()));
		assertEquals(9,dataManager.getEmployeeList().size());
		
		assertNotNull(dataManager.getDepartmentList());
		//logger.info("Department list: "+dataManager.getDepartmentList());
		assertTrue(CollectionUtils.isNotEmpty(dataManager.getDepartmentList()));
		assertEquals(9,dataManager.getDepartmentList().size());
		
		assertNotNull(dataManager.getCompanyList());
		//logger.info("Company list: "+dataManager.getCompanyList());
		assertTrue(CollectionUtils.isNotEmpty(dataManager.getCompanyList()));
		assertEquals(3,dataManager.getCompanyList().size());
	}
	
	@Ignore
	@Test
	public void testLoadFalse() {
		assertTrue(false);
	}
}