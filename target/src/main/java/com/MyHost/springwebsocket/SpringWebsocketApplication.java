package com.MyHost.springwebsocket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class SpringWebsocketApplication {

	public static void main(String[] args) {

		System.out.println("HELLLLOOOOOOOOOOOOOOOO");

		//SpringApplication.run(SpringWebsocketApplication.class, args);
		SpringApplication application = new SpringApplication(SpringWebsocketApplication.class);
		application.run(args);

	}

}
