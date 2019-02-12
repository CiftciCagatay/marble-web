import React, { Component } from 'react'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  TextField,
  Button,
  Tooltip,
  IconButton
} from '@material-ui/core'
import {
  Search as SearchIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import CategoryDialog from './category-dialog'

import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchCategories, removeCategory } from '../../actions'

import { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../../config'
import AccessControl from '../common/access-control'
import DeleteForeverDialog from '../common/delete-forever-dialog'

const styles = theme => ({
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  addUser: {
    marginRight: theme.spacing.unit
  }
})

class CategoryList extends Component {
  state = {
    dialogOpen: false,
    dialogMode: 'create',
    dialogCategory: { text: '', description: '', unit: '' },

    selectedCategoryId: '',
    deleteDialogOpen: false
  }

  componentDidMount() {
    const { unit } = this.props

    if (unit) {
      this.props.fetchCategories({ unit })
    }
  }

  componentDidUpdate(prevProps) {
    const { unit } = this.props

    if (prevProps.unit !== unit) {
      this.props.fetchCategories({ unit })
    }
  }

  renderList = () => {
    if (!this.props.categories)
      return (
        <Typography color="textSecondary" align="center">
          Hiç kategori bulunamadı
        </Typography>
      )

    return (
      <Table>
        <TableBody>
          {_.map(this.props.categories, category => (
            <TableRow key={category._id}>
              <TableCell>{category.text}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <div style={{ float: 'right' }}>
                  <AccessControl
                    permission={UPDATE_CATEGORY}
                    unitId={this.props.unit}
                  >
                    <Button
                      onClick={() =>
                        this.setState({
                          dialogOpen: true,
                          dialogMode: 'update',
                          dialogCategory: category
                        })
                      }
                    >
                      Düzenle
                    </Button>
                  </AccessControl>

                  <AccessControl
                    permission={DELETE_CATEGORY}
                    unitId={this.props.unit}
                  >
                    <Button
                      onClick={() =>
                        this.setState({
                          selectedCategoryId: category._id,
                          deleteDialogOpen: true
                        })
                      }
                    >
                      Sil
                    </Button>
                  </AccessControl>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  renderToolbar = () => {
    const { classes } = this.props
    return (
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={16} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Ara"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput
                }}
              />
            </Grid>
            <Grid item>
              <AccessControl
                permission={CREATE_CATEGORY}
                unitId={this.props.unit}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addUser}
                  onClick={() =>
                    this.setState({
                      dialogOpen: true,
                      dialogMode: 'create',
                      dialogCategory: { unit: this.props.unit }
                    })
                  }
                >
                  Yeni Kategori
                </Button>
              </AccessControl>

              <Tooltip title="Yenile">
                <IconButton
                  onClick={() =>
                    this.props.fetchCategories({ unit: this.props.unit })
                  }
                >
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    const { dialogOpen, dialogMode, dialogCategory } = this.state

    return [
      <div key="root">
        {this.renderToolbar()}
        {this.renderList()}
      </div>,

      <CategoryDialog
        key="category-dialog"
        open={dialogOpen}
        mode={dialogMode}
        category={dialogCategory}
        handleClose={() => this.setState({ dialogOpen: false })}
      />,

      <DeleteForeverDialog
        key="delete-dialog"
        title="Kategoriyi Sil"
        detail="Kategoriyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        onClickCancel={() =>
          this.setState({ deleteDialogOpen: false, selectedCategoryId: '' })
        }
        onClickDelete={() => {
          const { unit } = this.props

          this.setState({ deleteDialogOpen: false })

          this.props.removeCategory(this.state.selectedCategoryId).then(() => {
            this.setState({ selectedCategoryId: '' })
            this.props.fetchCategories({ unit })
          })
        }}
        open={this.state.deleteDialogOpen}
      />
    ]
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

export default connect(
  mapStateToProps,
  { fetchCategories, removeCategory }
)(withStyles(styles)(CategoryList))
