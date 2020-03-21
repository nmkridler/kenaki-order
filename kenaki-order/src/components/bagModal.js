import React, { useState } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import {
    removeFromBag,
    emptyBag,
    updateBagQuantity,
    toggleBagModal } from '../actions/menuActions';


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
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightBold
  },
  itemHeading: {

    borderBottom: '2px solid black'
  },
  itemDescription: {
    padding: 2,
    fontSize: theme.typography.pxToRem(12)
  },
  itemPrice: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightBold,
    float: 'right'
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
  decreaseButtons: {
    float: 'right'
  },
  increaseButtons: {
    float: 'left'
  },
  card: {
    position: 'absolute',
    width: '60%',
    outline: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  orderItemPaper: {
    width: '95%',
    padding: theme.spacing(2),
    textAlign: 'left',
    boxShadow: theme.shadows[1],
    color: theme.palette.text.primary,
  },
  cardPaper: {
    width: '100%',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
    color: theme.palette.text.primary,
  },
  emptyBag: {
    width: '95%',
    padding: theme.spacing(2),
    textAlign: 'center',
    boxShadow: theme.shadows[0],
    color: theme.palette.text.secondary,
    height: '30%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  summaryPaper: {
    width: '95%',
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
      width: '95%',
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.background.paper,
  },
  modalHeader: {
    padding: 2,
    fontSize: theme.typography.pxToRem(32),
    fontWeight: theme.typography.fontWeightBold,
  },
  summaryHeader: {
    padding: theme.spacing(2),
    fontSize: theme.typography.pxToRem(32),
    boxShadow: theme.shadows[0],
    fontWeight: theme.typography.fontWeightBold,
  },
  footer: {
    width: '95%',
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.background.paper
  },
  summaryTable: {
    float: 'right',
    borderCollapse: 'collapse'
  },
  tableDesc: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'right',
  },
  tableRow: {
    borderCollapse: 'collapse'
  },
  tableElem: {
    borderBottom: '2px solid black'
  },
  emptyBagButton: {
      float: 'right',
      marginTop: '8px'
  }
}));

const getModalStyle = () => {
    return {
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
    };
}

const getPrice = (item) => {
    let price = item.price
    if (item.modifications !== undefined) {
        price += item.modifications.price
    }

    return (price * item.quantity)
}

const toDollar = ( x ) => { return ('$'+ x.toFixed(2)) }


const QuantityControl = (classes, item, quantityState, removeFromBag) => {

    const getDescription = (item) => {
        let description = '$' + item.price.toFixed(2)

        if (item.modifications !== undefined) {
            let modprice = '$' +  item.modifications.price.toFixed(2)
            let modification = `+ (${modprice}) ${item.modifications.label}`
            description += modification
        }
        if (item.requests !== '') {
            description += ` [${item.requests}]`
        }
        return description

    }

    return (
        <Grid container spacing={1}
            direction="row"
            alignItems="flex-start" justify="space-between">
            <Grid item xs={1}>
                <IconButton
                    onClick={() => removeFromBag()}
                    className={classes.increaseButtons}
                    aria-label="add" >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Grid>
            <Grid item xs={8}>
                <Grid container spacing={0} direction="row"
                    alignItems="center" justify="space-between"
                    className={classes.itemHeading}
                    >
                    <Grid item xs={6}>
                    <Typography className={classes.itemTitle}>
                        {item.title}
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography className={classes.itemPrice}>
                        {toDollar(getPrice(item))}
                    </Typography>
                    </Grid>
                </Grid>

                <Typography className={classes.itemDescription} color="textSecondary">
                    {getDescription(item)}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <IconButton
                    className={classes.decreaseButtons}
                    onClick={() => quantityState(item.quantity-1)}
                    aria-label="remove" >
                    <RemoveIcon fontSize="small" />
                </IconButton>
            </Grid>
            <Grid item xs={1}>
                <TextField
                    id="standard-number"
                    type="number"
                    variant="outlined"
                    value={item.quantity}
                    size="small"
                    onChange={(e) => quantityState(e.target.value)}
                    className={classes.quantityInput}
                    InputLabelProps={{shrink: true}}/>
                </Grid>
            <Grid item xs={1}>
                <IconButton
                    onClick={() => quantityState(item.quantity + 1)}
                    className={classes.increaseButtons}
                    aria-label="add" >
                    <AddIcon fontSize="small" />
                </IconButton>
            </Grid>

        </Grid>
    );
}


const OrderItem = (item, index, classes, updateQuantity, removeItem) => {

    const updateQuantityForIndex = (quantity) => { updateQuantity(index, quantity)};
    const removeFromBag = () => {removeItem(index)};
    return (
        <div key={index}>
        <Grid container
            spacing={2} direction="row"
            alignItems="center" justify="space-between">
            <Paper className={classes.orderItemPaper} elevation={0}>
            <Grid item xs={12}>
                {QuantityControl(classes, item, updateQuantityForIndex, removeFromBag)}
            </Grid>
            </Paper>
        </Grid>
        </div>
    )
}

