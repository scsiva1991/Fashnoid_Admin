import React, { Component } from 'react';

export default class ProductImages extends Component {

  constructor(props){
    super(props);
    this.state = {
      pdtImages: {
        imagePreviewUrl0 : '',
        imagePreviewUrl1 : '',
        imagePreviewUrl2 : '',
        imagePreviewUrl3 : '',
        imageFile0 : null,
        imageFile1 : null,
        imageFile2 : null,
        imageFile3 : null,
        imagePreview0 : null,
        imagePreview1 : null,
        imagePreview2 : null,
        imagePreview3 : null
      }
    }
  }

  onImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    const id = e.target.id;
    console.log('*** id ****', id);
    reader.onloadend = () => {

      let pdtImages = this.state.pdtImages;
      pdtImages['imagePreviewUrl'+id] = reader.result;
      pdtImages['imageFile'+id] = file;
      this.setState({
        pdtImages: pdtImages
      })
      console.log('*******', pdtImages);
    }

    reader.readAsDataURL(file)
  }

  render() {


    let {sellerDetail, updatePdt, onPdtImgSubmit} = this.props;
    let { pdtImages } = this.state;
    console.log( sellerDetail );
    let images = sellerDetail.images || [];

    for( let i = 0; i < 4; i++ ) {
      if(pdtImages['imagePreviewUrl'+i] != "") {
        pdtImages['imagePreview'+i] = (<img className="seller-preview" src={pdtImages['imagePreviewUrl'+i]}/>);
      } else if(images[i] && images[i].image) {
        pdtImages['imagePreview'+i] = (<img className="seller-preview" src={images[i].image}/>);
      } else {
        pdtImages['imagePreview'+i] = (<div className="mg-t-25"></div>);
      }
      if( document.getElementById(i) )
        document.getElementById(i).value = '';
    }

    console.log( )

    if( !updatePdt ) {
      return (
        <div className="pdt-img-container">
          <div className="row pdt-empty text-center">
            <div className="col-xs-12 ">
              Create seller details to update product images
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="pdt-img-container">
        <div className="row mg-t-10">
          <div className="col-xs-6">
            <input type="file" id="0" className="mg-t-25" onChange={this.onImageChange}/>
          </div>
          <div className="col-xs-6">
            {pdtImages.imagePreview0}
          </div>
        </div>
        <div className="row mg-t-10">
          <div className="col-xs-6">
            <input type="file" id="1" className="mg-t-25"  onChange={this.onImageChange} />
          </div>
          <div className="col-xs-6">
            {pdtImages.imagePreview1}
          </div>
        </div>
        <div className="row mg-t-10">
          <div className="col-xs-6">
            <input type="file" id="2" className="mg-t-25"  onChange={this.onImageChange}/>
          </div>
          <div className="col-xs-6">
            {pdtImages.imagePreview2}
          </div>
        </div>
        <div className="row mg-t-10">
          <div className="col-xs-6">
            <input type="file" id="3" className="mg-t-25"  onChange={this.onImageChange} />
          </div>
          <div className="col-xs-6">
            {pdtImages.imagePreview3}
          </div>
        </div>
        <div className="row mg-t-25">
          <div className="col-xs-12">
            { updatePdt && <input
              type="submit" onClick={() => onPdtImgSubmit(sellerDetail, this.state.pdtImages)}
              className="btn btn-lg btn-primary btn-block" value="UPDATE"/>}
          </div>
        </div>
      </div>
    )
  }
}
