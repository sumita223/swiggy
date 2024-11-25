

const RestaurantCard=(props)=>{
    const {resData}= props;

    const{name,cuisines,costForTwo, deliveryTime,avgRatingString}= resData?.info;

    return(
        <div className='res-card'>
            <img  className='res-logo' alt='res-logo'
            src= {`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resData.info.cloudinaryImageId}`}/>
            {/*<h3>{props.resName}</h3>
            <h4>{props.cuisine}</h4>*/}
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{costForTwo}</h4>
            <h4>{resData.info.sla.deliveryTime} minutes </h4>
            <h4>{avgRatingString} </h4>
        </div>

    );
};

export default RestaurantCard;