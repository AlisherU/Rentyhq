import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { createOrder } from "../actions/orderActions"
import { deleteItem } from "../actions/itemActions"
import { Link } from "react-router-dom";

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  email: {
    padding: '0 16px',
  },
})

const Item = ({ item, userInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const grabInfo = () => {
    dispatch(createOrder(item))

  }
  

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} title={item.title} image={item.selectedFile || 'https://d25tv1xepz39hi.cloudfront.net/2016-07-16/files/cat-sample_1313.jpg'} />
      <div className={classes.overlay}>
        <Typography variant="body2">posted {moment(item.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{item.tags.map((tag) => `#${tag} `)}</Typography>
        <Typography variant="body2" color="textSecondary">User: {item.name}</Typography>
      </div>
      <Typography className={classes.email} variant="h5" gutterBottom>{item.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{item.description}</Typography>
      </CardContent>
      
      <CardActions className={classes.cardActions}>
        { userInfo && userInfo.email === item.email ? 
          <Button size="small" onClick={() => dispatch(deleteItem(item._id))}>
            <DeleteIcon fontSize="small" />
          </Button> 
        : null}
        { userInfo && userInfo.email !== item.email ? <button onClick={grabInfo}><Link to="/order">¥{item.price} /night</Link></button> : null }
      </CardActions>
    </Card>
  )
}

export default Item;