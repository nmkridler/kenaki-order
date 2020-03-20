import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  
  paper: {
    position: 'absolute',
    width: '60%',
    outline: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },  
}));

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

export default function MenuModal(props) {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  let dollarPrice = "$" + props.price.toFixed(2)
  
  return (

    <Card style={modalStyle} className={classes.paper} variant="outlined">
      
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Typography className="menu-item-card-title" component="h6">
               {props.title}
            </Typography>
            <Typography className="menu-item-card-body" color="textSecondary">
              {props.description}
            </Typography>                
          </Grid>
          <Grid item xs={3}>
              <span>{dollarPrice}</span>
          </Grid>  
        </Grid>
      </CardContent>
      
    </Card>
    
  );
}
