import React from "react";
import moment from "moment";

import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Today } from "@material-ui/icons";


const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backgroundBlendMode: 'darken',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
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
  metadata: {
    fontSize: '12px',
    color: 'grey',
  },
  metadataTwo: {
    fontSize: '12px',
    color: 'red',
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
    margin: '15px',
    marginBottom: '0px',
  },
  detailsTwo: {
    margin: '15px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '18px',
  },
  name: {
    color: 'black',
    fontSize: '12px',
  },
})

function TransitionUp(props) {
  return <Slide {...props} direction="down" />;
}


export default function OrderItem({ orderedItem, userInfo }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log('test return', moment(orderedItem.returnDate) > moment())



  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardMedia className={classes.media} title={orderedItem.title} image={orderedItem.selectedFile || 'https://d25tv1xepz39hi.cloudfront.net/2016-07-16/files/cat-sample_1313.jpg'} />
      <div className={classes.overlay}>
      </div>
      <div className={classes.details}>
        <Typography className={classes.metadata} variant="body2">rented {moment(orderedItem.startDate).fromNow()}</Typography>
      </div>
      <div className={classes.detailsTwo}>
        <Typography className={classes.title} variant="body2">{orderedItem.title}</Typography>
        <Typography className={classes.metadata} variant="body2" color="textSecondary" component="p">{orderedItem.lenderEmail}</Typography>
        {moment(orderedItem.returnDate) > moment() ?
          <Typography className={classes.metadataTwo} variant="body2" color="textSecondary" component="p">Return by: {moment(orderedItem.returnDate).calendar()}</Typography> :
          <Typography className={classes.metadata}>Item has been returned.</Typography>
        }
      </div>


      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={`This item is due on ${orderedItem.returnDate}!`}
        TransitionComponent={TransitionUp}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Card>
  )
}
