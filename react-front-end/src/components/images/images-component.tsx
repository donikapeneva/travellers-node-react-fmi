import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { IImage } from '../../data/i-image';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  coverImage: {
    width: window.innerWidth,
    height: window.innerHeight,

  },
  gridList: {
    width: 500,
    height: 450,
  },
  deleteIcon: {
    color: 'white',
  },
}));

export const ImageGridList = (props: IImageComponentProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {[...props.images].map((image, index) => (
          <GridListTile key={index}>
            <img src={image.sourceBase64} alt={image.title} />
            <GridListTileBar
              title={image.title}
              actionIcon={
                <IconButton
                  aria-label={`info about ${image.title}`}
                  className={classes.deleteIcon}
                  onClick={() => props.onRemoveImage(image.id!.toString())}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export interface IImageComponentProps {
  images: Iterable<IImage>;
  onRemoveImage: (iamgeId: string) => void;
}
