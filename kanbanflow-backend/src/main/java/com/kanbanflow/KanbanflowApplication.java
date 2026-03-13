package com.kanbanflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class KanbanflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(KanbanflowApplication.class, args);
	}

}
