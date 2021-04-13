import del from 'del';

const clean = () => {
  return del(['dist']);
};

export default clean;
