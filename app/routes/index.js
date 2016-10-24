var Post = require('../models/post');
 
module.exports = function (app) {
 
 app.post('/api/post/create', function(req, res){
  var newPost = new Post();
  newPost.title = req.body.title;
  newPost.description = req.body.description;
  newPost.content = req.body.content;
  newPost.creationDate = new Date();
  newPost.save(function(err, post) {
    if (err)
      return res.send(err);
    return res.json(post);
  });
});

app.get('/api/post/list', function(req, res){
 Post.find({}).sort({creationDate: -1}).exec(function(err, posts) {
   if (err) {
     res.send(err);
   }
   else {
     res.json(posts);
   }
 });
});

app.get('/api/post/detail/:post_id', function(req, res){
 Post.findById(req.params.post_id).exec(function(err, post){
  if (err) {
    res.send(err);
  }
  else {
    res.json(post);
  }
 });
});

app.get('/api/post/edit/:post_id', function(req, res){
 Post.findById(req.params.post_id, function(err, data){
   // Tìm record có _id là tham số truyền vào trên đường dẫn trong bảng posts
   if(err) {
     res.send(err); // nếu lỗi thì trả về thông báo lỗi ngược lại ta sẽ sửa các cột của nó
   }
   else {
     data.title = 'Title after edit';
     data.description = 'Description has many changes';
     data.content = 'Content is here';
     data.save(function(err, post) { // Lưu lại đối tượng xuống db
       if (err) {
         res.send(err);
       }
       else {
         res.json(post); // trả về thông tin sau khi chỉnh sửa
       }
     });
   }
 });
});

app.get('/api/post/edit/:post_id', function(req, res){
 Post.findById(req.params.post_id, function(err, data){
   // Tìm record có _id là tham số truyền vào trên đường dẫn trong bảng posts
   if(err) {
     res.send(err); // nếu lỗi thì trả về thông báo lỗi ngược lại ta sẽ sửa các cột của nó
   }
   else {
     data.title = 'Title after edit';
     data.description = 'Description has many changes';
     data.content = 'Content is here';
     data.save(function(err, post) { // Lưu lại đối tượng xuống db
       if (err) {
         res.send(err);
       }
       else {
         res.json(post); // trả về thông tin sau khi chỉnh sửa
       }
     });
   }
 });
});app.get('/api/post/delete/:post_id', function(req, res) {
  Post.remove({_id : req.params.post_id}, function(err) {
    if (err) {
      res.send(err);
    }
    else {
      res.json({message: "Xóa thành công!"});
    }
  });
});
app.delete('/api/post/delete/:post_id', function(req, res) {
   Post.remove({_id : req.params.post_id}, function(err, post) {
      if (err)
        return res.send(err);
      return res.json(post);
   });
});
app.put('/api/post/edit', function(req, res){
  Post.findById(req.body._id, function(err, data){
   if(err)
      return res.send(err);
   data.title = req.body.title;
   data.description = req.body.description;
   data.content = req.body.content;
   data.save(function(err, post) {
     if (err)
       return res.send(err);
     return res.json(post);
   });
  });
});
module.exports = function (app) {
app.get('*', function(req, res){
res.sendfile('public/index.html');
});
};
 

};