

const RestaurantCard=(props)=>{
    const {resData}= props;
    console.log(resData);   

    const{name,cuisines,costForTwo, deliveryTime,avgRatingString}= resData?.info;

    return(
        <div className='res-card m-4 p-4 w-[280px] rounded-lg hover:bg-gray-200
         bg-gray-100'>
            <img  className='rounded-lg' alt='res-logo'
            src= {`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resData.info.cloudinaryImageId}`}/>
            {/*<h3>{props.resName}</h3>
            <h4>{props.cuisine}</h4>*/}
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{costForTwo}</h4>
            <h4>{resData.info.sla.deliveryTime} minutes </h4>
            <h4>{avgRatingString} stars</h4>
        </div>

    );
};


//Higher Oder Component

export const withPromotedLabel = (RestaurantCard)=>{
    return(props)=>{
        return(
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}
export default RestaurantCard;