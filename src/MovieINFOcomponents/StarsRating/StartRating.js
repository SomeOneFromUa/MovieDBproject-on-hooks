import React, {useEffect} from "react";
import StarRatings from 'react-star-ratings';


export function StartRating (props) {
    const [rating, setRating] = React.useState(0);
    useEffect(()=> {
        const {rating} = props;
        let res = rating/2;
        setRating(res);
    }, []);
    return (
            <StarRatings
                rating={rating}
                starDimension="20px"
                starSpacing="5px"
                starRatedColor={'rgb(242,255,0)'}
            />
        );
}

