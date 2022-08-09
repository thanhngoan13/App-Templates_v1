

const model = require('../modules/Trungtammodel');

class TrungtamController {
  //Get/
  index(req, res) {
    model.getAll(function (err, data) {
      if (!err) {
        // res.send({result:data});
        res.render('pages/trungtam', { result: data });
      }
      else {
        res.send({ result: null });
      }

    });

  }


  delete(req, res) {
    var id = req.params.id;
    //res.send('lay id ok  '+id);

    model.Delete(id, function (err, data) {

      if (!err) {

        //  res.redirect('back');
        //

        // res.send('Xóa thành công');
        res.redirect('back');
      }
      else {
        res.send('Xóa không thành công' + err);
      }
    });
  }

  edit(req, res) {
    var id = req.params.id;
    // res.send('edit ok');
    model.getOne(id, function (err, data) {
      if (!err) {
        res.send(data);

        console.log(data);

      }
      else {
        res.send({ result: "loi lay du lieu " });
      }

    });
  }


}

module.exports = new TrungtamController;