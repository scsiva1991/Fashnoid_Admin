import React, { PropTypes, Component } from 'react';
import TextInput from './TextInput';

export default class AddSellerDetails extends Component {

  constructor(props){
    super(props);
  }

  /*static propTypes = {
    sellerDetail: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }*/

  render() {

    let {sellerDetail, onChange, onSubmit, onImageChange, sellerImagePreviewUrl } = this.props;
    let imagePreview = null;

    if( sellerImagePreviewUrl != "") {
      imagePreview = (<img className="seller-preview" src={sellerImagePreviewUrl}/>);
    } else {
      imagePreview = (<div className="mg-t-25">Please select an Image for Preview</div>);
    }
    return(
      <div className="container">
        <div className="row">
           <div className="col-md-11 col-md-offset-1" >
              <div className="row">
                <div className="col-xs-6">
                  <TextInput
                     name="sellerName"
                     label="Seller Name"
                     type="text"
                     value={sellerDetail.sellerName}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
                <div className="col-xs-6">
                  <div className="row">
                    <div className="col-xs-6">
                      <input type="file" className="mg-t-25" onChange={onImageChange}/>
                    </div>
                    <div className="col-xs-6">
                      {imagePreview}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                 <TextInput
                     name="description"
                     label="Description"
                     type="text"
                     value={sellerDetail.description}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
                <div className="col-xs-6">
                  <TextInput
                      name="genderCategory"
                      label="Gender Category"
                      type="text"
                      value={sellerDetail.genderCategory}
                      error=""
                      placeholder=""
                      onChange={onChange} />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                 <TextInput
                     name="productCategory"
                     label="Product Category"
                     type="text"
                     value={sellerDetail.productCategory}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
                <div className="col-xs-6">
                 <TextInput
                     name="storeCategory"
                     label="Store Category"
                     type="text"
                     value={sellerDetail.storeCategory}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                 <TextInput
                     name="email"
                     label="Email"
                     type="email"
                     value={sellerDetail.email}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
                <div className="col-xs-6">
                 <TextInput
                     name="phone"
                     label="Phone"
                     type="text"
                     value={sellerDetail.phone}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                 <TextInput
                     name="shopURL"
                     label="Shop URL"
                     type="text"
                     value={sellerDetail.shopURL}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
                <div className="col-xs-6">
                 <TextInput
                     name="fbURL"
                     label="FB URL"
                     type="text"
                     value={sellerDetail.fbURL}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                 <TextInput
                     name="twitterURL"
                     label="Twitter URL"
                     type="text"
                     value={sellerDetail.twitterURL}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
                <div className="col-xs-6">
                 <TextInput
                     name="instagramURL"
                     label="Instagram URL"
                     type="text"
                     value={sellerDetail.instagramURL}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                </div>
              </div>
                 <TextInput
                     name="address"
                     label="Address"
                     type="text"
                     value={sellerDetail.address}
                     error=""
                     placeholder=""
                     onChange={onChange} />
                 <input
                     type="submit" onClick={onSubmit}
                     className="btn btn-lg btn-primary btn-block" />
           </div>
        </div>
      </div>
    )
  }
}
