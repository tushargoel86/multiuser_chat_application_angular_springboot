# multiuser_chat_application_angular_springboot
#SpringBoot, # Angular,  #WebSocket, #STOMP, #RabbiMQ

### Features Supported:
* Text based multiple user chat 
* Unique user login
* New user login notification
* Online users list
* Multiple user can send message to common chat
* Log out notification in chat window in case some users left the chat

# Components used:
* Angular with Bootstap 4, Stomp library
* Spring Boot with WebSocket (STOMP), RabbitMQ using STOMP plugin (docker image) 

# How to use:

* Start docker instance. I have used rabbitMQ image with STOMP plugin.
```
 docker pull activiti/rabbitmq-stomp
 docker run -d --hostname my-rabbit --name rabbit-stomp -p 61613:61613 activiti/rabbitmq-stomp 
```
* Go to pom.xml file [here](backend), run command mvn install, it will download all the dependencies for backend support.
  It will start the backend server at port 8080
  
* Go to package.json file in ui and fire command 'npm install'. It will install all the required libraries. To start node server enter below command, it will start the UI in default port 4200. You can change default config [here](https://github.com/tushargoel86/multiuser_chat_application_angular_springboot/blob/master/ui/src/app/services/websocket-service.service.ts)

```
npm intall
ng serve -o
```

# Screenshots:

* Login

![](https://github.com/tushargoel86/multiuser_chat_application_angular_springboot/blob/master/images/login_page.PNG)

* Chatroom

![](https://github.com/tushargoel86/multiuser_chat_application_angular_springboot/blob/master/images/chatroom.PNG)

* Multiple user

![](https://github.com/tushargoel86/multiuser_chat_application_angular_springboot/blob/master/images/multipleUser.PNG)

* Log out

![](https://github.com/tushargoel86/multiuser_chat_application_angular_springboot/blob/master/images/logout.PNG)

* Error Message

![](https://github.com/tushargoel86/multiuser_chat_application_angular_springboot/blob/master/images/errorMessage.PNG)


