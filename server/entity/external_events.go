package entity

import (
	"encoding/json"

	"github.com/pkg/errors"
)

const PlayerConnectName = "player_connect"
const PlayerMoveName = "player_move"

type ExternalEvent struct {
	Name     string `json:"Name"`
	RawEvent string `json:"RawEvent"`
	Event    any    `json:"-"`
}

func (e *ExternalEvent) ToJSON() []byte {
	data, err := json.Marshal(e)
	if err != nil {
		panic(err)
	}
	return data
}

func (e *ExternalEvent) ExtractEvent() error {
	switch e.Name {
	case PlayerConnectName:
		pc := &PlayerConnect{}
		if err := json.Unmarshal([]byte(e.RawEvent), pc); err != nil {
			return errors.WithMessage(err, "failed to PlayerConnect extract event")
		}
		e.Event = pc
		return nil
	case PlayerMoveName:
		pm := &PlayerMove{}
		if err := json.Unmarshal([]byte(e.RawEvent), pm); err != nil {
			return errors.WithMessage(err, "failed to extract PlayerMove event")
		}
		e.Event = pm
		return nil
	}
	return errors.New("unknown event type: " + e.Name)
}

type PlayerConnect struct {
	User User `json:"User"`
}

type PlayerMove struct {
	PlayerID string  `json:"PlayerID"`
	NewX     float64 `json:"NewX"`
	NewY     float64 `json:"NewY"`
}

type EchoMessage struct {
	Message string `json:"Message"`
}
