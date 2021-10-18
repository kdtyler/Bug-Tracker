package com.bugtracker.rest.webservices.restfulwebservices.bug;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class BugHardcodedService {

	private static List<Bug> bugs = new ArrayList<>();
	private static long idCounter = 0;
	
	static {
		bugs.add(new Bug(idCounter++, "User", "Line 5 error!", new Date(), false));
		bugs.add(new Bug(idCounter++, "User", "Line 89 error!", new Date(), false));
		bugs.add(new Bug(idCounter++, "User", "Line 483 error!", new Date(), false));
	}
	
	public List<Bug> findAll() {
		return bugs;
	}
	
	public Bug save(Bug bug) {
		if(bug.getId()==-1 || bug.getId()==0) { // If it's a new bug
			bug.setId(idCounter++);
			bugs.add(bug);
		} else {
			deleteById(bug.getId());
			bugs.add(bug);
		}
		return bug;
	}
	
	public Bug findById(long id) {
		for (Bug bug : bugs) {
			if (bug.getId() == id) {
				return bug;
			}
		}
		return null;
	}
	
	public Bug deleteById(long id) {
		Bug bug = findById(id);
		
		if (bug == null) return null;
		
		if(bugs.remove(bug)) {
			return bug;
		}
		return null;
	}
	
}
