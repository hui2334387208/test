import React from 'react';
import PictureSelect from './Components/PictureSelect/index';
import pictures from './Api/pictures';

const App = () => {
  const [value, setValue] = React.useState(['1']);
  
  console.log(value); // 输出用户选择图片 id。
  
  return <PictureSelect pictures={pictures} value={value} onChange={(value) => setValue(value)} />
};

export default App;
