import contactRoutes from './contacts.js';

const constructorMethod = (app) => {  
  app.use('/', contactRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;