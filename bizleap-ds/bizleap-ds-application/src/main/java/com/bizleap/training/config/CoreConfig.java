package com.bizleap.training.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({ AppConfig.class })
@ComponentScan(basePackages = { "com.bizleap.commons",
		"com.bizleap.commons.domain", "com.bizleap.training.ds",
		"com.bizleap.training" })
public class CoreConfig {
}