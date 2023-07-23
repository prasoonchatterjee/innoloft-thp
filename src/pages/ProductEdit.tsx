import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ProductEditForm from '../components/ProductEditForm';
import { useNavigate } from 'react-router-dom';

const ProductEditPage = () => {
  const [defaultFormValues, setDefaultFormValues] = useState<any>();
  const [allTrlValues, setAllTrlValues] = useState<any>();
  const [editorState, setEditorState] = useState<any>();
  const [selectedTrlValue, setSelectedTrlValue] = useState<any>();
  const [productDetails, setProductDetails] = useState<any>();
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };
  const { register, handleSubmit, setValue } = useForm({
    values: defaultFormValues,
  });
  register('trl');

  const onSubmit = async (data: any) => {
    const res = await axios.put(
      'https://api-test.innoloft.com//product/6781/',
      data
    );
    if (res.status === 200) navigate('/product');
  };
  const navigate = useNavigate();

  const viewHandler = (e: any) => {
    navigate('/product');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios(
        'https://api-test.innoloft.com/product/6781/'
      );
      const response2 = await axios('https://api-test.innoloft.com/trl/');

      if (!productDetails && response?.data) {
        setProductDetails(response.data);
        setSelectedTrlValue(response.data.trl.id);
      }
      !allTrlValues && response2?.data && setAllTrlValues(response2.data);
    };

    fetchProduct();
  }, [productDetails]);

  useEffect(() => {
    if (productDetails && allTrlValues) {
      const defaultObj = {
        name: productDetails.name,
        description: productDetails.description,
        video: productDetails.video,
        trl: productDetails.trl,
        investmentEffort: productDetails.investmentEffort,
        businessModel1: productDetails.businessModels[0].name,
        businessModel2: productDetails.businessModels[1].name,
        businessModel3: productDetails.businessModels[2].name,
        businessModel4: productDetails.businessModels[3].name,
        categories1: productDetails.categories[0].name,
        categories2: productDetails.categories[1].name,
      };
      if (!defaultFormValues) {
        setDefaultFormValues(defaultObj);
        const output = convertFromHTML(productDetails.description);
        let editorState = EditorState.createWithContent(
          ContentState.createFromBlockArray(output.contentBlocks)
        );
        setEditorState(editorState);
      }
    }
  }, [productDetails, allTrlValues]);

  const renderSelectOptions = () => {
    return allTrlValues?.map((item: any) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  };

  useEffect(() => {
    editorState &&
      setValue(
        'description',
        editorState.getCurrentContent().getPlainText('\u000A')
      );
  }, [editorState]);

  const selectChangeHandler = (data: any) => {
    setSelectedTrlValue(data.target.value);
  };

  useEffect(() => {
    const trl = allTrlValues?.find((item: any) => item.id == selectedTrlValue);
    selectedTrlValue && setValue('trl', trl);
  }, [selectedTrlValue]);

  if (productDetails) {
    return (
      <ProductEditForm
        productDetails={productDetails}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        Editor={Editor}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        selectedTrlValue={selectedTrlValue}
        selectChangeHandler={selectChangeHandler}
        renderSelectOptions={renderSelectOptions}
        btnText={'View Offer'}
        handleBtnPress={viewHandler}
      />
    );
  } else return null;
};

export default ProductEditPage;
