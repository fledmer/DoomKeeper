package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Message struct {
	Name string         `json:"name"`
	Data map[string]any `json:"-"`
}

type EchoMessage struct {
	Message string `json:"-"`
}

func newConnection(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()
	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		err = c.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
