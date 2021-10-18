package com.bugtracker.rest.basic.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter{
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf().disable() // disable, using JWT
		.authorizeRequests()
		.antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // When any options requests (preflight) come to any URL, permit everyone
			.anyRequest().authenticated()
			.and()
			.httpBasic(); // Any other requests use httpBasic authentication
		//http.formLogin();
	}
	
}
