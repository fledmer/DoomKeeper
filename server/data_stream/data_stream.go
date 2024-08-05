package datastream

import (
	"context"
	"doomkeeper_server/entity"
	"encoding/json"
	"fmt"
	"log"
	"log/slog"
	"net/http"

	"github.com/gorilla/websocket"
)

func NewServer() *Server {
	return &Server{
		upgrader: &websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
		room: &Room{
			Users: map[string]userConnect{},
		},
	}
}

type Server struct {
	upgrader *websocket.Upgrader
	room     *Room
}

func (c *Server) serveChanMessage(inChan chan []byte) (outChan chan any) {
	outChan = make(chan any, 10)
	go func() {
		for data := range inChan {
			ev := &entity.ExternalEvent{}
			err := json.Unmarshal(data, ev)
			if err != nil {
				fmt.Println("Failed to unmarshal event", err)
			}
			fmt.Println("Unmarshal event", ev)

			err = ev.ExtractEvent()
			if err != nil {
				slog.Error("failed to extract event", "err", err)
			}
			slog.Info("extract event", slog.Any("event", ev.Event))
			switch ev.Event.(type) {
			case *entity.PlayerConnect:
				c.room.OnPlayerConnected(ev, outChan)
			case *entity.PlayerMove:
				c.room.OnPlayerMove(ev)
			}
		}
	}()
	return
}

func (s *Server) serveNewConnect(ctx context.Context, c *websocket.Conn) {
	inMessage := make(chan []byte, 10)
	go func() {
		for {
			_, message, err := c.ReadMessage()
			if err != nil {
				fmt.Println("Get error from connection", err)
				close(inMessage)
				return
			}
			fmt.Println("Get message from connection", string(message))
			inMessage <- message
		}
	}()
	outChan := s.serveChanMessage(inMessage)
	for {
		select {
		case <-ctx.Done():
			c.Close()
		case eRaw := <-outChan:
			switch e := eRaw.(type) {
			case *entity.ExternalEvent:
				c.WriteJSON(e)
			}
		}
	}
}

func (s *Server) NewConnection(w http.ResponseWriter, r *http.Request) {
	c, err := s.upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()
	s.serveNewConnect(context.TODO(), c)
}
