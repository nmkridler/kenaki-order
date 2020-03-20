import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { toggleMenuModal } from '../actions/menuActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 115
  }
});

const MenuItem = (props) => {
  
  const toggleModal = (props) => {
      let item_props = {
          description: props.description,
          title: props.title,
          price: props.price
      }
      props.toggleMenuModal(!props.opened, item_props);
  }

  const classes = useStyles();
  let dollarPrice = "$" + props.price.toFixed(2)
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={() => {toggleModal(props)}}>
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
              <span className="menu-item-card-price">{dollarPrice}</span>
          </Grid>  
        </Grid>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}

MenuItem.defaultProps = {
    opened: false
}

const mapStateToProps = state => {

    return { 
        opened: state.menu.menuOpen 
    };
};

export default connect(mapStateToProps, { toggleMenuModal })(MenuItem);