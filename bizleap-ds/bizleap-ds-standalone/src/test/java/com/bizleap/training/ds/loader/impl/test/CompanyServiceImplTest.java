package com.bizleap.training.ds.loader.impl.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.log4j.Logger;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.bizleap.commons.domain.Company;
import com.bizleap.commons.domain.enums.ObjectFullnessLevel;
import com.bizleap.commons.domain.exception.ServiceUnavailableException;
import com.bizleap.training.ds.service.CompanyService;

public class CompanyServiceImplTest extends ServiceTest {
	
	@Autowired
	@Qualifier("companyService")
	private CompanyService companyService;
	
	static Logger logger = Logger.getLogger(CompanyServiceImplTest.class);

	//@Ignore
	@Test
	public void testFindByCompanyBoId() throws ServiceUnavailableException, IOException {
		
		assertNotNull(companyService.findByCompanyBoId("COMP02"));
		//logger.info("Company list: " + companyService.findByCompanyBoId("COMP02"));
		assertTrue(CollectionUtils.isNotEmpty(companyService.findByCompanyBoId("COMP02")));
		
		assertNotNull(companyService.findByCompanyBoId("COMP02",ObjectFullnessLevel.SUMMARY));
		//logger.info("Company list: " + companyService.findByCompanyBoId("COMP02",ObjectFullnessLevel.SUMMARY));
		assertTrue(CollectionUtils.isNotEmpty(companyService.findByCompanyBoId("COMP02",ObjectFullnessLevel.SUMMARY)));
		
		assertNotNull(companyService.findByCompanyBoId("COMP02",ObjectFullnessLevel.FULL));
		//logger.info("Company list: " + companyService.findByCompanyBoId("COMP02",ObjectFullnessLevel.FULL));
		assertTrue(CollectionUtils.isNotEmpty(companyService.findByCompanyBoId("COMP02",ObjectFullnessLevel.FULL)));	
	}

   // @Ignore
	@Test
	public void testGetAllCompany() throws IOException, ServiceUnavailableException {
		assertEquals(3, companyService.getAllCompany().size());
		//logger.info("Company Count : "+companyService.getAllCompany().size());
	}
}