package com.bugtracker.rest.webservices.restfulwebservices.bug;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BugJpaRepository extends JpaRepository<Bug, Long>{
	
	List<Bug> findByUsername(String username);

}
