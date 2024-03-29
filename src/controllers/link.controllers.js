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

export const getLinkCRUD = async ( req,res) => {

  try {
    const {nanoLink} = req.params
    const oneLink = await Link.findOne({nanoLink}) 

    if (!oneLink) return res.status(400).josn({error:"does not exits link"})
 
    return res.status(200).json({longLink:oneLink.longLink })    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "sever error one link"})
  }
}

// traditional CRUD in this project i will not use
export const getOneLink = async ( req,res) => {

  try {
    const {id} = req.params
    const oneLink = await Link.findById(id) 

    if (!oneLink) return res.status(400).josn({error:"does not exits link"})

    if (oneLink.uid.equals(req.uid)) return res.status(401).json({error:"you are not allow to see the link"})

    return res.status(200).json({ oneLink })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "sever error one link"})
  }
}
export const renoveOneLink = async ( req,res) => {

  try {
    const {id} = req.params
    const oneLink = await Link.findById(id) 

    if (!oneLink) return res.status(400).josn({error:"does not exits link"})

    if (oneLink.uid.equals(req.uid)) return res.status(401).json({error:"you are not allow to see the link"})

    oneLink.remove()

    return res.status(200).json({ oneLink })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "sever error one link"})
  }
}

export const updateOneLink = async ( req,res) => {

  try {
    const {id} = req.params
    const {longLink } = req.body

    if (!longLink.startsWith('http://')) {
      longLink = `http://${longLink}`
    }
    const oneLink = await Link.findById(id) 

    if (!oneLink) return res.status(400).josn({error:"does not exits link"})

    if (oneLink.uid.equals(req.uid)) return res.status(401).json({error:"you are not allow to see the link"})

    oneLink.longLink = longLink;
    await oneLink.save();

    return res.status(200).json({ oneLink })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "sever error one link"})
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