import React from "react";
// material ui imports
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
//import InfoIcon from '@mui/icons-material/Info';

const TopRated: React.FC<{ products: ProductState }> = ({ products }) => {


    return (
        <div>
            {products.products && products.products.length > 0 ? (
                <ImageList sx={{ width: '99%', height: 450 }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">December</ListSubheader>
                    </ImageListItem>
                    {products.products.map((item) => (
                        <ImageListItem key={item._id}>
                            {item.image ? (
                                <img
                                    src={`data:image/jpg;base64,${Buffer.from(item.image.data).toString('base64')}`}
                                    alt={item.name}
                                    loading="eager"
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                            <ImageListItemBar
                                title={item.name}
                                subtitle={item.company}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.name}`}
                                    />
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    )
};
export default TopRated