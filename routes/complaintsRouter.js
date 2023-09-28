const router = require("express").Router();
const complaint = require("../models/complaints");



//fetch all feedbacks
router.route('/').get((req,res)=>{
  complaint.find((err,data)=>{
      if(err){
          console.log(err)
      }else{
          res.json(data)
      }
  })
})


//add new complaint
router.route("/").post(async (req, res) => {
  const { ticketID, raisedDate, issueCategory, issueRelatedID, subject, message} = req.body;
  
  const newComplaint = new complaint({
    ticketID,
    raisedDate,
    issueCategory,
    issueRelatedID,
    subject,
    message,
  });

  newComplaint
    .save()
    .then((data) => {
      res.status(200).json();
    })
    .then((err) => {
      res.status(400).json();
    });
});

//get specific complaint
router.route("/get/:id").get(async(req,res) =>{
  const id = req.params.id;
  console.log(id);
  await complaint.findById(id).then((complaint)=>{
    res.json(complaint);
    console.log(complaint)
  }).catch((err) =>{
    console.log(err);
  })
})



//delete a complaint
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;
  
    complaint
      .findByIdAndDelete(id)
      .then(() => {
        res.status(200).json("Deleted Successfully!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  });



//update a complaint
router.route("/update/:id").post(function (req, res) {
  // console.log(req.body)
  complaint.findById(req.params.id, function (err, complaint) {
    if (!complaint) res.status(404).send("reservation is not found");
    else 
    complaint.ticketID = req.body.ticketID;
    complaint.raisedDate = req.body.raisedDate;
    complaint.issueCategory = req.body.issueCategory;
    complaint.issueRelatedID = req.body.issueRelatedID;
    complaint.subject = req.body.subject;
    complaint.message = req.body.message;
    complaint
      .save()
      .then((complaint) => {
        res.json("Complaint updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

module.exports = router;