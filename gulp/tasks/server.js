import bs from 'browser-sync';

const server = bs.create();

export const browserSync = (done) => {
  server.init({
    server: {
      baseDir: './dist',
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
    port: 3000,
    open: false,
    notify: false,
  });
  done();
};

export const reload = (done) => {
  server.reload();
  done();
};
