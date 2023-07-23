import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import ProductView from '../components/ProductView';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';

const ProductPage = () => {
  const [productDetails, setProductDetails] = useState<any>();
  const [editorState, setEditorState] = useState<any>();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios(
        'https://api-test.innoloft.com/product/6781/'
      );
      !productDetails && response?.data && setProductDetails(response.data);
    };
    fetchProduct();
  }, [productDetails]);

  useEffect(() => {
    if (productDetails) {
      const output = convertFromHTML(productDetails.description);
      let editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(output.contentBlocks)
      );
      setEditorState(editorState);
    }
  }, [productDetails]);

  const center = useMemo(
    () => ({
      lat: Number?.(productDetails?.company.address.latitude),
      lng: Number?.(productDetails?.company.address.longitude),
    }),
    [productDetails]
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBsAKJMxJHhogrYKHtA4heWY9BKalIWCGA',
  });

  const navigate = useNavigate();
  const handleBtnPress = () => {
    navigate('/product/edit');
  };
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  if (productDetails && isLoaded) {
    return (
      <ProductView
        productDetails={productDetails}
        Marker={Marker}
        GoogleMap={GoogleMap}
        center={center}
        btnText={'Edit'}
        handleBtnPress={handleBtnPress}
        Editor={Editor}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    );
  } else return null;
};

export default ProductPage;
