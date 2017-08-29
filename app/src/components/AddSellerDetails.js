import React, { PropTypes, Component } from 'react';
import TextInput from './TextInput';

export default class AddSellerDetails extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.setGender = this.setGender.bind(this);
    this.setPdtCategory = this.setPdtCategory.bind(this);
    this.setStoreCategory = this.setStoreCategory.bind(this);
    this.state = {
      sellerDetail: props.sellerDetail,
      imagePreviewUrl : '',
      imageFile : null
    }
  }

  onImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        imageFile: file
      })
    }

    reader.readAsDataURL(file)
  }

  onChange( event ) {
    const sellerDetail = this.state.sellerDetail;
    sellerDetail[event.target.name] = event.target.value;
    return this.setState({ sellerDetail: sellerDetail });
  }

  setGender( event ) {
    const sellerDetail = this.state.sellerDetail;
    sellerDetail['genderCategory'] = event.target.value;
    return this.setState({ sellerDetail: sellerDetail });
  }

  setPdtCategory( event ) {
    const sellerDetail = this.state.sellerDetail;
    sellerDetail['productCategory'] = event.target.value;
    return this.setState({ sellerDetail: sellerDetail });
  }

  setStoreCategory( event ) {
    const sellerDetail = this.state.sellerDetail;
    sellerDetail['storeCategory'] = event.target.value;
    return this.setState({ sellerDetail: sellerDetail });
  }

  componentWillReceiveProps( nextProps ) {
    console.log( 'nextProps props ', nextProps);
  }

  render() {

    let { onSubmit } = this.props;
    let imagePreview = null;
    let {sellerDetail, imagePreviewUrl} = this.state;

    console.log( sellerDetail );

    if( imagePreviewUrl != "") {
      imagePreview = (<img className="seller-preview" src={imagePreviewUrl}/>);
    } else if(sellerDetail.sellerProfile != "") {
      imagePreview = (<img className="seller-preview" src={sellerDetail.sellerProfile}/>);
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
                     onChange={this.onChange} />
                </div>
                <div className="col-xs-6">
                  <div className="row">
                    <div className="col-xs-6">
                      <input type="file" className="mg-t-25" onChange={this.onImageChange}/>
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
                     onChange={this.onChange} />
                </div>
                <div className="col-xs-6">
                  <label> Gender </label>
                  <select className="input-select" value={sellerDetail.genderCategory}
                    onChange={this.setGender}>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                  <label> Product Category </label>
                  <select className="input-select" value={sellerDetail.productCategory}
                    onChange={this.setPdtCategory}>
                    <option value="Shirt">Shirt</option>
                  </select>
                </div>
                <div className="col-xs-6">
                  <label> Store Category </label>
                  <select className="input-select" value={sellerDetail.storeCategory}
                    onChange={this.setStoreCategory}>
                    <option value="ONLINE">ONLINE</option>
                  </select>
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
                     onChange={this.onChange} />
                </div>
                <div className="col-xs-6">
                 <TextInput
                     name="phone"
                     label="Phone"
                     type="text"
                     value={sellerDetail.phone}
                     error=""
                     placeholder=""
                     onChange={this.onChange} />
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
                     onChange={this.onChange} />
                </div>
                <div className="col-xs-6">
                 <TextInput
                     name="fbURL"
                     label="FB URL"
                     type="text"
                     value={sellerDetail.fbURL}
                     error=""
                     placeholder=""
                     onChange={this.onChange} />
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
                     onChange={this.onChange} />
                </div>
                <div className="col-xs-6">
                 <TextInput
                     name="instagramURL"
                     label="Instagram URL"
                     type="text"
                     value={sellerDetail.instagramURL}
                     error=""
                     placeholder=""
                     onChange={this.onChange} />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                 <TextInput
                     name="address"
                     label="Address"
                     type="text"
                     value={sellerDetail.address}
                     error=""
                     placeholder=""
                     onChange={this.onChange} />
                </div>
              </div>
                 <input
                     type="submit" onClick={() => onSubmit(sellerDetail, this.state.imageFile)}
                     className="btn btn-lg btn-primary btn-block" />
           </div>
        </div>
      </div>
    )
  }
}
