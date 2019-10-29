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

const styles = theme => ({
  root:{
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})

class App extends React.Component {

  state = {
    customers: "",
    completed: 0 
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table  className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { this.state.customers ? this.state.customers.map( v => 
              <Customer 
                key={v.id}
                id={v.id}
                image={v.image}
                name={v.name}
                birthday={v.birthday}
                gender={v.gender}
                job={v.job}
              />
            ) : 
              <TableRow>
                <TableCell colSpan='6' align='center'>
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd />
      </div>
    );
  
  }

}



export default withStyles(styles)(App) ;