import React, { Fragment, useReducer } from 'react'
import {
  Card,
  InputBase,
  CardContent,
  Select,
  Grid,
  Input,
  Radio,
  Button
} from '@material-ui/core'
import _ from 'lodash'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, [action.payload.id]: action.payload }

    case 'ADD_CHOICE':
      return { ...state, [action.payload.id]: { ...state[action.payload.id], choices: {
        ...state[action.payload.id].choices,
      } } }

    case 'REMOVE':
      const { [action.payload.id]: temp, ...newState } = state
      return { ...newState }

    case 'UPDATE':
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload }
      }

    default:
      return state
  }
}

export default function() {
  const questionTypes = [
    'shortAnswer',
    'longAnswer',
    'multipleChoice',
    'checkbox',
    'file',
    'date',
    'time'
  ]

  const [state, dispatch] = useReducer(reducer, {
    '1': {
      id: '1',
      text: 'Başlıksız Soru',
      type: 'shortAnswer'
    }
  })

  const renderQuestion = question => {
    switch (question.type) {
      case 'shortAnswer':
        return <Input placeholder="Kısa Yanıt" />
      case 'longAnswer':
        return <Input placeholder="Uzun Yanıt" />
      case 'multipleChoice':
        return (
          <Fragment>
            {_.map(question.choices, choice => (
              <Grid alignItems="center" container>
                <Grid item>
                  <Radio disabled={true} />
                </Grid>

                <Grid item xs>
                  <InputBase defaultValue={choice.label} fullWidth />
                </Grid>
              </Grid>
            ))}

            <Grid alignItems="center" container>
              <Grid item>
                <Radio disabled={true} />
              </Grid>

              <Grid item xs>
                <InputBase value="Seçenek Ekle" onClick={dispatch('ADD_CHOICE', { id: question.id })} />
              </Grid>
            </Grid>
          </Fragment>
        )
    }
  }

  return (
    <Fragment>
      <Grid justify="center" container>
        <Grid xs={8} item>
          <Card>
            <CardContent>
              <Input defaultValue="Başlıksız Form" fullWidth />

              <Input placeholder="Form Açıklaması" fullWidth />

              <div style={{ marginTop: '36px' }}>
                {_.map(state, question => (
                  <Fragment>
                    <Grid alignItems="center" spacing={16} container>
                      <Grid item xs>
                        <Input fullWidth defaultValue={question.text} />
                      </Grid>

                      <Grid item>
                        <Select
                          value={question.type}
                          onChange={e =>
                            dispatch({
                              type: 'UPDATE',
                              payload: {
                                id: question.id,
                                type: e.target.value,
                                choices: [{ label: 'Seçim 1', id: 1 }]
                              }
                            })
                          }
                        >
                          {questionTypes.map(type => (
                            <option value={type}>{type}</option>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>

                    {renderQuestion(question)}
                  </Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  )
}
