import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Badge from '@material-ui/core/Badge';
import GridListTile from '@material-ui/core/GridListTile';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import MenuGroup from './menuGroup';
import MenuItem from './menuItem';
import MenuModal from './menuModal';
import BagModal from './bagModal';
import { toggleMenuModal, toggleBagModal } from '../actions/menuActions';

import menu_data from '../kenaki_menu.json';
import MODS from '../modifications.json';


const kenaki_logo = "https://kenakisushi.com/wp-content/uploads/2018/10/kenaki-emblem.png";

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
  },
  bagColor: {
    color: '#ffffff'
  }
}));


const getMenuCard = (menu_items, key) => {
  if(menu_items['modifications'] !== undefined) {
    menu_items['mods'] = MODS[menu_items['modifications']] || [];
  }
  return (
    <GridListTile key={key}>
      <MenuItem key={key} opened={false} {...menu_items} />
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

  const handleMenuClose = (props) => {
    props.toggleMenuModal(!props.opened_menu, {});
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={kenaki_logo} alt="logo" className={classes.logo} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            KENAKI Sushi Counter
          </Typography>
          <IconButton
            onClick={() => props.toggleBagModal(true)}
            aria-label="add" >
            <Badge badgeContent={props.quantity} color="secondary">
              <LocalMallOutlinedIcon
                  className={classes.bagColor}
                  fontSize="large" color="inherit" variant="outlined" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.opened_menu}
          onClose={() => handleMenuClose(props)}
          disableEnforceFocus>
            <div>
              <MenuModal {...props.itemProps} />
            </div>

        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.opened_bag}
          onClose={() => props.toggleBagModal(false)}
          disableEnforceFocus>
            <div>
              <BagModal />
            </div>

        </Modal>
        {groups}
      </Container>

    </div>
  );
}

const mapStateToProps = state => {
    let quantity = 0;

    state.bag.bag.forEach( (x) => {
      quantity += x.quantity
    })
    return {
        opened_bag: state.bag.bagOpen,
        opened_menu: state.menu.menuOpen,
        itemProps: state.menu.itemProps,
        quantity: quantity
    };
};

export default connect(mapStateToProps, { toggleMenuModal, toggleBagModal })(MenuBody);