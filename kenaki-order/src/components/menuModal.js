import React, { useState } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import GridList from '@material-ui/core/GridList';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import { addToBag, toggleMenuModal } from '../actions/menuActions';


const useStyles = makeStyles(theme => ({
  label: {
    fontSize: theme.typography.pxToRem(12),
  },
  modification: {
    width: '100%',
    outline: 0,
    backgroundColor: '#e7e7e7',
    fontSize: '0.6rem',
    padding: theme.spacing(2, 4, 3),
  },
  cardheader: {
    padding: 0
  },
  itemTitle: {
    padding: 2,
    fontSize: theme.typography.pxToRem(32),
    fontWeight: theme.typography.fontWeightBold,
  },
  itemPrice: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightBold
  },
  instructions: {
    fontSize: theme.typography.pxToRem(14),
    paddingTop: 16,
    width: '100%'
  },
  textarea: {
    fontSize: theme.typography.pxToRem(14),
    paddingTop: 16,
    width: '100%'
  },
  modheader: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold
  },
  bagbutton: {
    float: 'right'
  },
  quantityInput: {
    width: '100%'
  },
  quantityButtons: {
    padding: 0
  },
  paper: {
    position: 'absolute',
    width: '60%',
    outline: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const getModalStyle = () => {
    return {
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
    };
}


const ModificationButton = (props, classes, key) => {
    const label = props.label + " + $" + props.price.toFixed(2)
    const value = props.label + '|' + props.price
    return (
        <FormControlLabel
            key={key}
            value={value}
            control={<Radio color="primary" className="mod-radio" />}
            label={<Typography className={classes.label}>{label}</Typography>}
            />
    )
}

const ModificationPanel = (props, classes, handleRadioChange) => {
    const buttons = props.modifications.map( (m, i) => {
        return ModificationButton(m, classes, i)
    })

    if( buttons.length === 0 ) {
        return (<div></div>)
    }
    return (
        <Card className={classes.modification}>
            <CardHeader className={classes.cardheader}>
                <Typography className={classes.modheader}>Modifications</Typography>
                <Typography className="menu-item-card-body" color="textSecondary">
                Required - Choose 1.
                </Typography>
            </CardHeader>
            <CardContent >

            <GridList className={classes.gridList} cols={3} >

                <RadioGroup onChange={(event) => handleRadioChange(event.target.value)}>
                    {buttons}
                </RadioGroup>
            </GridList>

            </CardContent>
        </Card>
    )
}

const SpecialInstructionsPanel = (classes, updateRequests) => {
    return (
        <div className={classes.instructions}>
        <Typography className={classes.modheader}>Special Instructions</Typography>
        <TextareaAutosize
            className={classes.textarea}
            aria-label="minimum height"
            rowsMin={5}
            onChange={(event) => updateRequests(event.target.value)}
            placeholder="Any Special Requests?" />
        </div>
    );
}

const QuantityControl = (classes, quantity, quantityState) => {
    return (
        <Grid container spacing={1}
            direction="row"
            alignItems='center' justify="flex-start">
            <Grid item xs={3}>
                <Typography className={classes.modheader}>Quantity</Typography>
            </Grid>
            <Grid item xs={1}>
                <IconButton
                    className={classes.quantityButtons}
                    onClick={() => quantityState(quantity - 1)}
                    aria-label="remove" >
                    <RemoveIcon fontSize="small" />
                </IconButton>
            </Grid>
            <Grid item xs={2}>
                <TextField
                    id="standard-number"
                    type="number"
                    variant="outlined"
                    value={quantity}
                    onChange={(e) => quantityState(e.target.value)}
                    className={classes.quantityInput}
                    InputLabelProps={{shrink: true}}/>
                </Grid>
            <Grid item xs={1}>
                <IconButton
                    onClick={() => quantityState(quantity + 1)}
                    className={classes.quantityButtons}
                    aria-label="add" >
                    <AddIcon fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    );
}

const MenuModalHeader = (props, classes, handleModalClose) => {
    let dollarPrice = "$" + props.price.toFixed(2)
    return (
        <CardHeader>
            <Grid container
                spacing={2}
                direction="row"
                alignItems='center' justify="space-between">
                <Grid item xs={10}>
                    <Typography className={classes.itemTitle}>
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        onClick={() => handleModalClose(props.opened)}
                        aria-label="close" >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
            <Typography className={classes.itemPrice}>
                {dollarPrice}
            </Typography>
            <Typography className="menu-item-card-body" color="textSecondary">
                {props.description}
            </Typography>
       </CardHeader>
    )
}

const MenuModal = (props) => {
  const [ modalStyle ] = React.useState(getModalStyle);
  const [ quantity, setQuantity ] = useState(1);
  const [ requests, setRequests ] = useState('');
  const [ mods, setMods] = useState('');
  const classes = useStyles();

  const handleModalClose = (opened) => { props.toggleMenuModal(!opened, {}) };
  const handleQuantityChange = (inc) => { setQuantity(inc)};
  const handleRequestChange = (value) => { setRequests(value) };
  const handleRadioChange = (value) => { setMods(value) };
  const handleAddToBagClick = () => {
      let item_mods = mods.split('|')
      let bag_item = {
          title: props.title,
          price: props.price,
          menu_item_id: props.menu_item_id,
          quantity: quantity,
          requests: requests,
      }
      if ( item_mods.length > 1 ) {
        bag_item = {
            ...bag_item,
            modifications: {
                label: item_mods[0],
                price: parseFloat(item_mods[1])
            }
        }
      }

      props.addToBag(bag_item)
      props.toggleMenuModal(false, {})
  }
  return (

    <Card style={modalStyle} className={classes.paper} variant="outlined">

      <CardContent>
        {MenuModalHeader(props, classes, handleModalClose)}

        <Grid container spacing={3}>
              {ModificationPanel(props, classes, handleRadioChange)}
        </Grid>
        <Grid container spacing={3}>
              {SpecialInstructionsPanel(classes, handleRequestChange)}
        </Grid>
        <Grid container spacing={3} direction="row"
              alignItems='center' justify="space-between">
            <Grid item xs={8}>
                {QuantityControl(classes, quantity, handleQuantityChange)}
            </Grid>
            <Grid item xs={4}>
            <Button className={classes.bagbutton}
                onClick={handleAddToBagClick}
                startIcon={<AddShoppingCartIcon />}
                variant="contained" color="default">
                Add to Bag
            </Button>
            </Grid>
        </Grid>
      </CardContent>

    </Card>

  );
}

const mapStateToProps = state => {
    return {
        opened: state.menu.menuOpen,
    };
};


export default connect(mapStateToProps, { addToBag, toggleMenuModal })(MenuModal);