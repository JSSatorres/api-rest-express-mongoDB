import { Link } from "../models/link.model.js";
import { nanoid } from "nanoid";

export const getLinks = async ( req,res) => {

  try {
    const links = await Link.find({uid: req.uid}) 
    return res.status(200).json({ links })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "sever error"})
  }
}

export const createLinks = async ( req,res) => {
  try {
    let {longLink} = req.body

    if (!longLink.startsWith('http://')) {
      longLink = `http://${longLink}`
    }
    const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid}) 
    console.log(link);
    const newLink = await link.save()
    return res.status(201).json({ newLink })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "sever error"})
  }
}