import React from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

//appbar 関連
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root:{
    width: '100%',
    marginWidth: 1000
  },
  menu:{
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 28
  },
  progress: {
    margin: theme.spacing(2)
  },
  tableHead:{
    fontSize: '1.0rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
    .then(res => {
      console.log(res);
      return (this.setState({
        customers: res
      }));
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => {
      console.log(res);
      return (this.setState({
        customers: res
      }));
    })
    .catch(e => console.log(e));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const data = response.json(); 
    return data;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({
      completed: completed>= 100 ? 0 : completed +1
    });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter(v => {
        return v.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map(c => {
        return (
          <Customer 
            key={c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}
            stateRefresh={this.stateRefresh}
          />
        );
      });
    }


    const { classes } = this.props;
    const cellList = ['番号','プロフィール画像','お名前','お誕生日','性別','職業','設定'];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              管理システム
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="検索…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>
        <Paper className={classes.paper}>
          <Table  className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(v => <TableCell>{v}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
            { this.state.customers ? 
              filteredComponents(this.state.customers) : 
              <TableRow>
                <TableCell colSpan='6' align='center'>
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  
  }

}

export default withStyles(styles)(App) ;