const OrderItemList = (props, classes) => {
    const updateQuantity = ( index, quantity ) => { props.updateBagQuantity(index, quantity) };
    const removeItem = (index) => { props.removeFromBag(index) }
    const items = props.bag.map( (item, index) => {
        return OrderItem(item, index, classes, updateQuantity, removeItem)
    })

    return (
        <Paper className={classes.gridList} square>
            {items}
            <Grid container spacing={2} direction="row"
                  alignItems="center" justify="flex-end">
                <Grid item xs={4}>
                <Button className={classes.emptyBagButton}
                        onClick={ () => props.emptyBag()}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}>
                    Empty Bag
                </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}


const OrderFooter = (props, classes, enabled) => {
    return (
        <Paper className={classes.footer}>
        <Grid container spacing={2} direction="row" alignItems="center"
              justify="flex-end">
            <Grid item xs={4}>
                { enabled === true ?
                    <Button className={classes.emptyBagButton}
                        variant="contained"
                        color="primary"
                        startIcon={<CheckIcon />}>
                        Submit Order
                    </Button>  :
                    <Button className={classes.emptyBagButton}
                        variant="contained"
                        color="secondary"
                        disabled
                        startIcon={<CloseIcon />}>
                        Submit Order
                    </Button>
                }
            </Grid>
        </Grid>
        </Paper>
    );
}


const OrderTypeForm = (classes, delivery, handleRadioChange) => {

    return (
        <Grid container
            spacing={2}
            direction="row"
            alignItems='center' justify="space-between">
            <Grid item xs={12}>
                <RadioGroup onChange={(event) => handleRadioChange(event.target.value)} row>
                    <FormControlLabel
                        value={'Delivery'}
                        control={<Radio color="primary" className="mod-radio" />}
                        label={<Typography className={classes.label}>Delivery</Typography>}/>
                    <FormControlLabel
                        value={'Pickup'}
                        control={<Radio color="primary" className="mod-radio" />}
                        label={<Typography className={classes.label}>Pickup</Typography>}/>
                </RadioGroup>
            </Grid>
            {
                delivery === true ?
                (<Grid item xs={12}>
                    <Paper className={classes.paper}></Paper>
                </Grid>) : null

            }

        </Grid>

    )
}

const OrderSummary = (props, classes) => {
    let price = 0.0;
    if ( props.bag !== undefined ) {
        props.bag.forEach( (item ) => {
            price += getPrice(item)
        })
    }

    let tax = price * 0.05;
    let total = price + tax;

    return (
        <Paper square className={classes.summaryPaper}>
        <Typography className={classes.summaryHeader}>
            Order Summary
        </Typography>

        <Grid container
            spacing={2}
            direction="row"
            alignItems='center' justify="flex-end">
            <Grid item xs={6}>
            <Paper>
                <table className={classes.summaryTable}>
                    <tbody>
                    <tr className={classes.tableRow}>
                        <td className={classes.tableElem}>
                            <Typography className={classes.tableDesc}>
                                Price:
                            </Typography>

                        </td>
                        <td className={classes.tableElem}>
                            <Typography className={classes.tableDesc}>
                                {toDollar(price)}
                            </Typography>
                        </td>
                    </tr>
                    <tr className={classes.tableRow}>
                        <td className={classes.tableElem}>
                            <Typography className={classes.tableDesc}>
                                Tax:
                            </Typography>

                        </td>
                        <td className={classes.tableElem}>
                            <Typography className={classes.tableDesc}>
                                {toDollar(tax)}
                            </Typography>
                        </td>
                    </tr>
                    <tr className={classes.tableRow}>
                        <td className={classes.tableElem}>
                            <Typography className={classes.tableDesc}>
                                Total:
                            </Typography>

                        </td>
                        <td className={classes.tableElem}>
                            <Typography className={classes.tableDesc}>
                                {toDollar(total)}
                            </Typography>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Paper>
            </Grid>
        </Grid>
        </Paper>

    )
}


const BagModalHeader = (classes, handleModalClose) => {

    return (
        <CardHeader>
            <Grid container
                spacing={2}
                direction="row"
                alignItems='center' justify="space-between">
                <Grid item xs={10}>
                    <Typography className={classes.modalHeader}>
                       Order Details
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        onClick={handleModalClose}
                        aria-label="close" >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
       </CardHeader>
    )
}

const BagModal = (props) => {
    const [ modalStyle ] = React.useState(getModalStyle);
    const classes = useStyles();

    const [ delivery, setDelivery ] = useState(false);
    const handleModalClose = () => { props.toggleBagModal(false) }
    const handleRadioChange = ( value ) => { setDelivery(value === 'Delivery') };
    const updateQuantity = ( index, quantity ) => {
        props.updateBagQuantity(index, quantity)
    }

    return (
        <Card style={modalStyle} className={classes.card} variant="outlined">
            { BagModalHeader(classes, handleModalClose)}
            <CardContent>
                <Paper square className={classes.cardPaper}>
                {OrderTypeForm(classes, delivery, handleRadioChange)}
                {
                    props.bag.length > 0 ?
                        OrderItemList(props, classes, updateQuantity) :
                        <Paper square className={classes.emptyBag}>
                            <AddShoppingCartIcon variant="outlined" fontSize="large"/>
                        </Paper>
                }
                {OrderSummary(props, classes)}
                {OrderFooter(props, classes, false)}
                </Paper>
            </CardContent>
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        opened: state.bag.bagOpen,
        bag: state.bag.bag
    };
}



export default connect(mapStateToProps, {
    removeFromBag, emptyBag, toggleBagModal, updateBagQuantity })(BagModal);