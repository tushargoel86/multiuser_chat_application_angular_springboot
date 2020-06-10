package com.tushar.chat.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import com.tushar.chat.model.Message;

@RestController
public class MessagingController {

	@Autowired
	private SimpMessageSendingOperations messagingTemplate;

	// group chat
	@MessageMapping("/message")
	@SendTo("/topic/broadcast")
	public Message sendMessage(@Payload Message message) {
		return message;
	}

	@MessageMapping("/newUser")
	@SendTo("/topic/broadcast")
	public Message registerUser(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
		headerAccessor.getSessionAttributes().put("user", message.getSender());
		return message;
	}
}
