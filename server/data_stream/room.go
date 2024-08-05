package datastream

import (
	"doomkeeper_server/entity"
	"log/slog"
	"sync"
)

type userConnect struct {
	user    *entity.User
	outChan chan<- any
}

type Room struct {
	userMutex sync.RWMutex
	Users     map[string]userConnect
}

func (r *Room) OnPlayerConnected(ee *entity.ExternalEvent, out chan<- any) {
	r.userMutex.Lock()
	defer r.userMutex.Unlock()
	for _, u := range r.Users {
		u.outChan <- ee
	}
	pc := ee.Event.(*entity.PlayerConnect)
	r.Users[pc.User.PlayerID] = userConnect{
		user:    &pc.User,
		outChan: out,
	}
}

func (r *Room) OnPlayerMove(pc *entity.ExternalEvent) {
	r.userMutex.Lock()
	defer r.userMutex.Unlock()
	pm := pc.Event.(*entity.PlayerMove)
	user, find := r.Users[pm.PlayerID]
	if !find {
		slog.Error("failed to find user", slog.Any("event", pc))
		return
	}
	user.user.PossX = pm.NewX
	user.user.PossY = pm.NewY
	for id, u := range r.Users {
		if id != pm.PlayerID {
			u.outChan <- pc
		}
	}
}
