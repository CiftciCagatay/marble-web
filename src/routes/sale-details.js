import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Tooltip,
  AppBar,
  Tabs,
  Tab,
  Divider,
  Checkbox,
  Button,
  Toolbar,
  Grid,
  InputBase,
  ListSubheader
} from '@material-ui/core'
import { yellow, blue, green } from '@material-ui/core/colors'

import {
  Timer,
  LocalPizza,
  CloudDownload,
  Edit,
  Search as SearchIcon,
  GroupWork
} from '@material-ui/icons'
import UserAvatar from '../components/common/user-avatar'
import { Link } from 'react-router-dom'

import { timeDiff } from '../scripts'

export default function() {
  const [tabValue, setTabValue] = useState(1)

  const renderSearchbar = buttons => (
    <Toolbar>
      <Grid alignItems="center" spacing={4} container>
        <Grid item>
          <SearchIcon />
        </Grid>

        <Grid xs item>
          <InputBase placeholder="Filtrele" fullWidth />
        </Grid>

        <Grid item>{buttons}</Grid>
      </Grid>
    </Toolbar>
  )

  const renderSteps = () => {
    const steps = [
      {
        completed: false,
        title: 'Teklifte revize yapılacak',
        deadline: '11 Şubat'
      },
      { completed: true, title: 'Teklif yollanacak', deadline: '2 Şubat' },
      { completed: true, title: 'Çağrı yapılacak', deadline: '2 Şubat' }
    ]

    return (
      <React.Fragment>
        <Grid justify="flex-end" container>
          <Grid item>
            <Button color="primary" variant="contained">
              Yeni Adım
            </Button>
          </Grid>
        </Grid>

        <List>
          {steps.map(step => (
            <ListItem button>
              <ListItemAvatar>
                <Checkbox />
              </ListItemAvatar>

              <ListItemText primary={step.title} secondary={step.deadline} />
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    )
  }

  const renderNotes = () => {
    const notes = [
      'BPM Modülünün satışı hakkında Banu hanımla telefonda konuştum. Bilgi almak için 2 gün içinde geri dönüş yapacaklar.',
      'Banu hanımla görüştüm. Gelecek hafta bizi ofislerinde toplantıya bekliyorlar. Teklifi öncesinden yollayacağım.',
      'Banu hanım teklifte revize istedi. 2 gün içinde dönüş yapacağım.'
    ]

    return (
      <div>
        {renderSearchbar([
          <Button color="primary" variant="contained">
            Yeni Not
          </Button>
        ])}

        {notes.map(note => (
          <React.Fragment>
            <Card style={{ marginTop: '12px' }} elevation={0}>
              <CardHeader
                avatar={
                  <UserAvatar user={{ _id: '2', name: 'Çağatay Çiftçi' }} />
                }
                title="Çağatay Çiftçi"
                subheader={timeDiff(new Date())}
              />

              <CardContent>
                <Typography>{note}</Typography>
              </CardContent>
            </Card>

            <Divider />
          </React.Fragment>
        ))}
      </div>
    )
  }

  const renderActivities = () => {
    return (
      <React.Fragment>
        {renderSearchbar([
          <Button color="primary" variant="contained">
            Yeni Etkinlik
          </Button>
        ])}

        <List>
          {[0, 1, 2].map(() => (
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <GroupWork />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary="Banu hanımlarla toplantı"
                secondary="23 Şubat 16 - 17:30"
              />
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    )
  }

  const renderOffers = () => {
    return (
      <React.Fragment>
        {renderSearchbar([
          <Button color="primary" variant="contained">
            Yeni Teklif
          </Button>
        ])}

        <List>
          {[0, 1, 2].map(() => (
            <Link to="/offers/1">
              <ListItem button>
                <ListItemAvatar>
                  <UserAvatar user={{ _id: '2', name: 'Çağatay Çiftçi' }} />
                </ListItemAvatar>

                <ListItemText primary="Teklif Başlığı" secondary="7 Şubat" />
              </ListItem>
            </Link>
          ))}
        </List>
      </React.Fragment>
    )
  }

  return (
    <Grid spacing={16} container>
      <Grid item xs={4}>
        <Card>
          <CardHeader
            avatar={<UserAvatar user={{ _id: '2', name: 'Çağatay Çiftçi' }} />}
            title="BPM Modülü"
            subheader="Arctory"
            action={
              <React.Fragment>
                <Tooltip title="İndir">
                  <IconButton>
                    <CloudDownload />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Düzenle">
                  <IconButton>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </React.Fragment>
            }
          />

          <Progress progress={80} />

          <CardContent>
            <List dense>
              <ListSubheader>Bilgiler</ListSubheader>

              <ListItem dense>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPizza />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="5000 ₺" secondary="Beklenen" />
              </ListItem>

              <ListItem dense>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPizza />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Teklif İstendi" secondary="Durum" />
              </ListItem>

              <ListItem dense>
                <ListItemAvatar>
                  <Avatar>
                    <Timer />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary="15 Ocak"
                  secondary="Oluşturulduğu Tarih"
                />
              </ListItem>

              <ListItem dense>
                <ListItemAvatar>
                  <Avatar>
                    <Timer />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary="22 Şubat"
                  secondary="Tahmini Sonuçlanma Tarihi"
                />
              </ListItem>

              <ListSubheader>Sonraki Adım</ListSubheader>

              <ListItem button dense>
                <ListItemAvatar>
                  <Checkbox />
                </ListItemAvatar>

                <ListItemText primary="Çağrı yapılacak" secondary="22 Şubat" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid xs={8} item>
        <Card>
          <AppBar position="static">
            <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)}>
              <Tab label="Adımlar" />
              <Tab label="Notlar" />
              <Tab label="Etkinlikler" />
              <Tab label="Teklifler" />
            </Tabs>
          </AppBar>

          <CardContent>
            {tabValue === 0 && renderSteps()}
            {tabValue === 1 && renderNotes()}
            {tabValue === 2 && renderActivities()}
            {tabValue === 3 && renderOffers()}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

function Progress(props) {
  const { progress } = props

  let backgroundColor = yellow[500]

  if (progress >= 50) {
    backgroundColor = blue[500]
  }

  if (progress >= 75) {
    backgroundColor = green[500]
  }

  return (
    <div
      style={{
        height: '4px',
        width: `${progress}%`,
        borderBottomLeftRadius: '2px',
        borderBottomRightRadius: '2px',
        backgroundColor
      }}
    />
  )
}
