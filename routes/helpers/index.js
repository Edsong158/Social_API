function handleRouteError(err, res) {
    console.log(err);
    
        if (err.code === 11000) {
        
            return res.status(403).json({
              message: 'A user already exists with that email address'
            });
          }
    
          if (err.kind === 'ObjectId') {
            return res.status(404).json({
              message: 'User with that ID could not be found'
            });
          }
    
          if (!err.errors) {
            return res.status(500).json({
              message: 'The server encountered an error'
            });
          }
      
          let messages = [];
      
          for (let prop in err.errors) {
            messages.push(err.errors[prop].message)
          }
      
          res.json({
            error: 403,
            messages
          });
    }
    
    
    module.exports = {
    handleRouteError
    }