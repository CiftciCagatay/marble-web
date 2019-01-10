import React, { Component } from 'react'
import {
  Avatar,
  Card,
  IconButton,
  CardContent,
  CardHeader,
  Typography,
  Tooltip,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ListItemText,
  ListItem,
  List,
  TextField,
  Button,
  Modal,
  Chip
} from '@material-ui/core'

import {
  Feedback,
  UpdateRounded,
  Send,
  Help,
  CloudUpload
} from '@material-ui/icons'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { postFeedback, uploadImage } from '../api'
import Dropzone from '../components/issues/new-issue/file-dropzone'
import marbleIcon from '../assets/marble-icon.png'

class About extends Component {
  state = {
    version: 'v1.4.0',
    selectedVersion: 'v1.4.0',
    fbFormOpen: false,
    feedback: '',
    files: [],
    dropzoneActive: false
  }

  dropzoneRef = null

  overlay = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2.5em 0',
    background: 'rgba(239, 239, 239, 0.5)',
    border: '5px dashed grey'
  }

  versions = [
    {
      number: 'v1.4.0',
      date: '10 Ocak 2019, Perşembe',
      notes: [
        'Anasayfadaki "Son Aktiviteler" kartı çalışır hale getirildi. Aktiviteye tıklandığında ilgili görevin detayları açılıyor.',
        'Görev detayları kısmındaki konuşma arayüzü güncellendi.',
        'Görev detaylarına "Birim" alanı eklendi.',
        'Admin olmayan kullanıcılarda "Yeni Görev Formu" nun tamamını görebilsin diye gerekli düzenlemeler yapıldı.'
      ]
    },
    {
      number: 'v1.3.0',
      date: '8 Aralık 2018, Cuma',
      notes: [
        'Birden fazla hesabı olan kullanıcılar için hesaplar arası geçiş özelliği eklendi.',
        'Navigasyon barındaki işlevsiz bildirimler butonu kaldırıldı.',
        'Kenar menüdeki işlevsiz Dashboard butonu kaldırıldı. Gerekli düzenlemelerden sonra yeniden eklenecek.',
        'Yine navigasyon butonundaki hesabım butonunun tasarımı değiştirildi.',
        'Uygulamanın renkleri düzenlendi ve bazı yerlere yeni logosu eklendi.'
      ]
    },
    {
      number: 'v1.2.0',
      date: '13 Eylül 2018, Perşembe',
      notes: [
        'Geri bildirim formuna dosya ekleme özelliği geldi.',
        'İş listesine görevliler eklendi ve kullanıcı logoları renklendirildi.',
        'Kullanıcı tanımındaki Şehir alanı metin alanından seçim haline getirildi.',
        'Günün vaktine göre karşılama mesajı eklendi.',
        'Anasayfaya son 20 etkinliği gösterecek bir liste eklendi.',
        'Artık iş detaylarında en son yapılan yorum en üstte gözüküyor.',
        'Tarih ve saatler düzenlendi.'
      ]
    },
    {
      number: 'v1.1.0',
      date: '12 Eylül 2018, Çarşamba',
      notes: ['Bildirimler menüsü eklendi.']
    },
    {
      number: 'v1.0.0',
      date: '11 Eylül 2018, Salı',
      notes: [
        'Hakkında kısmı eklendi.',
        'Geri bildirimler için form eklendi.',
        'Etiketler renklendirildi.',
        'Yeni iş formundaki etiket ve görevli ekleme kısmı tüm seçenekleri gösterecek şekle getirildi'
      ]
    }
  ]

  onFeedbackFormSubmit = e => {
    e.preventDefault()

    console.log({
      message: this.state.feedback,
      files: this.state.files,
      author: this.props.user,
      date: new Date()
    })

    postFeedback(this.props.accessToken, {
      message: this.state.feedback,
      files: this.state.files.map(({ path }) => path),
      author: this.props.user,
      date: new Date()
    })
      .then(() => {
        this.setState({ fbFormOpen: false, feedback: '', files: [] })
        alert('Desteğiniz için teşekkürler! Geri bildiriminiz bize ulaştı.')
      })
      .catch(err => console.log(err))
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ dropzoneActive: false })

    const formData = new FormData()

    acceptedFiles.map(file => formData.append('uploads', file))

    uploadImage(this.props.accessToken, formData, e => {
      var percentage = (e.loaded / e.total) * 100
      console.log(percentage + '%')
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ files: [...this.state.files, ...result] })
      })
      .catch(err => console.log(err))
  }

  openFileDialog = () => {
    if (this.dropzoneRef) this.dropzoneRef.open()
  }

  setDropzoneRef = node => (this.dropzoneRef = node)

  renderFeedbackForm = () => (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={this.state.fbFormOpen}
      onEscapeKeyDown={() => this.setState({ fbFormOpen: false })}
      onClose={() => this.setState({ fbFormOpen: false })}
    >
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          maxHeight: '80%',
          overflow: 'scroll'
        }}
        className={this.props.classes.paper}
      >
        <Dropzone
          setDropzoneRef={this.setDropzoneRef}
          onDrop={this.onDrop}
          onDragEnter={() => this.setState({ dropzoneActive: true })}
          onDragLeave={() => this.setState({ dropzoneActive: false })}
          disableClick
        >
          {this.state.dropzoneActive && (
            <div className={this.props.classes.overlay}>
              <Typography variant="headline" color="default">
                Dosyaları buraya bırakın...
              </Typography>
            </div>
          )}
          <form onSubmit={this.onFeedbackFormSubmit}>
            <TextField
              value={this.state.feedback}
              onChange={e => this.setState({ feedback: e.target.value })}
              label="Mesaj"
              multiline
              fullWidth
              autoFocus
              rows={5}
            />

            <Button
              color="primary"
              style={{ float: 'right', marginTop: '12px' }}
              variant="contained"
              disabled={!this.state.feedback}
              type="submit"
            >
              Gönder
              <Send style={{ marginLeft: '4px' }} />
            </Button>

            <Button
              variant="contained"
              color="default"
              style={{ float: 'right', marginTop: '12px', marginRight: '8px' }}
              onClick={this.openFileDialog}
            >
              Dosya Yükle
              <CloudUpload style={{ marginLeft: '4px' }} />
            </Button>

            <div style={{ marginTop: '12px' }}>
              {this.state.files.map((file, index) => (
                <Chip
                  label={file.originalname}
                  onDelete={() =>
                    this.setState({
                      files: this.state.files.filter((_, i) => i !== index)
                    })
                  }
                />
              ))}
            </div>
          </form>
        </Dropzone>
      </div>
    </Modal>
  )

  renderUpdateNotes = () =>
    this.versions.map(version => (
      <ExpansionPanel
        expanded={this.state.selectedVersion === version.number}
        onClick={() => this.setState({ selectedVersion: version.number })}
      >
        <ExpansionPanelSummary>
          <ListItem dense>
            <Avatar>
              <UpdateRounded />
            </Avatar>
            <ListItemText primary={version.number} secondary={version.date} />
          </ListItem>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <List>
            {version.notes.map(note => (
              <ListItem>
                <ListItemText primary={note} />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))

  render() {
    return [
      // Page layout
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={<Avatar src={marbleIcon} />}
              action={
                false && (
                  <Tooltip title="Geri Bildirim">
                    <IconButton
                      onClick={() => this.setState({ fbFormOpen: true })}
                      color="secondary"
                    >
                      <Feedback />
                    </IconButton>
                  </Tooltip>
                )
              }
              title="Marble"
              subheader={`Mevcut Sürüm : ${this.state.version}`}
            />
            <CardContent>
              <Typography variant="title">Hakkında</Typography>

              <Typography variant="body1">
                Süreç Takip uygulaması çalışma alanındaki süreçlerin basit ve
                efektif bir şekilde yönetilmesini sağlar. Arayüz ve
                fonksiyonaliteler tasarlanırken aklımızda hep kullanım kolaylığı
                vardı.
              </Typography>

              <Typography variant="body1">
                Geliştirici takıma im.cgtycftc@gmail.com adresinden ulaşıp
                geribildirimlerinizi iletebilirisiniz. Desteğiniz için teşekkür
                ederiz.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {this.renderUpdateNotes()}
        </Grid>
      </Grid>,

      // Form modal
      this.renderFeedbackForm()
    ]
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2.5em 0',
    background: 'rgba(239, 239, 239, 0.5)',
    border: '5px dashed grey'
  }
})

About.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps({ auth: { accessToken }, users: { user } }) {
  return { accessToken, user }
}

export default connect(mapStateToProps)(withStyles(styles)(About))
