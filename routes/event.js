var express = require("express");
var router = express.Router();

const eventSchema = require("../model/events.model");

router.post("/add", async (req, res) => {
  try {
    const newEvent = eventSchema(req.body);
    await newEvent
      .save()
      .then((saveEvent) => {
        console.log(saveEvent);
        res.status(201).json({ message: "Event Saved Successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(
          (500).json({
            message: "Cannot save the Event. Internal Server Error",
          })
        );
      });
  } catch (err) {
    console.log(err);
    res.status(
      (500).json({ message: "Cannot save the Event. Internal Server Error" })
    );
  }
});

//Get Request
router.get("/not-over", async (req, res) => {
  try {
    const currentDate = new Date();
    eventSchema
      .find({ on: { $gte: currentDate } })
      .then((response) => {
        console.log(response);
        res.status(200).json({ events: response, Count: response.length });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Unable to Get Event" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Get Event" });
  }
});

//Get Details Using id
router.get("/eventID", async (req, res) => {
  try {
    const idQuery = req.query.id;
    eventSchema
      .findById(idQuery)
      .then((response) => {
        console.log(response);
        res.status(200).json({ events: response, Count: response.length });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Unable to Get Event" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Get Event" });
  }
});

//Get details for date
router.get("/between-dates", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    eventSchema
      .find({ on: { $gte: startDateObj, $lte: endDateObj } })
      .then((response) => {
        console.log(response);
        res.status(200).json({ events: response, Count: response.length });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Unable to Get Event" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Get Event" });
  }
});

//Uppdate By ID
router.put("/update", async (req, res) => {
  try {
    const idQuery = req.query.id;
    const titleUpdate = req.query.title;
    eventSchema
      .findByIdAndUpdate(idQuery, { title: titleUpdate })
      .then((response) => {
        console.log(response);
        res.status(200).json({message:"Updated Sucessfully", events: response, Count: response.length });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Unable to Get Event" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Get Event" });
  }
});

//Delete By ID

router.delete('/delete', async(req, res)=> {
    try{
        const idQuery=req.query.id;
        eventSchema.findByIdAndDelete(idQuery)
        .then((response)=>{
            console.log(response)
            res.status(200).json({events:response,message:"Deleted Sucessfully"})
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({message:"Unable to Get Event"})
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Unable to Get Event"})
    }
});

module.exports = router;
