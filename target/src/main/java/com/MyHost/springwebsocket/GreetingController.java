package com.MyHost.springwebsocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;

@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greet(HelloMessage message) {
        System.out.println(" --> "+message.getName());
        String responseFromBackend = handleRequest(message.getName());
        System.out.println(" <-- "+responseFromBackend);

        return new Greeting(responseFromBackend);
    }


    public String handleRequest(String request) {
        String response = null;
        boolean running = false;
        Socket echosocket = null;
        BufferedWriter writer = null;
        BufferedReader reader = null;

        try {
            System.out.println("Starting connection to back end");

            echosocket = new Socket("localhost", 5000);
            writer = new BufferedWriter(
                    new OutputStreamWriter(echosocket.getOutputStream()));
            reader = new BufferedReader(
                    new InputStreamReader(echosocket.getInputStream()));
            System.out.println("Continuing connection to back end");

            running = true;

            writer.write(request+"\r\n");
            writer.flush();

            String currentMessage = reader.readLine();
            response = currentMessage;


            //writer.write("DIE"+"\r\n");
            //writer.flush();
            echosocket.close();
            reader.close();
            writer.close();


        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return response;

    }

}
