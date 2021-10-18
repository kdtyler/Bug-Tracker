package com.bugtracker.rest.webservices.restfulwebservices.bug;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.bugtracker.rest.webservices.restfulwebservices.bug.Bug;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BugResource {
	
	@Autowired
	private BugHardcodedService bugService;
	
	@GetMapping("/users/{username}/bugs")
	public List<Bug> getAllBugs(@PathVariable String username) {
		return bugService.findAll();
	}
	
	@GetMapping("/users/{username}/bugs/{id}")
	public Bug getBug(@PathVariable String username, @PathVariable long id) {
		return bugService.findById(id);
	}
	
	//DELETE /users/{username}/bugs/{id}
	@DeleteMapping("/users/{username}/bugs/{id}")
	public ResponseEntity<Void> deleteBug(@PathVariable String username, @PathVariable long id) {
		
		Bug bug = bugService.deleteById(id);
		if (bug != null) {
			return ResponseEntity.noContent().build(); // when successful
		}
		
		return ResponseEntity.notFound().build(); // when failing
	}
	
	// Edit/Update a bug
	//PUT /users/{user_name}/bugs/{bug_id}
	@PutMapping("/users/{username}/bugs/{id}")
	public ResponseEntity<Bug> updateBug(@PathVariable String username, @PathVariable long id, @RequestBody Bug bug) {
		Bug bugUpdated = bugService.save(bug);
		return new ResponseEntity<Bug>(bug, HttpStatus.OK); // RESTful standard

	}
	
	//Create a new bug
	//POST /users/{user_name}/bugs/
	@PostMapping("/users/{username}/bugs")
	public ResponseEntity<Void> updateBug(@PathVariable String username, @RequestBody Bug bug) {
		Bug newBug = bugService.save(bug);
		
		//Location of created resource
		//users/{user_name}/bugs/{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newBug.getId()).toUri();
		
		
		return ResponseEntity.created(uri).build(); // RESTful standard
		

	}
	
}
