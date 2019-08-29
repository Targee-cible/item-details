import ShippingOptions from './ShippingOptions.jsx';
import ShippingDetails from './ShippingDetails.jsx';
import ReturnDetails from './ReturnDetails.jsx';

function Shipping(props) {
  return(
    <div>
      <ShippingOptions details={props.details} />
      <ShippingDetails details={props.details} />
      <ReturnDetails />
    </div>
  )
}

export default Shipping;
