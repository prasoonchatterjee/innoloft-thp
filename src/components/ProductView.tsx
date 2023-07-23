import { useSelector } from 'react-redux';

const ProductView = ({
  productDetails,
  Marker,
  GoogleMap,
  center,
  btnText,
  handleBtnPress,
  Editor,
  editorState,
  onEditorStateChange,
}: any) => {
  const values: any = useSelector((state) => state);
  const headerColor = values.rootState.mainColor;
  const hasUserSection = values.rootState.hasUserSection;

  const editYoutubeUrl = () => {
    return productDetails.video.replace('watch?v=', 'embed/');
  };
  const renderCategories = () => {
    return productDetails.categories.map((item: any) => (
      <p
        className='border rounded-3xl bg-neutral-200 p-2 m-2 text-gray-500'
        key={item.id}
      >
        {item.name}
      </p>
    ));
  };

  const renderBusinessModels = () => {
    return productDetails.businessModels.map((item: any) => (
      <p
        className='border rounded-3xl bg-neutral-200 p-2 m-2 text-gray-500'
        key={item.id}
      >
        {item.name}
      </p>
    ));
  };

  if (productDetails && headerColor) {
    return (
      <div className='bg-neutral-100'>
        <header
          className={`h-16 lg:flex lg:justify-between  lg:items-center lg:py-2 `}
          style={{ backgroundColor: headerColor }}
        >
          <div className='p-2'>
            <img src={values.rootState.logo} className='h-12' />
          </div>
          <div className='flex basis-3/4 justify-between'>
            <div className='invisible lg:visible'>
              <input
                placeholder='Enter interests, keywords, company name'
                className='rounded-sm w-96 px-2'
              />
            </div>
            <div
              className={`pr-4 invisible lg:visible ${
                !hasUserSection && 'lg:invisible'
              }`}
            >
              <img
                src={productDetails.user.profilePicture}
                className='rounded-full w-8'
              />
            </div>
          </div>
        </header>
        <div className='flex flex-row h-full w-screen'>
          <aside className='hidden lg:block'>
            <div className='flex flex-row p-3 w-72'>
              <div className=''>
                <img
                  src={productDetails.user.profilePicture}
                  className='rounded-full w-20'
                />
              </div>
              <div className='flex flex-col justify-center ml-4'>
                <p className='justify-center font-bold'>
                  {productDetails.user.firstName}
                </p>
                <p className='justify-center'>{productDetails.company.name}</p>
              </div>
            </div>
            <div className='p-4 m-4'>
              <p>Home</p>
              <p className='pt-2'>Members</p>
              <p className='pt-2'>Organisation</p>
            </div>
          </aside>
          <main className='flex flex-col lg:basis-2/3 w-screen'>
            <div className='flex flex-col lg:flex-row justify-between m-4 basis-4/5'>
              <div className='my-auto'>
                <p>Offers</p>
              </div>
              <div className=''>
                <button
                  className='bg-blue-900 border rounded-lg px-4 py-2 text-white'
                  onClick={handleBtnPress}
                >
                  {btnText}
                </button>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row border border-gray-300 bg-white rounded-md m-2'>
              <div className='flex flex-col p-2 basis-2/3 flex-wrap '>
                <div className=''>
                  <img src={productDetails?.picture} className='' />
                </div>
                <div className=''>
                  <h4 className='font-bold'>{productDetails.name}</h4>
                  <Editor
                    toolbarHidden
                    readOnly
                    wrapperClassName=' mx-auto rounded my-2 p-2'
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                  />
                </div>
              </div>
              <div className='border-l border-gray-300 basis-1/3 p-2 '>
                <h5 className='font-bold ml-5'>Offered By</h5>
                <div className='mt-5 ml-5 '>
                  <img
                    className='max-w-[18rem] lg:max-w-[12rem]'
                    src={productDetails.company.logo}
                  />
                </div>
                <div className='flex p-3'>
                  <div className=''>
                    <img
                      src={productDetails.user.profilePicture}
                      className='rounded-full w-20'
                    />
                  </div>
                  <div className='flex flex-col justify-center '>
                    <p className='justify-center font-medium'>
                      {productDetails.user.firstName}
                    </p>
                    <p className='justify-center'>
                      {productDetails.company.name}
                    </p>
                  </div>
                </div>
                <div className='ml-5'>
                  <p>
                    {productDetails.company.address.house}{' '}
                    {productDetails.company.address.street}
                  </p>
                  <p>
                    {productDetails.company.address.zipCode}{' '}
                    {productDetails.company.address.city.name}{' '}
                    {productDetails.company.address.country.name}
                  </p>
                </div>
                <div className='p-4 w-full'>
                  <GoogleMap
                    zoom={13}
                    center={center}
                    mapContainerClassName='w-full h-64'
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </div>
              </div>
            </div>
            <div className='border border-gray-300 rounded-md bg-white mt-5 p-2 m-2'>
              <h5 className='font-bold'>Video</h5>
              <section className='flex justify-center items-center '>
                <iframe
                  width='560'
                  height='315'
                  src={editYoutubeUrl()}
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                ></iframe>
              </section>
            </div>
            <section className='border border-gray-300 bg-white mt-5 p-2 rounded-md m-2'>
              <h5 className='font-bold'>Offer Details</h5>
              <div className='flex flex-col lg:flex-row flex-between flex-wrap p-2'>
                <div className='basis-1/2'>
                  <h6 className='text-gray-600'>Technologies</h6>
                  <div className='flex flex-wrap text-sm'>
                    {renderCategories()}
                  </div>
                </div>
                <div className='basis-1/2'>
                  <h5 className='text-gray-600'>Business model</h5>
                  <div className='flex flex-wrap text-sm'>
                    {renderBusinessModels()}
                  </div>
                </div>
                <div className='basis-1/2'>
                  <h5 className='text-gray-600'>TRL</h5>
                  <div className='flex flex-wrap text-sm'>
                    <p className='border rounded-3xl bg-neutral-200 p-1.5 m-2 text-gray-500'>
                      {productDetails.trl.name}
                    </p>
                  </div>
                </div>
                <div className='basis-1/2'>
                  <h6 className='text-gray-600'>Costs</h6>
                  <div className='flex flex-wrap text-sm'>
                    <p className='border rounded-3xl bg-neutral-200 p-2 m-2 text-gray-500'>
                      {productDetails.investmentEffort}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  } else return null;
};

export default ProductView;
