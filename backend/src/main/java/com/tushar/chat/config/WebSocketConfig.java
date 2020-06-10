package com.tushar.chat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Value("${spring.rabbitmq.username}")
	private String userName;

	@Value("${spring.rabbitmq.password}")
	private String password;

	@Value("${spring.rabbitmq.host}")
	private String host;

	@Value("${spring.rabbitmq.port}")
	private int port;

	@Value("${endpoint}")
	private String endpoint;

	@Value("${destination.prefix}")
	private String destinationPrefix;

	@Value("${stomp.broker.relay}")
	private String stompBrokerRelay;

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		
		registry.setApplicationDestinationPrefixes(destinationPrefix) // for destinations handled by the application itself
			    .enableStompBrokerRelay(stompBrokerRelay) //message broker config
				.setRelayHost(host)
				.setRelayPort(port)
				.setSystemLogin(userName)
				.setSystemPasscode(password);
	}

	//allows us to register STOMP endpoints over websockets with Sock.js enabled.
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		
		registry.addEndpoint(endpoint)
				.setAllowedOrigins("*") //to avoid CORS
				.withSockJS(); // for fallback in case websocket is not supported
	}

}
