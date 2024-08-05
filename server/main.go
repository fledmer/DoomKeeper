package main

import (
	datastream "doomkeeper_server/data_stream"
	"flag"
	"log"
	"net/http"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

func main() {
	server := datastream.NewServer()
	flag.Parse()
	log.SetFlags(0)
	http.HandleFunc("/api/data_stream", server.NewConnection)
	http.Handle("/", http.FileServer(http.Dir("../client/")))
	log.Fatal(http.ListenAndServe(*addr, nil))
}
