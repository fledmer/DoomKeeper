package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
} // use default options

func main() {
	flag.Parse()
	log.SetFlags(0)
	http.HandleFunc("/api/data_stream", dataStream)
	http.Handle("/", http.FileServer(http.Dir("../client/")))
	log.Fatal(http.ListenAndServe(*addr, nil))
}
