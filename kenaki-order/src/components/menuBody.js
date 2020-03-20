import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuGroup from './menuGroup.js';
import MenuItem from './menuItem.js';
import MenuModal from './menuModal.js';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import menu_data from '../kenaki_menu.json';
import { toggleMenuModal } from '../actions/menuActions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 56
  }
}));


const getMenuCard = (menu_item_data, key) => {
  return (
    <GridListTile key={key}>
      <MenuItem key={key} opened={false} {...menu_item_data} />
    </GridListTile>  
  )
}

const getMenuGroups = (menu_data) => {
  let menuGroups = {};
  menu_data.forEach( (x, i) => {
    if(!menuGroups[x.menu_group]) {
      menuGroups[x.menu_group] = [];
    }
    menuGroups[x.menu_group].push(getMenuCard(x, i));
  })
  
  let menuGroupCards = Object.keys(menuGroups).map( (m, i) => {
    return (
      <MenuGroup title={m} cards={menuGroups[m]} key={i} />
    );
  })
  return menuGroupCards;
}

const MenuBody = (props) => {
  const classes = useStyles();
  const groups = getMenuGroups(menu_data);

  const handleClose = (props) => {
    props.toggleMenuModal(!props.opened, {});
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src="kenaki-emblem.png" alt="logo" className={classes.logo} />  
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            KENAKI Sushi Counter
          </Typography>
        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.opened}
        onClose={() => handleClose(props)}>
        <MenuModal {...props.itemProps} />  
      </Modal>      
      <Container maxWidth="md">
        {groups}
      </Container>

    </div>
  );
}

const mapStateToProps = state => {

    return { 
        opened: state.menu.menuOpen,
        itemProps: state.menu.itemProps
    };
};

export default connect(mapStateToProps, { toggleMenuModal })(MenuBody);